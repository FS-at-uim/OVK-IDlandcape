# ADR 0020: Zentrale Passwortverwaltung & direkte Multi-Role-Zuweisung pro E-Mail

- **Status**: Accepted
- **Kontext**:
  Wenn eine E-Mail-Adresse mehrere Rollen im Portal innehat (z. B. Administrator und Vermarkter UIM), führte die separate Erfassung einzelner Rollen-Accounts in der Benutzerverwaltung dazu, dass theoretisch unterschiedliche Passwörter für dieselbe E-Mail-Adresse vergeben werden konnten. Zudem war die Benutzerverwaltung unübersichtlich, wenn dieselbe E-Mail mehrfach als getrennte Tabellenzeile erschien.

- **Entscheidung**:
  1. **Zentrales Benutzer- & Passwortmodell (1 User = 1 E-Mail = 1 Passwort)**:
     - Ein Benutzer wird primär über seine eindeutige E-Mail-Adresse identifiziert.
     - Es gibt pro E-Mail-Adresse genau einen Salt- und Hash-Wert für das Passwort.
     - Beim Ändern von Rollen oder des Anzeigenamens bleibt das bestehende Passwort erhalten (Passwortfeld kann beim Bearbeiten leer gelassen werden).
     - Bei Vergabe eines neuen Passworts gilt dieses sofort und einheitlich für alle Rollen des Benutzers.
  2. **Direkte Multi-Role Zuweisungs-UI in `editor.html`**:
     - In der Anlege- und Bearbeitungsmaske von `sectionAuthRegistry` werden die Rollen nicht mehr als Einzelauswahl, sondern als Zuweisungs-Panel mit Checkboxen und Partner-Dropdowns dargestellt.
     - Der Administrator kann einer E-Mail gleichzeitig Admin-Rechte (`admin`) sowie beliebige Partner-Rollen (`vermarkter`, `ssp`, `dsp`, `data_partner` mit jeweiliger Partner-ID) zuweisen.
     - Die Benutzer-Tabelle aggregiert alle zugewiesenen Rollen pro E-Mail in einer einzigen Zeile mit Rollen-Badges.
  3. **Gatekeeper-Worker Normalisierung & Auth-Flow (`docs/gatekeeper_worker.js`)**:
     - Der Worker normalisiert bestehende Registry-Einträge automatisch (`getNormalizedRegistry`), sodass Legacy-Accounts, getrennte Rollen und neue Multi-Role-Accounts nahtlos miteinander harmonieren.
     - Beim Login verifiziert der Worker das zentrale Passwort. Besitzt der Benutzer mehrere Rollen, liefert der Worker `requireProfileSelection: true` mit den Profil-Optionen aus. Bei nur einer Rolle erfolgt der direkte Login.

- **Konsequenzen**:
  - **Vorteile**:
    - Vollständige Vermeidung von Passwort-Divergenzen bei Benutzern mit mehreren Rollen.
    - Wesentlich ergonomischere Benutzerverwaltung im Admin-Bereich (1 Zeile pro Person/E-Mail, direkte Rollenzuweisung).
    - Passwortänderung muss nur einmal durchgeführt werden und wirkt sofort auf alle Rollen der Person.
  - **Nachteile / Wartung**:
    - Der Cloudflare Worker muss erneut mit der aktualisierten `docs/gatekeeper_worker.js` deployed werden.
