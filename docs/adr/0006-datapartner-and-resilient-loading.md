# ADR 0006: Data Partner Integration and Resilient Configuration Loading

- **Status**: Accepted
- **Kontext**:
  1. Die OVK ID Landscape Map muss um einen neuen Technologie-Typ "Data Partner (ID-fähig)" erweitert werden, der als Stage 1a unterhalb der Usecases angezeigt wird. Ein Data Partner soll angeben können, welche ID-Segmente (utiq, netid) und welche Aktivierungswege (DSPs, SSPs) unterstützt werden. Die Auswahl eines Data Partners filtert alle nachgelagerten Systeme und Publisher.
  2. Einzelne Syntax- oder Lauffehler in einer Vermarkter- oder Data-Partner-Konfigurationsdatei dürfen nicht dazu führen, dass die gesamte Anwendung blockiert und nichts mehr angezeigt wird. Die Konfigurationen müssen robust und isoliert geladen werden.

- **Entscheidung**:
  1. Einführung eines dedizierten Config-Files `config/data_partners.js` mit einer standardisierten Struktur für Data Partners.
  2. Dynamisches, resilientes Laden aller Konfigurationsdateien in `app.js` mittels `fetch` und sicherer Auswertung über `new Function()` in einer `try-catch`-Schleife. Eventuelle Lade- oder Parse-Fehler einzelner Dateien werden in der Konsole geloggt, verhindern aber nicht das Laden der restlichen Anwendung.
  3. Dynamische Einblendung der Stage 1a (Data Partner), wenn der Usecase "Targeting" ausgewählt ist.
  4. Bidirektionale Pfadfilterung in `app.js` zur Durchsetzung der ID- und Technologiekompatibilität basierend auf den Eigenschaften des ausgewählten Data Partners.

- **Konsequenzen**:
  - **Vorteile**:
    - Erhöhte Stabilität: Syntaxfehler in einer Datei (z. B. fehlendes Komma) beeinträchtigen nicht mehr das Laden des restlichen Portals.
    - Saubere Filterlogik: Nahtlose Integration in das bestehende bidirektionale Pfad-Filtering-System.
    - Flexibilität: Data Partner können unabhängig verwaltet und gepflegt werden.
  - **Nachteile**:
    - Erfordert `fetch`-Unterstützung (standardmäßig in allen modernen Browsern vorhanden) und lokalen Webserver für das Ausführen im Browser (Wegen CORS-Richtlinien bei lokalen Dateisystemen `file://`).
