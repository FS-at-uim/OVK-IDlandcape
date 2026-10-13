# ADR 0021: Behebung des Speichervorgangs & Trennung von Profilauswahl und Aktions-Routen

- **Status**: Accepted
- **Kontext**:
  - Beim Speichern von Konfigurationsänderungen aus dem Editor (`editor.html`) – sowohl in der Rolle `admin` (z. B. für Core-Kataloge, Data Partner oder Vermarkter) als auch in der Rolle `vermarkter` (z. B. UIM) – wurden keine Änderungen im Ziel-GitHub-Repository committet.
  - Ursachenanalyse:
    1. **Interceptor-Fehler im Gatekeeper-Worker**: Die Prüfung auf Mehrfach-Rollen (`matchedUser.roles.length > 1`) lag in `docs/gatekeeper_worker.js` im globalen Authentifizierungsblock vor dem Routing. Da `POST /save` ohne URL-Guard diesen Block passierte, fing der Worker die Speicheranfrage ab und lieferte HTTP 200 mit `{ success: true, requireProfileSelection: true }` zurück. Der eigentliche `/save`-Block wurde nie erreicht.
    2. **Falsch-Positives Feedback im Editor**: Im Client prüften die Speicherfunktionen lediglich `if (res.ok)`. Weil der abgefangene Request mit Status 200 beantwortet wurde, zeigte die Benutzeroberfläche fälschlicherweise ein grünes Häkchen („Erfolgreich gespeichert!“), obwohl GitHub nie angesprochen worden war.
    3. **Fehlende Caller-Identität beim Speichern**: Beim Absenden der Speicheranfragen wurde bisher nur das Passwort übermittelt, nicht jedoch die aktive Profilkennung oder Benutzerrolle (`authEmail`, `authRole`, `selectedProfileKey`). Dadurch kam es bei der Auto-Erkennung oder Ziel-IDs (`partnerId`) zu Rollen- und Rechtekonflikten.
    4. **Rechteprüfung für Admin-Benutzer**: Benutzer mit zugewiesener Admin-Rolle konnten Vermarkter-Dateien nicht immer editieren, wenn die Ziel-ID nicht ihrer primären Rolle entsprach.

- **Entscheidung**:
  1. **Strikte Isolierung von `requireProfileSelection` auf `POST /login`**:
     - Die Rückgabe von `{ success: true, requireProfileSelection: true }` im Cloudflare Worker erfolgt ausnahmslos nur, wenn `url.pathname === '/login'`.
     - Bei allen anderen Routen (`/save`, `/admin/save-partner-auth`, `/admin/delete-partner-auth`) wird der authentifizierte Benutzer direkt verifiziert und die angeforderte bzw. passende Rolle gewählt.
  2. **Caller-Identität & `getAuthPayload()` im Editor**:
     - Einführung einer zentralen Hilfsfunktion `getAuthPayload(extra)` in `editor.html`.
     - Jede Schreibanfrage (`saveActiveVermarkter`, `saveActiveSSP`, `saveActiveDSP`, `saveActiveDataPartner`, `saveCoreCatalogs`, `saveEntireDataPartnersFile`, `submitPartnerAuth`, `deleteUserAuthByIndex`) sendet neben dem Session-Passwort die Caller-Identität: `authEmail`, `authRole` und `selectedProfileKey`.
  3. **Vollständige Admin- und Partner-Berechtigungsmatrix**:
     - `userHasAdminRole = isAdmin || (authenticatedUser && authenticatedUser.roles && authenticatedUser.roles.some(r => r.role === 'admin'))`.
     - Admins dürfen alle Ziele (`core`, `data_partners`, alle Vermarkter, SSPs, DSPs, Data Partner) speichern.
     - Partner (z. B. `vermarkter: uim`) dürfen ihre zugewiesenen Partner-Konfigurationen speichern.
  4. **Strikte Erfolgsprüfung in der UI**:
     - Alle Speicheraktionen prüfen jetzt `if (res.ok && resData.success && !resData.requireProfileSelection)`.
     - Im Fehlerfall wird die exakte Fehlermeldung (`resData.error`) angezeigt.

- **Konsequenzen**:
  - **Vorteile**:
    - Speicherungen aus `editor.html` werden zuverlässig in GitHub committet.
    - Sowohl Admins als auch Partner können ihre berechtigten Konfigurationen speichern.
    - Keine irreführenden Erfolgsmeldungen mehr.
    - Rückwärtskompatibel zu Single-Role- und Master-Admin-Anmeldungen.
  - **Nachteile**:
    - Der Cloudflare Worker `docs/gatekeeper_worker.js` muss neu in Cloudflare bereitgestellt werden.
