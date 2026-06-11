# ADR 0004: Modularisierung der Konfiguration & Verschachtelung der Publisher

- **Status**: Accepted
- **Kontext**: Die ursprüngliche `config.js` war eine monolithische Datei, bei der alle Partner (DSPs, SSPs, Vermarkter und Publisher) flach und über IDs referenziert gepflegt wurden. Die manuelle Bearbeitung erwies sich als fehleranfällig (z. B. Syntax- und Tippfehler bei Referenz-IDs). Zudem war es unpraktisch, wenn verschiedene Vermarkter ihre eigenen Daten pflegen wollen.

- **Entscheidung**: 
  1. Die Konfiguration wird aufgeteilt: Core-Register (IDs, Usecases, DSPs, SSPs) liegen in `config/core.js`.
  2. Jeder Vermarkter erhält eine eigene Konfigurationsdatei im Ordner `config/vermarkter/` (z. B. `config/vermarkter/ad_alliance.js`).
  3. Publisher werden direkt im `publishers`-Array ihres jeweiligen Vermarkters verschachtelt, um referenzielle Integrität per Datenstruktur zu erzwingen.
  4. In `app.js` wird beim Laden der Seite eine Abwärtskompatibilitätsebene eingeführt, die die verschachtelten Publisher zur Laufzeit in ein flaches Array (inklusive automatischer Zuweisung der `vermarkterId`) überführt.
  5. Ein Node.js-Skript `scripts/validate-config.js` wird bereitgestellt, um Syntax und Referenz-Integrität automatisiert zu prüfen.

- **Konsequenzen**:
  - **Vorteile**:
    - Vermarkterdaten können nun separat und isoliert in eigenen Dateien gepflegt werden.
    - Zuordnungsfehler (z. B. falsche `vermarkterId` auf Publishern) sind durch die verschachtelte Struktur technisch ausgeschlossen.
    - Änderungen lassen sich über das automatisierte Prüfskript sofort validieren.
    - Abwärtskompatibilität in `app.js` erfordert keine Änderungen am restlichen Code.
  - **Nachteile**:
    - Neue Vermarkter müssen manuell per `<script>`-Tag in der `index.html` registriert werden.
