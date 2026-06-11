# ADR 0002: Layout and Sorting Adjustments

- **Status**: Accepted
- **Kontext**: Die vorherige Grid-Struktur mit 5 Spalten nahm für Usecases zu viel horizontalen Platz weg, während die Publisher-Spalte sehr lang war und vertikales Scrollen erforderte. Zudem fehlte eine einheitliche visuelle Gestaltung für die Spaltenüberschriften und eine konsistente Sortierreihenfolge für die Partner und Vermarkter.
- **Entscheidung**:
  1. Der Usecase-Selektor wurde in ein horizontales Panel oberhalb des Grids ausgelagert.
  2. Die Anzahl der Grid-Spalten wurde auf 4 reduziert (DSP, SSP, Vermarkter, Publisher), wobei die Publisher-Spalte die doppelte Breite einnimmt (`2fr`).
  3. Die Publisher-Spalte wurde intern als 2-spaltiges Sub-Grid gestaltet, um die vertikale Höhe zu halbieren.
  4. Alle Spaltenüberschriften wurden einheitlich mit einem blauen Bottom-Border versehen.
  5. Alle Partnerlisten (DSP, SSP, Vermarkter und Publisher) und Vermarkter-Gruppen wurden auf alphabetisch aufsteigende Sortierung (A-Z) umgestellt.
- **Konsequenzen**:
  - *Vorteile*: Verbessertes visuelles Gleichgewicht, drastische Reduktion von Scrollen, übersichtlichere Anordnung der Publisher, einheitlicheres Design und logische alphabetische Orientierung.
  - *Nachteile*: Geringfügige Erhöhung der Layout-Komplexität durch Grid-Spannweiten, aber durch CSS Grid-Technologien sauber gelöst.
