# ADR 0014: Vollständige dynamische Discovery für Vermarkter-Dateien

- **Status**: Accepted
- **Kontext**: Bislang mussten neue Vermarkter-Dateien (`config/vermarkter/*.js`) manuell in die Lade-Arrays von `app.js` sowie in die `<script>`-Blöcke der Editoren (`vermarkter_editor.html`, `core_editor.html`) eingetragen werden. Dies entsprach nicht dem "Drop & Go"-Konzept, nach dem eine neue Datei im Verzeichnis automatisch geladen und erkannt werden soll.
- **Entscheidung**: `app.js` und die Editoren nutzen nun beim Laden einen asynchronen `fetch`-Aufruf auf das Verzeichnis `config/vermarkter/`. Die Antwort (ein vom lokalen Python-Server generiertes HTML-Directory-Listing) wird per Regex (`/href="([^"]+\.js)"/`) geparst, um alle verfügbaren `.js`-Dateien automatisch zu finden und zu laden. Falls das Directory-Listing nicht verfügbar ist (z.B. auf restriktiven Produktionsservern), greift weiterhin eine statische Fallback-Liste.
- **Konsequenzen**: Entwickler müssen Vermarkter-Dateien nicht mehr händisch im Code eintragen. Das Hinzufügen oder Löschen einer Datei im Ordner reicht aus, solange der eingesetzte lokale Server (`python3 -m http.server`) das Directory-Listing unterstützt.
