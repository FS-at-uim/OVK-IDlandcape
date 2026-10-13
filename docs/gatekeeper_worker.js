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

      // Pepper für Password-Hashing (aus ENV oder Fallback auf ADMIN_PASSWORD)
      const authPepper = env.AUTH_SALT || env.ADMIN_PASSWORD || 'ovk-gatekeeper-pepper-secret';

      // Hilfsfunktion: Pfadauflösung einheitlich für Lese- und Speichervorgang
      const resolvePath = (tgt, id) => {
        let relPath = '';
        if (tgt === 'core') {
          relPath = 'config/core.js';
        } else if (tgt === 'data_partners' || tgt === 'data_partner') {
          relPath = 'config/data_partners.js';
        } else if (tgt === 'vermarkter') {
          relPath = `config/vermarkter/${id}.js`;
        } else if (tgt === 'auth_registry') {
          relPath = 'config/auth_registry.json';
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

      // Kryptografische Hilfsfunktionen (Web Crypto API)
      const generateSalt = () => {
        const bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);
        return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
      };

      const hashPassword = async (password, salt) => {
        const enc = new TextEncoder();
        const data = enc.encode(`${salt}:${password}:${authPepper}`);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      };

      // Hilfsfunktion: Einzelne Datei direkt aus dem in Cloudflare konfigurierten GitHub-Repo laden
      const fetchGithubFile = async (relPath, allowNotFound = false) => {
        const fullPath = basePath.length > 0 ? `${basePath}/${relPath}` : relPath;
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${fullPath}?ref=${encodeURIComponent(targetBranch)}`;
        const res = await fetch(apiUrl, { headers: githubHeaders });
        if (res.status === 404 && allowNotFound) {
          return null;
        }
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

      // Hilfsfunktion: Datei in GitHub committen / speichern
      const saveGithubFile = async (relPath, contentStr, commitMessage) => {
        const fullPath = basePath.length > 0 ? `${basePath}/${relPath}` : relPath;
        const githubGetUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${fullPath}?ref=${encodeURIComponent(targetBranch)}`;
        const githubPutUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${fullPath}`;

        let sha = undefined;
        const getResponse = await fetch(githubGetUrl, { headers: githubHeaders });
        if (getResponse.ok) {
          const fileData = await getResponse.json();
          sha = fileData.sha;
        }

        const base64Content = encodeUtf8Base64(contentStr);
        const putBody = {
          message: commitMessage,
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
          throw new Error(`GitHub API Fehler (${putResponse.status}): ${errorText}`);
        }

        return { fullPath, sha };
      };

      // Hilfsfunktionen für Auth-Registry im GitHub Repo
      const loadAuthRegistry = async () => {
        try {
          const file = await fetchGithubFile('config/auth_registry.json', true);
          if (!file || !file.code) return { partners: {} };
          const parsed = JSON.parse(file.code);
          return parsed.partners ? parsed : { partners: {} };
        } catch (e) {
          return { partners: {} };
        }
      };

      const saveAuthRegistry = async (registry, commitMessage) => {
        const jsonStr = JSON.stringify(registry, null, 2);
        return await saveGithubFile('config/auth_registry.json', jsonStr, commitMessage);
      };

      // Hilfsfunktion: Sicheres Auswerten und Serialisieren von Config-Objekten
      const parseConfigCode = (code) => {
        const fakeWindow = {};
        const fn = new Function('window', code + '\nreturn window.OVK_LANDSCAPE_CONFIG;');
        return fn(fakeWindow) || {};
      };

      const serializeCoreConfig = (configObj) => {
        return `// OVK ID Landscape Map - Core Konfigurationsdaten\n// IDs, Usecases, DSPs, SSPs\n\nwindow.OVK_LANDSCAPE_CONFIG = ${JSON.stringify(configObj, null, 2)};\n`;
      };

      const serializeDataPartnersConfig = (dataPartnersArray) => {
        return `// OVK ID Landscape Map - Data Partner Konfigurationsdaten\n\nif (!window.OVK_LANDSCAPE_CONFIG) {\n  window.OVK_LANDSCAPE_CONFIG = {};\n}\n\nwindow.OVK_LANDSCAPE_CONFIG.dataPartners = ${JSON.stringify(dataPartnersArray, null, 2)};\n`;
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
      const {
        email,
        username,
        vermarkterId,
        password,
        code,
        data,
        target = 'vermarkter',
        partnerId: inputPartnerId,
        loadAllVermarkter = false
      } = body;

      if (!password) {
        return new Response(JSON.stringify({ error: 'Fehlendes Passwort' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const loginIdentifier = (email || username || inputPartnerId || vermarkterId || '').trim();
      const loginIdentifierLower = loginIdentifier.toLowerCase();

      // Check Master Admin Password (aus Environment)
      let isAdmin = Boolean(env.ADMIN_PASSWORD && password === env.ADMIN_PASSWORD);
      let authRole = isAdmin ? 'admin' : null;
      let authPartnerId = isAdmin ? 'admin' : null;
      let authPartnerName = isAdmin ? 'Master Administrator' : null;
      let authEmail = isAdmin ? (env.ADMIN_EMAIL || 'admin@ovk.de') : null;

      // 1. Authentifizierung über auth_registry.json im GitHub-Repo prüfen
      const authRegistry = await loadAuthRegistry();
      let matchedAccount = null;
      let matchedKey = null;

      if (!isAdmin) {
        // Falls spezifische ID oder E-Mail übergeben wurde
        if (loginIdentifierLower && loginIdentifierLower !== 'admin') {
          for (const [accId, accData] of Object.entries(authRegistry.partners)) {
            const accEmailLower = (accData.email || '').toLowerCase();
            if (accId.toLowerCase() === loginIdentifierLower || accEmailLower === loginIdentifierLower) {
              const calculatedHash = await hashPassword(password, accData.salt);
              if (calculatedHash === accData.hash) {
                matchedAccount = accData;
                matchedKey = accId;
                break;
              }
            }
          }
        }

        // Falls keine spezifische Kennung passte oder nur Passwort übergeben wurde (Auto-Erkennung)
        if (!matchedAccount) {
          for (const [accId, accData] of Object.entries(authRegistry.partners)) {
            const calculatedHash = await hashPassword(password, accData.salt);
            if (calculatedHash === accData.hash) {
              matchedAccount = accData;
              matchedKey = accId;
              break;
            }
          }
        }

        if (matchedAccount) {
          authRole = matchedAccount.role;
          authPartnerName = matchedAccount.name || matchedKey;
          authPartnerId = matchedAccount.partnerId || (authRole !== 'admin' ? matchedKey : 'admin');
          authEmail = matchedAccount.email || (matchedKey.includes('@') ? matchedKey : null);
          if (authRole === 'admin') {
            isAdmin = true;
          }
        }
      }

      // 2. Fallback: Authentifizierung über Cloudflare Environment-Variablen (PWD_* / VERMARKTER_PASSWORDS)
      if (!isAdmin && !authRole) {
        let fallbackId = loginIdentifierLower || null;
        const passwords = JSON.parse(env.VERMARKTER_PASSWORDS || '{}');
        let expectedPassword = fallbackId ? (env[`PWD_${fallbackId}`] || passwords[fallbackId]) : undefined;

        if (!expectedPassword) {
          if (env) {
            for (const key of Object.keys(env)) {
              if (key.startsWith('PWD_') && env[key] === password) {
                fallbackId = key.replace(/^PWD_/, '');
                expectedPassword = env[key];
                break;
              }
            }
          }
          if (!expectedPassword && passwords) {
            for (const [idKey, pwdVal] of Object.entries(passwords)) {
              if (pwdVal === password) {
                fallbackId = idKey;
                expectedPassword = pwdVal;
                break;
              }
            }
          }
        }

        if (expectedPassword && expectedPassword === password) {
          authRole = fallbackId.endsWith('_data') ? 'data_partner' : 'vermarkter';
          authPartnerId = fallbackId;
          authPartnerName = fallbackId;
        }
      }

      if (!isAdmin && !authRole) {
        return new Response(JSON.stringify({ error: 'Falsches Passwort oder ungültige Benutzerdaten' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // -------------------------------------------------------------
      // Route: POST /admin/save-partner-auth (Admin legt Partner-/Admin-Login an / ändert Passwort)
      // -------------------------------------------------------------
      if (url.pathname === '/admin/save-partner-auth') {
        if (!isAdmin) {
          return new Response(JSON.stringify({ error: 'Nur Admins können Logins verwalten' }), {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const { targetPartnerId, email: newEmail, role: newRole, name: newName, newPassword } = body;
        const finalKey = (targetPartnerId || newEmail || '').trim().toLowerCase();
        if (!finalKey || !newPassword || !newRole) {
          return new Response(JSON.stringify({ error: 'Fehlende Parameter (E-Mail/ID, Rolle, Passwort)' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const salt = generateSalt();
        const hash = await hashPassword(newPassword, salt);

        authRegistry.partners[finalKey] = {
          role: newRole,
          name: newName || (newEmail ? newEmail.split('@')[0] : finalKey),
          email: newEmail || (finalKey.includes('@') ? finalKey : undefined),
          partnerId: newRole !== 'admin' ? (targetPartnerId || finalKey) : undefined,
          salt,
          hash,
          updatedAt: new Date().toISOString()
        };

        await saveAuthRegistry(authRegistry, `Admin: Update Auth für ${newRole} ${finalKey}`);

        return new Response(JSON.stringify({
          success: true,
          message: `Login für ${newName || finalKey} (${newRole}) erfolgreich gespeichert!`,
          partnerId: finalKey,
          role: newRole
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // -------------------------------------------------------------
      // Route: POST /admin/delete-partner-auth (Admin löscht Partner-Login)
      // -------------------------------------------------------------
      if (url.pathname === '/admin/delete-partner-auth') {
        if (!isAdmin) {
          return new Response(JSON.stringify({ error: 'Nur Admins können Partner-Logins löschen' }), {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const { targetPartnerId } = body;
        if (!targetPartnerId || !authRegistry.partners[targetPartnerId]) {
          return new Response(JSON.stringify({ error: 'Partner-Login nicht gefunden' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        delete authRegistry.partners[targetPartnerId];
        await saveAuthRegistry(authRegistry, `Admin: Lösche Auth für Partner ${targetPartnerId}`);

        return new Response(JSON.stringify({
          success: true,
          message: `Login für ${targetPartnerId} erfolgreich entfernt!`
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // -------------------------------------------------------------
      // Route: POST /login
      // -------------------------------------------------------------
      if (url.pathname === '/login') {
        const [coreFile, dataPartnersFile] = await Promise.all([
          fetchGithubFile('config/core.js'),
          fetchGithubFile('config/data_partners.js')
        ]);

        let vermarkterFiles = [];
        if (isAdmin || loadAllVermarkter || authRole === 'admin') {
          vermarkterFiles = await fetchAllVermarkterFiles();
        } else if (authRole === 'vermarkter' && authPartnerId) {
          try {
            const singleFile = await fetchGithubFile(`config/vermarkter/${authPartnerId}.js`);
            vermarkterFiles = [{ id: authPartnerId, ...singleFile }];
          } catch (err) {
            vermarkterFiles = [];
          }
        }

        // Sanitized Benutzer- und Partner-Liste für Admin-Oberfläche (ohne Hashes & Salts)
        const sanitizedAuthPartners = isAdmin
          ? Object.entries(authRegistry.partners).map(([id, p]) => ({
              id,
              role: p.role,
              name: p.name,
              email: p.email || (id.includes('@') ? id : ''),
              partnerId: p.partnerId || (p.role !== 'admin' ? id : null),
              updatedAt: p.updatedAt
            }))
          : undefined;

        return new Response(JSON.stringify({
          success: true,
          isAdmin,
          role: authRole,
          partnerId: authPartnerId,
          partnerName: authPartnerName,
          email: authEmail,
          basePath,
          repository: {
            owner,
            repo,
            branch: targetBranch,
            basePath
          },
          vermarkter: (authRole === 'vermarkter' && authPartnerId) ? {
            id: authPartnerId,
            relativePath: `config/vermarkter/${authPartnerId}.js`,
            fullPath: basePath.length > 0 ? `${basePath}/config/vermarkter/${authPartnerId}.js` : `config/vermarkter/${authPartnerId}.js`
          } : null,
          allVermarkter: isAdmin ? vermarkterFiles.map(v => ({ id: v.id, relativePath: v.relativePath, fullPath: v.fullPath })) : undefined,
          authPartners: sanitizedAuthPartners,
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

      // -------------------------------------------------------------
      // Route: Speichern (POST /save oder Standard-POST)
      // -------------------------------------------------------------
      const effectiveTarget = target;
      const targetEntityId = inputPartnerId || authPartnerId;

      // Berechtigungsprüfungen für Speicheraktionen
      if (effectiveTarget === 'core' && !isAdmin) {
        return new Response(JSON.stringify({ error: 'Nur Admins können die gesamte core.js bearbeiten' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (effectiveTarget === 'data_partners' && !isAdmin) {
        return new Response(JSON.stringify({ error: 'Nur Admins können die gesamte data_partners.js bearbeiten' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (effectiveTarget === 'vermarkter') {
        if (!isAdmin && authPartnerId !== targetEntityId) {
          return new Response(JSON.stringify({ error: 'Keine Berechtigung für diesen Vermarkter' }), {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      }

      if (effectiveTarget === 'ssp') {
        if (!isAdmin && (authRole !== 'ssp' || authPartnerId !== targetEntityId)) {
          return new Response(JSON.stringify({ error: 'Keine Berechtigung für diesen SSP' }), {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      }

      if (effectiveTarget === 'dsp') {
        if (!isAdmin && (authRole !== 'dsp' || authPartnerId !== targetEntityId)) {
          return new Response(JSON.stringify({ error: 'Keine Berechtigung für diesen DSP' }), {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      }

      if (effectiveTarget === 'data_partner') {
        if (!isAdmin && (authRole !== 'data_partner' || authPartnerId !== targetEntityId)) {
          return new Response(JSON.stringify({ error: 'Keine Berechtigung für diesen Data Partner' }), {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      }

      // Durchführung des Speichervorgangs je nach Target
      let savedPath = '';

      if (effectiveTarget === 'core') {
        if (!code) throw new Error('Fehlender Code für core.js');
        const res = await saveGithubFile('config/core.js', code, 'Update core.js via Editor');
        savedPath = res.fullPath;

      } else if (effectiveTarget === 'data_partners') {
        if (!code) throw new Error('Fehlender Code für data_partners.js');
        const res = await saveGithubFile('config/data_partners.js', code, 'Update data_partners.js via Editor');
        savedPath = res.fullPath;

      } else if (effectiveTarget === 'vermarkter') {
        if (!code) throw new Error('Fehlender Code für Vermarkter');
        const paths = resolvePath('vermarkter', targetEntityId);
        const res = await saveGithubFile(paths.relativePath, code, `Update Vermarkter ${targetEntityId} via Editor`);
        savedPath = res.fullPath;

      } else if (effectiveTarget === 'ssp') {
        // Zielgerichtetes Aktualisieren einer einzelnen SSP in config/core.js
        const coreFileData = await fetchGithubFile('config/core.js');
        const coreConfig = parseConfigCode(coreFileData.code);
        if (!coreConfig.ssps) coreConfig.ssps = [];

        const sspIndex = coreConfig.ssps.findIndex(s => s.id === targetEntityId);
        if (sspIndex >= 0) {
          coreConfig.ssps[sspIndex] = { ...coreConfig.ssps[sspIndex], ...data, id: targetEntityId };
        } else {
          coreConfig.ssps.push({ ...data, id: targetEntityId });
        }

        const updatedCode = serializeCoreConfig(coreConfig);
        const res = await saveGithubFile('config/core.js', updatedCode, `Update SSP ${targetEntityId} via Editor`);
        savedPath = res.fullPath;

      } else if (effectiveTarget === 'dsp') {
        // Zielgerichtetes Aktualisieren einer einzelnen DSP in config/core.js
        const coreFileData = await fetchGithubFile('config/core.js');
        const coreConfig = parseConfigCode(coreFileData.code);
        if (!coreConfig.dsps) coreConfig.dsps = [];

        const dspIndex = coreConfig.dsps.findIndex(d => d.id === targetEntityId);
        if (dspIndex >= 0) {
          coreConfig.dsps[dspIndex] = { ...coreConfig.dsps[dspIndex], ...data, id: targetEntityId };
        } else {
          coreConfig.dsps.push({ ...data, id: targetEntityId });
        }

        const updatedCode = serializeCoreConfig(coreConfig);
        const res = await saveGithubFile('config/core.js', updatedCode, `Update DSP ${targetEntityId} via Editor`);
        savedPath = res.fullPath;

      } else if (effectiveTarget === 'data_partner') {
        // Zielgerichtetes Aktualisieren eines Data Partners in config/data_partners.js
        const dpFileData = await fetchGithubFile('config/data_partners.js');
        const fakeWindow = {};
        (new Function('window', dpFileData.code + '\nreturn window.OVK_LANDSCAPE_CONFIG;'))(fakeWindow);
        const dpConfig = fakeWindow.OVK_LANDSCAPE_CONFIG || {};
        if (!dpConfig.dataPartners) dpConfig.dataPartners = [];

        const dpIndex = dpConfig.dataPartners.findIndex(p => p.id === targetEntityId);
        if (dpIndex >= 0) {
          dpConfig.dataPartners[dpIndex] = { ...dpConfig.dataPartners[dpIndex], ...data, id: targetEntityId };
        } else {
          dpConfig.dataPartners.push({ ...data, id: targetEntityId });
        }

        const updatedCode = serializeDataPartnersConfig(dpConfig.dataPartners);
        const res = await saveGithubFile('config/data_partners.js', updatedCode, `Update Data Partner ${targetEntityId} via Editor`);
        savedPath = res.fullPath;

      } else {
        return new Response(JSON.stringify({ error: `Unbekanntes Target: ${effectiveTarget}` }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'Erfolgreich gespeichert!',
        savedPath,
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
