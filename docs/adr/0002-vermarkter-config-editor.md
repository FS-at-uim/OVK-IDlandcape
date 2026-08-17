# ADR 0002: Vermarkter Config Editor

- **Status**: Accepted
- **Kontext**: Die Konfigurationen der einzelnen Vermarkter (wie z.B. Inventory, IDs) und die übergreifenden Verknüpfungen (z.B. unterstützte DSPs und SSPs in `core.js`) müssen häufig bearbeitet werden. Eine direkte Manipulation der JSON/JS-Strukturen ist fehleranfällig. Es wurde ein Werkzeug gefordert, um einen Vermarkter auszuwählen, zugehörige und übergreifende Metadaten zu ändern, und die entsprechenden Code-Snippets sicher zu generieren, ohne sofort die Konfiguration zu überschreiben.
- **Entscheidung**: Implementierung eines Standalone HTML-Formulars (`vermarkter_editor.html`), das direkt im Browser geöffnet werden kann. Dieses bindet die bestehenden Config-Files als Skripte ein, aggregiert die Daten in einer Ansicht, und generiert bei jeder Änderung die entsprechenden Code-Blöcke (für die spezifische Vermarkter-Datei und Auszüge für `core.js`), die der Entwickler dann per Copy&Paste einfügen kann.
- **Konsequenzen**: 
  - *Vorteile*: Minimiert Fehlerquellen bei der Konfiguration. Klare Trennung zwischen Dateneingabe und Code-Generierung, da die Original-Dateien nicht ungefragt manipuliert werden. Sehr einfaches Setup, da es im Frontend läuft und keine extra Server-Infrastruktur benötigt.
  - *Nachteile*: Die Änderungen werden nicht automatisch gespeichert; ein manueller Kopier-Schritt bleibt erforderlich (was aber explizit vom Nutzer gefordert war).
