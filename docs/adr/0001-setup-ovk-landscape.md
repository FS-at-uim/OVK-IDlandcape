# ADR 0001: Architecture Decision Record for OVK ID Landscape Map

- **Status**: Accepted
- **Kontext**: 
  Es soll eine interaktive, 5-stufige Workflow-Karte ("OVK ID Landscape Map") erstellt werden, die Partner in den Stufen Usecase, DSP, SSP, Vermarkter und Publisher darstellt. Bei Klick auf einen Usecase und eine DSP sollen inkompatible Partner ausgeblendet/ausgegraut werden.
  Die Liste der Partner sowie deren Beziehungen untereinander (Kompatibilitäten, Zuordnungen) müssen einfach konfigurierbar und erweiterbar sein. Das Design soll sich eng an den Farben und dem Layout von ovk.de (BVDW) orientieren.

- **Entscheidung**:
  1. **Stack**: Pure Client-Side HTML5, CSS3 (Grid & Flexbox) und Vanilla JavaScript (ES6). Es wird kein Build-Schritt oder komplexes Framework benötigt, da die Anwendung rein deklarativ und interaktiv im Browser läuft und dadurch wartungsarm und schnell ladend ist.
  2. **Konfiguration**: Auslagerung der Datenstruktur in eine separate Konfigurationsdatei (`config.js`). Die Beziehungen werden als graphähnliche Adjazenzlisten/Zuordnungen abgebildet.
  3. **Visualisierung/Layout**: Eine 5-Spalten-Struktur mit CSS Grid. Klicks triggern JavaScript-Events, die das Datenmodell filtern und entsprechende CSS-Klassen (`.active`, `.inactive`, `.disabled`) vergeben.
  4. **Design**: Einbettung von OVK-Markenfarben (BVDW Orange `#e2401c`, OVK Tiefblau `#004bb4`, Textfarbe Anthrazit, Sandfarbene Akzente `#edeae5`, hellgrauer Hintergrund `#f6f8fa`) für ein seriöses und konsistentes Erscheinungsbild.

- **Konsequenzen**:
  - **Vorteile**:
    - Extrem schnelle Ladezeit und einfache Bereitstellung auf jedem Standard-Webserver.
    - Änderungen an Partnern oder Mappings erfordern nur die Anpassung eines JSON-ähnlichen JavaScript-Objekts in `config.js` – keine Programmierkenntnisse in JavaScript erforderlich.
    - Barrierefreies CSS-Layout, das sich automatisch an verschiedene Bildschirmgrößen anpasst.
  - **Nachteile**:
    - Das Hinzufügen von Partnern geschieht manuell über die Bearbeitung einer Textdatei (`config.js`) statt über ein Backend-UI. Für die Anforderungen ist dies jedoch absolut adäquat und leicht verständlich.
