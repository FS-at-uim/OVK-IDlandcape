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
      const { vermarkterId, password, code } = body;
      const url = new URL(request.url);

      if (!password) {
        return new Response('Fehlendes Passwort', { status: 400, headers: corsHeaders });
      }

      // Passwort Validierung (Admin oder spezifischer Vermarkter)
      const passwords = JSON.parse(env.VERMARKTER_PASSWORDS || '{}');
      const isAdmin = (env.ADMIN_PASSWORD && password === env.ADMIN_PASSWORD);
      const isVermarkter = (vermarkterId && passwords[vermarkterId] === password);

      if (!isAdmin && !isVermarkter) {
        return new Response('Falsches Passwort', { status: 401, headers: corsHeaders });
      }

      // Login Check Route
      if (url.pathname === '/login') {
        return new Response(JSON.stringify({ success: true, isAdmin }), { 
          status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
      }

      // Wenn kein Code mitgeliefert wurde (und es kein /login war)
      if (!code || !vermarkterId) {
        return new Response('Fehlende Parameter für Speicherung', { status: 400, headers: corsHeaders });
      }

      // GitHub API Setup für Speicherung
      const owner = env.GITHUB_OWNER;
      const repo = env.GITHUB_REPO;
      const path = `config/vermarkter/${vermarkterId}.js`;
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

      const putBody = {
        message: `Update Konfiguration für ${vermarkterId} (via Editor)`,
        content: base64Content,
        branch: 'main'
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
