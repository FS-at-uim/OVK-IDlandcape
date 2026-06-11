# ADR 0003: Visualisierung von ID-Systemen und Vererbung für Vermarkter

- **Status**: Accepted
- **Kontext**:
  DSPs, Curation SSPs und Publisher unterstützen unterschiedliche ID-Systeme (z. B. `utiq`, `netID via utiq`). Diese Unterstützung soll visuell auf den jeweiligen Kacheln der Partner dargestellt werden, um einen schnellen Überblick zu ermöglichen. Die Liste der IDs muss flexibel erweiterbar sein. Vermarkter sollen die IDs ihrer zugeordneten Publisher erben, da sie als Vertriebshäuser das Inventar dieser Publisher vermarkten.
- **Entscheidung**:
  1. **Zentrale Registrierung**: Einführung eines globalen Arrays `ids` in `config.js` zur Definition aller ID-Systeme (mit Kurznamen, Vollnamen, Farbkodierung und Erklärungstext).
  2. **Attributierung der Partner**: Zuweisung über ein Array `supportedIds` bei DSPs, Curation SSPs und Publishern in `config.js`.
  3. **Dynamische Vererbung**: Die Vermarkter-Kacheln deklarieren keine statischen IDs in `config.js`. Stattdessen berechnet `app.js` beim Rendern der Vermarkter dynamisch die Vereinigungsmenge (`Set`) der IDs aller zugeordneten Publisher.
  4. **Kompaktes UI-Design**: Platzierung kleiner, farblich abgehobener Text-Badges (Pills) im unteren Bereich der Kacheln. Detaillierte Erklärungen der IDs (Name und Beschreibung) werden in einem eigenen Abschnitt im Detail-Drawer angezeigt.
- **Konsequenzen**:
  - *Vorteile*:
    - Keine redundante Datenpflege für Vermarkter; Änderungen an den IDs eines Publishers spiegeln sich sofort beim Vermarkter wider.
    - Hohe Skalierbarkeit und einfache Erweiterung um neue ID-Systeme durch deklarative Konfiguration in `config.js`.
    - Übersichtlicheres UI dank farbkodierter Pills auf den Kacheln und Tooltips/Drawer-Erklärungen.
  - *Nachteile*:
    - Leicht erhöhte Render-Komplexität auf Client-Seite durch die dynamische Aggregation der Publisher-IDs für Vermarkter, was bei der geringen Datenmenge jedoch performance-neutral ist.
