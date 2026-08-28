# ADR 0002: Gatekeeper Architecture für dezentrale Vermarkter-Updates

- **Status**: Accepted
- **Kontext**: Das OVK ID Landscape wird über GitHub Pages (statisches Hosting) bereitgestellt. Die Vermarkter sollen ihre eigene Konfiguration über den `vermarkter_editor.html` selbstständig und passwortgeschützt aktualisieren können. Da statische HTML/JS-Dateien keine sicheren Geheimnisse (wie GitHub API-Tokens oder Passwörter) speichern können, wird ein sicherer Mittelsmann benötigt.
- **Entscheidung**: Einführung eines "Gatekeepers" mittels Cloudflare Workers (Serverless Function). 
  - Der Cloudflare Worker dient als sichere API-Schnittstelle.
  - Im Worker werden die Passwörter der Vermarkter (als Hash) sowie das GitHub Personal Access Token (PAT) als Umgebungsvariable (Secrets) sicher verwahrt.
  - Der Frontend-Editor sendet den neuen Code sowie Vermarkter-ID und Passwort an den Worker.
  - Der Worker validiert das Passwort. Bei Erfolg schreibt er die aktualisierte Datei über die offizielle GitHub API (`PUT /repos/.../contents/...`) direkt in das Repository.
- **Konsequenzen**: 
  - **Vorteile:** 100% Serverless, kostenlos hostbar (Cloudflare Free Tier), absolute Sicherheit der GitHub-Tokens, Vermarkter können sich nicht gegenseitig überschreiben, keine manuelle Pflege durch den Admin notwendig.
  - **Nachteile:** Erfordert ein einmaliges Setup eines Cloudflare Accounts und das Anlegen des GitHub Tokens.
