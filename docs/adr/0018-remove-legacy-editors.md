# ADR 0018: Entfernung der Legacy-Editoren und Bereinigung der Prototypen

- **Status**: Accepted
- **Kontext**: Nach der erfolgreichen Fertigstellung und Validierung des einheitlichen Portals `editor.html` (mit Multi-Admin via E-Mail, rollenbasierter Partneransicht, Coverage-Matrix und Anbindung an den Gatekeeper-Worker) existierten im Projekt noch die ungenutzten Vorläufer-Dateien `core_editor.html`, `vermarkter_editor.html` sowie der temporäre Prototyp `editor_concept.html`. Diese erzeugten Redundanz und Verwirrung bezüglich der maßgeblichen Pflegemaske.
- **Entscheidung**: 
  1. `core_editor.html` und `vermarkter_editor.html` wurden vollständig aus dem Projekt gelöscht, da sie nie produktiv genutzt wurden und sämtliche Funktionalitäten nun im Unified Portal `editor.html` abgebildet sind.
  2. `editor_concept.html` wurde gelöscht, nachdem alle Layout- und UX-Verbesserungen (960px Breite, tech.ovk.de Look, Inline-Hinweis zur nächtlichen Veröffentlichung) in `editor.html` überführt wurden.
  3. Alle Dokumentationen (`README.md`, `docs/README.md`, `docs/admin_guide.md`, `docs/partner_guide.md`, `docs/cloudflare_setup.md`) wurden bereinigt und weisen nun ausschließlich auf `editor.html` hin.
- **Konsequenzen**: 
  - *Vorteile*: Aufgeräumtes Repository ohne veraltete Altlasten; eineindeutige Zuordnung des Portals für Admins und Partner (`Single Point of Entry`: `editor.html`).
  - *Nachteile*: Keine – die alten Editoren waren nie produktiv im Einsatz.
