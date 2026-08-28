# ADR 0010: Dynamisches Cache-Busting und vollständiges Laden aller Vermarkter-Konfigurationen

- **Status**: Accepted
- **Kontext**: Änderungen in den Konfigurationsdateien unter `config/vermarkter/*.js` (wie z. B. `iqd.js`) wurden im Browser nicht sofort wirksam, weil `loadConfigData()` in `app.js` einen statischen Versionierungs-String (`?v=1.0.6`) an die `fetch`-Aufrufe anhing. Dadurch lieferte der Browser-Cache veraltete Dateiversionen aus. Zudem fehlten im Lade-Array drei Vermarkter-Dateien (`bcn.js`, `score.js`, `visoon.js`).
- **Entscheidung**: 
  1. In `app.js` wird für jeden `fetch`-Aufruf ein dynamischer Timestamp (`?t=${Date.now()}`) als Query-Parameter verwendet, sodass Konfigurationsänderungen nach einem Browser-Reload sofort ohne Cache-Probleme geladen werden.
  3. In `app.js`, `vermarkter_editor.html` und `core_editor.html` werden `config/core.js`, `config/data_partners.js` sowie alle Vermarkter-Skripte nun ebenfalls mit einem dynamischen Zeitstempel (`?t=${Date.now()}`) geladen.
- **Konsequenzen**: Sämtliche Konfigurationsänderungen (Vermarkter, Core und Data Partners) werden nach jedem Neuladen der Seite im Browser garantiert direkt ohne Cache-Verzögerung aktualisiert.
