# ADR 0013: Lokaler Webserver für Entwicklung

- **Status**: Accepted
- **Kontext**: Die OVK ID Landscape Map lädt Konfigurationsdaten dynamisch aus dem `config/`-Verzeichnis nach. Wird die `index.html` direkt lokal über das `file://`-Protokoll im Browser geöffnet, blockieren moderne Browser das Nachladen der Skripte aufgrund von CORS-Richtlinien (Cross-Origin Resource Sharing) und Sicherheitsbeschränkungen.
- **Entscheidung**: Um die Seite fehlerfrei lokal zu testen und zu entwickeln, wird ein lokaler Webserver über das Windows Subsystem for Linux (WSL) eingesetzt, konkret der integrierte Python-Server (`python3 -m http.server 8000`).
- **Konsequenzen**: Entwickler benötigen eine WSL-Umgebung mit Python 3. Der Start ist extrem leichtgewichtig (ein Einzeiler) und erfordert keine Einrichtung komplexer lokaler Server-Stacks oder Abhängigkeiten wie `npm install`. Der Server stellt die Dateien lokal unter `http://localhost:8000` bereit, wodurch CORS-Fehler umgangen werden.
