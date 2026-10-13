# ADR 0016: Bereitstellung von In-App Hilfe und Admin-Dokumentation

- **Status**: Accepted
- **Kontext**: Partner (Vermarkter und Data Partner) sowie Administratoren benötigen eine klare, verständliche Dokumentation zur Bedienung der Editoren (`vermarkter_editor.html` und `core_editor.html`). Bislang gab es keine integrierte Hilfe in den Editoren, sodass Nutzer ohne externe Anleitung nicht wussten, welche Felder gepflegt werden müssen (z. B. 65 Zeichen Begrenzung, Coverage %, SSP-Opt-Ins, Curation-SSPs). Zudem fehlte ein zentraler Leitfaden für Admins zur Vergabe von Passwörtern und zum Anlegen neuer Partner.
- **Entscheidung**: 
  1. Erstellung zweier dedizierter Handbücher im Repository: [`docs/admin_guide.md`](docs/admin_guide.md) für Administratoren und [`docs/partner_guide.md`](docs/partner_guide.md) für Vermarkter und Data Partner.
  2. Direkte Integration des Partner-Guides als interaktives Hilfe-Modal in die Benutzeroberfläche der Editoren (`vermarkter_editor.html` und `core_editor.html`). Der Zugriff auf das Hilfe-Modal ist bewusst erst nach erfolgreicher Authentifizierung im Header über den Button *"📖 Anleitung / Hilfe"* verfügbar, sodass unautorisierte Besucher auf dem Login-Screen keine internen Prozessdetails einsehen können.
- **Konsequenzen**: 
  - *Vorteile*: Maximale Nutzerfreundlichkeit und Onboarding-Geschwindigkeit für neue Partner; Fehlerquellen bei der Dateneingabe werden minimiert; keine externen Dokumentations-PDFs oder E-Mail-Anhänge notwendig.
  - *Nachteile*: Bei inhaltlichen Änderungen an den Datenfeldern müssen sowohl die Markdown-Dokumente als auch die HTML-Hilfe-Modale aktuell gehalten werden.
