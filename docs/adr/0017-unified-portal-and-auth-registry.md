# ADR 0017: Unified Config Portal und Git-basierte Partner-Auth-Registry

- **Status**: Accepted
- **Kontext**: Bislang waren die Editoren in zwei getrennte Werkzeuge unterteilt (`core_editor.html` für DSPs/SSPs/Data Partners und `vermarkter_editor.html` für Vermarkter). Zudem mussten neue Partner-Passwörter manuell über Secrets im Cloudflare-Dashboard (`PWD_*`) hinterlegt werden, was für Administratoren umständlich war. Partner sahen außerdem technischen JavaScript-Code und es fehlte ein eindeutiger Hinweis auf den nächtlichen Veröffentlichungszyklus.
- **Entscheidung**: 
  1. **Gatekeeper Worker Erweiterung (Phase 1)**: Der Cloudflare Worker (`docs/gatekeeper_worker.js`) wird um eine Git-basierte Partner-Auth-Registry (`config/auth_registry.json`) erweitert. Passwörter werden sicher mit SHA-256 gehasht (unter Verwendung eines variablen Salts und eines Worker-Peppers), sodass Passwörter niemals im Klartext im GitHub-Repository liegen.
  2. **Admin-Endpoints zur Userverwaltung**: Bereitstellung von `POST /admin/save-partner-auth` und `POST /admin/delete-partner-auth`, mit denen der Administrator Partner-Logins direkt im Portal anlegen und verwalten kann, ohne sich je in Cloudflare einloggen zu müssen.
  3. **Rollenbasiertes Parsing & Speichern**: Der Worker unterstützt zielgerichtetes Aktualisieren einzelner Entitäten (`ssp`, `dsp`, `data_partner`, `vermarkter`), ohne dass Partner Zugriff auf fremde Datensätze haben.
  4. **Phase 2 & 3 Ausblick**: Zusammenführung beider Editoren in ein zentrales `editor.html` im einheitlichen OVK Landscape Design (Inter Font, OVK-Farben, formularbasiert ohne JS-Code für Partner, prominenter Übernacht-Live-Hinweis).
- **Konsequenzen**: 
  - *Vorteile*: Volle Benutzerverwaltung für den Admin ohne Cloudflare-Dashboard; automatische Rollenerkennung beim Login; granulare Berechtigungsabsicherung für alle Partnertypen; Vorbereitung auf eine konsistente, einheitliche Web-Oberfläche.
  - *Nachteile*: Der Cloudflare Worker Code muss einmalig im Cloudflare Dashboard aktualisiert werden (Copy & Paste aus `docs/gatekeeper_worker.js`), damit die neuen Endpoints aktiv werden.
