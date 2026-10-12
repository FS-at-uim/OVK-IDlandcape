export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Only POST allowed', { status: 405, headers: corsHeaders });
    }

    try {
      const body = await request.json();
      const { vermarkterId, password, code, target = 'vermarkter' } = body;
      const url = new URL(request.url);

      if (!password) {
        return new Response('Fehlendes Passwort', { status: 400, headers: corsHeaders });
      }

      // Passwort Validierung
      const passwords = JSON.parse(env.VERMARKTER_PASSWORDS || '{}');
      // Erlaubt sowohl das alte JSON-Format als auch individuelle Variablen (z.B. env.PWD_funke)
      const expectedPassword = env[`PWD_${vermarkterId}`] || passwords[vermarkterId];
      
      const isAdmin = (env.ADMIN_PASSWORD && password === env.ADMIN_PASSWORD);
      const isUser = (vermarkterId && expectedPassword && expectedPassword === password);

      if (!isAdmin && !isUser) {
        return new Response('Falsches Passwort', { status: 401, headers: corsHeaders });
      }

      // Hilfsfunktion: Pfadauflösung einheitlich für Login-Auskunft und Speichervorgang
      const rawBasePath = env.GITHUB_BASE_PATH || '';
      const basePath = rawBasePath.replace(/^\/+/, '').replace(/\/+$/, '');

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

      // Login Check Route
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
        if (vermarkterId && vermarkterId !== 'admin') {
          const paths = resolvePath('vermarkter', vermarkterId);
          vermarkterInfo = {
            id: vermarkterId,
            relativePath: paths.relativePath,
            fullPath: paths.fullPath
          };
        }

        const allVermarkter = Array.from(knownVermarkterIds).map(id => {
          const paths = resolvePath('vermarkter', id);
          return {
            id,
            relativePath: paths.relativePath,
            fullPath: paths.fullPath
          };
        });

        return new Response(JSON.stringify({ 
          success: true, 
          isAdmin,
          basePath,
          vermarkter: vermarkterInfo,
          allVermarkter: isAdmin ? allVermarkter : undefined
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
      if (target === 'vermarkter' && !vermarkterId) {
        return new Response('Fehlende Vermarkter ID', { status: 400, headers: corsHeaders });
      }
      if (!['core', 'data_partners', 'vermarkter'].includes(target)) {
        return new Response('Ungültiges Target', { status: 400, headers: corsHeaders });
      }

      const paths = resolvePath(target, vermarkterId);
      const path = paths.fullPath;

      // GitHub API Setup für Speicherung
      const owner = env.GITHUB_OWNER;
      const repo = env.GITHUB_REPO;
      const token = env.GITHUB_TOKEN;

      const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'OVK-Landscape-Gatekeeper'
      };

      let sha = undefined;
      const getResponse = await fetch(githubApiUrl, { headers });
      if (getResponse.ok) {
        const fileData = await getResponse.json();
        sha = fileData.sha;
      }

      const uint8array = new TextEncoder().encode(code);
      const base64Content = btoa(String.fromCharCode(...uint8array));

      // Erlaubt das Testen auf einem separaten Branch (Fallback auf 'main')
      const targetBranch = env.GITHUB_BRANCH || 'main';

      const putBody = {
        message: `Update Konfiguration für ${target} (${vermarkterId || ''}) via Editor`,
        content: base64Content,
        branch: targetBranch
      };

      if (sha) {
        putBody.sha = sha;
      }

      const putResponse = await fetch(githubApiUrl, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(putBody)
      });

      if (!putResponse.ok) {
        const errorText = await putResponse.text();
        return new Response(`GitHub API Fehler: ${errorText}`, { status: 502, headers: corsHeaders });
      }

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Erfolgreich gespeichert!',
        savedPath: path
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
