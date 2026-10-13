export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST' && request.method !== 'GET') {
      return new Response('Only GET and POST allowed', { status: 405, headers: corsHeaders });
    }

    try {
      const url = new URL(request.url);

      // GitHub Repository Konfiguration aus Cloudflare Environment-Variablen (Single Source of Truth)
      const owner = env.GITHUB_OWNER;
      const repo = env.GITHUB_REPO;
      const token = env.GITHUB_TOKEN;
      const targetBranch = env.GITHUB_BRANCH || 'main';
      const rawBasePath = env.GITHUB_BASE_PATH || '';
      const basePath = rawBasePath.replace(/^\/+/, '').replace(/\/+$/, '');

      const githubHeaders = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'OVK-Landscape-Gatekeeper'
      };

      // Hilfsfunktion: Pfadauflösung einheitlich für Lese- und Speichervorgang
      const resolvePath = (tgt, id) => {
        let relPath = '';
        if (tgt === 'core') {
          relPath = 'config/core.js';
        } else if (tgt === 'data_partners') {
          relPath = 'config/data_partners.js';
        } else if (tgt === 'vermarkter') {
          relPath = `config/vermarkter/${id}.js`;
        }
        const fullPath = basePath.length > 0 ? `${basePath}/${relPath}` : relPath;
        return { relativePath: relPath, fullPath };
      };

      // Hilfsfunktionen: Base64 <-> UTF-8 Konvertierung
      const decodeBase64Utf8 = (base64Str) => {
        const clean = base64Str.replace(/\s/g, '');
        const binary = atob(clean);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        return new TextDecoder('utf-8').decode(bytes);
      };

      const encodeUtf8Base64 = (text) => {
        const uint8array = new TextEncoder().encode(text);
        let binary = '';
        for (let i = 0; i < uint8array.length; i++) {
          binary += String.fromCharCode(uint8array[i]);
        }
        return btoa(binary);
      };

      // Hilfsfunktion: Einzelne Datei direkt aus dem in Cloudflare konfigurierten GitHub-Repo laden
      const fetchGithubFile = async (relPath) => {
        const fullPath = basePath.length > 0 ? `${basePath}/${relPath}` : relPath;
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${fullPath}?ref=${encodeURIComponent(targetBranch)}`;
        const res = await fetch(apiUrl, { headers: githubHeaders });
        if (!res.ok) {
          throw new Error(`GitHub API Fehler (${res.status}) beim Laden von ${fullPath}`);
        }
        const fileData = await res.json();
        const code = decodeBase64Utf8(fileData.content || '');
        return {
          relativePath: relPath,
          fullPath,
          sha: fileData.sha,
          code
        };
      };

      // Hilfsfunktion: Alle Vermarkter-Dateien aus dem in Cloudflare konfigurierten GitHub-Repo laden
      const fetchAllVermarkterFiles = async (fallbackIds = []) => {
        const dirFullPath = basePath.length > 0 ? `${basePath}/config/vermarkter` : 'config/vermarkter';
        const dirApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${dirFullPath}?ref=${encodeURIComponent(targetBranch)}`;
        let idsToFetch = [];

        try {
          const dirRes = await fetch(dirApiUrl, { headers: githubHeaders });
          if (dirRes.ok) {
            const items = await dirRes.json();
            if (Array.isArray(items)) {
              idsToFetch = items
                .filter(item => item.type === 'file' && item.name.endsWith('.js'))
                .map(item => item.name.replace(/\.js$/, ''));
            }
          }
        } catch (err) {
          // Fallback auf übergebene IDs
        }

        if (idsToFetch.length === 0) {
          idsToFetch = fallbackIds.length > 0 ? fallbackIds : [
            'ad_alliance', 'bcn', 'funke', 'iqd', 'media_impact',
            'score', 'seven_one_media', 'stroeer', 'uim', 'visoon'
          ];
        }

        const results = await Promise.all(
          idsToFetch.map(async (id) => {
            try {
              const file = await fetchGithubFile(`config/vermarkter/${id}.js`);
              return { id, ...file };
            } catch (err) {
              return null;
            }
          })
        );
        return results.filter(Boolean);
      };

      // Route: GET /configs (Liefert alle führenden Configs aus dem Cloudflare-Ziel-Repository)
      if (request.method === 'GET' && (url.pathname === '/configs' || url.pathname === '/')) {
        const [coreFile, dataPartnersFile, vermarkterFiles] = await Promise.all([
          fetchGithubFile('config/core.js'),
          fetchGithubFile('config/data_partners.js'),
          fetchAllVermarkterFiles()
        ]);

        return new Response(JSON.stringify({
          success: true,
          repository: { owner, repo, branch: targetBranch, basePath },
          configs: {
            core: coreFile,
            dataPartners: dataPartnersFile,
            vermarkter: vermarkterFiles
          }
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const body = await request.json();
      const { vermarkterId, password, code, target = 'vermarkter', loadAllVermarkter = false } = body;

      if (!password) {
        return new Response('Fehlendes Passwort', { status: 400, headers: corsHeaders });
      }

      // Passwort Validierung
      const passwords = JSON.parse(env.VERMARKTER_PASSWORDS || '{}');
      let authId = vermarkterId;
      let expectedPassword = authId ? (env[`PWD_${authId}`] || passwords[authId]) : undefined;
      
      const isAdmin = Boolean(env.ADMIN_PASSWORD && password === env.ADMIN_PASSWORD);

      // Falls keine spezifische ID in der URL übergeben wurde, prüfe ob das Passwort zu einem hinterlegten Vermarkter gehört
      if (!isAdmin && (!authId || authId === 'admin')) {
        if (env) {
          for (const key of Object.keys(env)) {
            if (key.startsWith('PWD_') && env[key] === password) {
              authId = key.replace(/^PWD_/, '');
              expectedPassword = env[key];
              break;
            }
          }
        }
        if ((!authId || authId === 'admin') && passwords) {
          for (const [idKey, pwdVal] of Object.entries(passwords)) {
            if (pwdVal === password) {
              authId = idKey;
              expectedPassword = pwdVal;
              break;
            }
          }
        }
      }

      const isUser = Boolean(authId && expectedPassword && expectedPassword === password);

      if (!isAdmin && !isUser) {
        return new Response('Falsches Passwort', { status: 401, headers: corsHeaders });
      }

      // Login Check Route: Lädt zusätzlich die führenden Config-Dateien direkt aus dem Cloudflare-Ziel-Repository
      if (url.pathname === '/login') {
        const knownVermarkterIds = new Set();
        if (env) {
          for (const key of Object.keys(env)) {
            if (key.startsWith('PWD_')) {
              knownVermarkterIds.add(key.replace(/^PWD_/, ''));
            }
          }
        }
        for (const id of Object.keys(passwords)) {
          knownVermarkterIds.add(id);
        }

        let vermarkterInfo = null;
        if (authId && authId !== 'admin') {
          const paths = resolvePath('vermarkter', authId);
          vermarkterInfo = {
            id: authId,
            relativePath: paths.relativePath,
            fullPath: paths.fullPath
          };
        }

        // Lade Core, Data Partners und Vermarkter-Configs direkt aus dem in Cloudflare hinterlegten GitHub-Repo
        const [coreFile, dataPartnersFile] = await Promise.all([
          fetchGithubFile('config/core.js'),
          fetchGithubFile('config/data_partners.js')
        ]);

        let vermarkterFiles = [];
        if (isAdmin || loadAllVermarkter) {
          vermarkterFiles = await fetchAllVermarkterFiles(Array.from(knownVermarkterIds));
        } else if (authId && authId !== 'admin') {
          try {
            const singleFile = await fetchGithubFile(`config/vermarkter/${authId}.js`);
            vermarkterFiles = [{ id: authId, ...singleFile }];
          } catch (err) {
            // Falls authId ein Data Partner (z.B. uim_data) ist, existiert keine eigene Vermarkter-Datei
            vermarkterFiles = [];
          }
        }

        const allVermarkter = vermarkterFiles.map(v => ({
          id: v.id,
          relativePath: v.relativePath,
          fullPath: v.fullPath
        }));

        return new Response(JSON.stringify({ 
          success: true, 
          isAdmin,
          basePath,
          repository: {
            owner,
            repo,
            branch: targetBranch,
            basePath
          },
          vermarkter: vermarkterInfo,
          allVermarkter: isAdmin ? allVermarkter : undefined,
          configs: {
            core: coreFile,
            dataPartners: dataPartnersFile,
            vermarkter: vermarkterFiles
          }
        }), { 
          status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
      }

      if (!code) {
        return new Response('Fehlender Code', { status: 400, headers: corsHeaders });
      }

      // Zielpfad bestimmen und Rechte prüfen
      if (target === 'core' && !isAdmin) {
        return new Response('Nur Admins können core.js bearbeiten', { status: 403, headers: corsHeaders });
      }
      if (target === 'vermarkter' && !authId) {
        return new Response('Fehlende Vermarkter ID', { status: 400, headers: corsHeaders });
      }
      if (!['core', 'data_partners', 'vermarkter'].includes(target)) {
        return new Response('Ungültiges Target', { status: 400, headers: corsHeaders });
      }

      const paths = resolvePath(target, authId);
      const path = paths.fullPath;

      const githubGetUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(targetBranch)}`;
      const githubPutUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

      let sha = undefined;
      const getResponse = await fetch(githubGetUrl, { headers: githubHeaders });
      if (getResponse.ok) {
        const fileData = await getResponse.json();
        sha = fileData.sha;
      }

      const base64Content = encodeUtf8Base64(code);

      const putBody = {
        message: `Update Konfiguration für ${target} (${authId || ''}) via Editor`,
        content: base64Content,
        branch: targetBranch
      };

      if (sha) {
        putBody.sha = sha;
      }

      const putResponse = await fetch(githubPutUrl, {
        method: 'PUT',
        headers: githubHeaders,
        body: JSON.stringify(putBody)
      });

      if (!putResponse.ok) {
        const errorText = await putResponse.text();
        return new Response(`GitHub API Fehler: ${errorText}`, { status: 502, headers: corsHeaders });
      }

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Erfolgreich gespeichert!',
        savedPath: path,
        repository: `${owner}/${repo}@${targetBranch}`
      }), { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }
  }
};
