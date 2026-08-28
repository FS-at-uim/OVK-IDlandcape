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

      // Login Check Route
      if (url.pathname === '/login') {
        return new Response(JSON.stringify({ success: true, isAdmin }), { 
          status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
      }

      if (!code) {
        return new Response('Fehlender Code', { status: 400, headers: corsHeaders });
      }

      // Zielpfad bestimmen und Rechte prüfen
      let path = '';
      if (target === 'core') {
          if (!isAdmin) return new Response('Nur Admins können core.js bearbeiten', { status: 403, headers: corsHeaders });
          path = 'config/core.js';
      } else if (target === 'data_partners') {
          // Data Partners können die Datei aktualisieren, sofern sie ein gültiges PW haben (isUser oder isAdmin)
          path = 'config/data_partners.js';
      } else if (target === 'vermarkter') {
          if (!vermarkterId) return new Response('Fehlende Vermarkter ID', { status: 400, headers: corsHeaders });
          path = `config/vermarkter/${vermarkterId}.js`;
      } else {
          return new Response('Ungültiges Target', { status: 400, headers: corsHeaders });
      }

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
        message: `Update Konfiguration für ${target} (via Editor)`,
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

      return new Response(JSON.stringify({ success: true, message: 'Erfolgreich gespeichert!' }), { 
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
