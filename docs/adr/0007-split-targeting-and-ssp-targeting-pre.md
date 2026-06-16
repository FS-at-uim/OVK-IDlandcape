# ADR 0007: Split Targeting Usecase and strict SSP Filtering for Pre-Targeting

- **Status**: Accepted
- **Kontext**:
  1. Der bisherige allgemeine "Targeting"-Usecase muss aufgeteilt werden in "Targeting (Data Partner)" (id: `targeting`) und "Targeting (Pretargeted Pub. Deals)" (id: `targeting_pre`).
  2. Bei Auswahl des Pre-Targeting-Usecases ("Targeting (Pretargeted Pub. Deals)") dürfen nur SSPs gehighlightet werden, die diesen Usecase explizit in ihrer Konfiguration unterstützen (Eigenschaft `supportedUsecases` enthält `"targeting_pre"`). SSPs, die diesen Usecase nicht unterstützen (insb. Standard-SSPs), müssen inaktiv/ausgeblendet sein.
  3. Die Stage 1a (Data Partner) ist nur für den "Targeting (Data Partner)"-Usecase relevant und muss bei anderen Usecases ausgeblendet werden.

- **Entscheidung**:
  1. Aktualisierung der Konfiguration in `config/core.js` durch Umbenennung des `targeting`-Usecases zu "Targeting (Data Partner)" und Hinzufügen des neuen Usecases `targeting_pre` mit dem Anzeigenamen "Targeting (Pretargeted Pub. Deals)".
  2. Aktivierung des neuen Usecases `targeting_pre` bei den kompatiblen DSPs (`ttd`, `active_agent`, `adform`, `dv360`) und Curation SSPs (`equativ`, `pubmatic`, `index_exchange`, `magnite`, `xandr`) in `config/core.js`.
  3. Anpassung der Filterfunktion `isPathUsecaseCompatible` in `app.js`: Falls der zu prüfende Usecase `targeting_pre` ist, wird die Pfad-Kompatibilität sofort abgelehnt, wenn die SSP im Pfad diesen Usecase nicht in `supportedUsecases` listet.
  4. Gewährleistung der Ausblendung der Stage 1a (Data Partner) in `app.js`, wenn `selectedUsecaseId` ungleich `"targeting"` (Data Partner) ist.

- **Konsequenzen**:
  - **Vorteile**:
    - Präzise Darstellung: Nur SSPs mit explizitem Support für "Pretargeted Pub. Deals" werden bei diesem Usecase als aktiv dargestellt.
    - Konsistenz: Standard-SSPs (Yieldlab, Smartclip), die kein Pre-Targeting auf ID-Basis unterstützen, werden korrekt ausgeblendet.
    - Strukturierte Trennung: Data Partner werden nur dann eingeblendet und verarbeitet, wenn der entsprechende Data-Partner-Usecase aktiv ist.
  - **Nachteile**:
    - Erhöhte Komplexität in der Kompatibilitätslogik (`isPathUsecaseCompatible`), die jedoch sauber gekapselt ist.
