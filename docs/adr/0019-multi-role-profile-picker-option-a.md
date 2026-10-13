# ADR 0019: Multi-Role Profilauswahl (Option A) bei identischer E-Mail-Adresse

- **Status**: Accepted
- **Kontext**:
  Ein Benutzer kann im System mehrere unterschiedliche Rollen besitzen (z. B. Administrator mit globalem Vollzugriff und gleichzeitig Vermarkter-Account für UIM zur Pflege des eigenen Inventars). Wenn für beide Rollen dieselbe E-Mail-Adresse oder dasselbe Passwort verwendet wird, bestand bisher die Gefahr von Schlüsselkollisionen in `auth_registry.json` oder einer unbeabsichtigten Rolleneskalation auf Admin-Rechte.
  Der Benutzer entschied sich für **Option A**: Die Portal-Anmeldung soll bei Erkennung mehrerer berechtigter Rollen/Profile für eine Login-Kennung einen interaktiven Profil-Auswahldialog ("Wähle dein Profil") anzeigen.

- **Entscheidung**:
  1. **Zusammengesetzte Profil-Schlüssel**:
     In `config/auth_registry.json` werden Einträge nicht mehr ausschließlich über die E-Mail als Primärschlüssel indexiert, sondern über zusammengesetzte Profile-Keys: `${email}:admin` für Admins und `${email}:${role}:${partnerId}` für Partnerzugänge.
  2. **Gatekeeper-Worker Authentifizierungs-Flow**:
     - Bei der Anmeldung mit E-Mail und Passwort ermittelt der Worker alle passenden Profile, für die das eingegebene Passwort via SHA-256 + Salt gültig ist.
     - Gibt es genau 1 passendes Profil, loggt der Worker den Benutzer direkt in dieses Profil ein.
     - Gibt es mehrere passende Profile für dieselbe Kennung, gibt der Worker `{ success: true, requireProfileSelection: true, email, profiles: [...] }` zurück.
     - Der Worker unterstützt den Parameter `selectedProfileKey`, um bei der Bestätigung exakt die ausgewählte Rolle und Berechtigung zu laden.
     - Kein automatischer Fallback auf Master-Admin mehr bei Partner-Logins mit übereinstimmendem Passwort.
  3. **Editor Frontend (editor.html)**:
     - Integration eines interaktiven Profilauswahl-Screens im Login-Overlay (`#profilePickerSection`) mit visuellen Rollen-Badges, Icons und Rückkehr-Option.
     - Erweiterung der Benutzerverwaltung (`#sectionAuthRegistry`) um ein verstecktes Feld `auth_profile_key`, sodass Admins bestehende Profile gezielt editieren oder für dieselbe E-Mail-Adresse zusätzliche Rollen anlegen können.
     - Löschen und Editieren nutzen nun den eindeutigen `profileKey`.

- **Konsequenzen**:
  - **Vorteile**:
    - Maximale Flexibilität: Benutzer können dieselbe E-Mail-Adresse für mehrere Rollen nutzen, ohne Zugangsdaten zu vermischen.
    - Strikte Rechte-Trennung: Ein Vermarkter-Login sieht niemals fremde Partner-Daten oder Admin-Tabs, selbst wenn das Passwort identisch mit dem Admin-Passwort ist.
    - Klare Benutzerführung im UI durch visuelle Kacheln mit Rollen-Icons.
  - **Nachteile / Wartung**:
    - Der Gatekeeper-Worker auf Cloudflare muss mit der aktuellen `docs/gatekeeper_worker.js` aktualisiert werden.
