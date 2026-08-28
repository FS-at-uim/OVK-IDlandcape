# ADR 0011: Core Config Editor Tool (`core_editor.html`)

- **Status**: Accepted
- **Kontext**: Für die Pflege der Vermarkter-Konfigurationen existiert bereits `vermarkter_editor.html`. Zur Pflege der zentralen `config/core.js` (welche IDs, Usecases, DSPs, SSPs und Data Partners definiert) fehlte ein vergleichbares, benutzerfreundliches Editor-Tool. Insbesondere sollten bei der Konfiguration von DSPs und SSPs die verfügbaren Vermarkter dynamisch aus den existierenden Vermarkter-Dateien (`config/vermarkter/*.js`) als Auswahlgrundlage dienen.
- **Entscheidung**: 
  1. Es wurde die Datei `core_editor.html` im Wurzelverzeichnis erstellt.
  2. Der Editor lädt dynamisch `config/core.js` sowie alle 9 Vermarkter-Dateien und extrahiert daraus automatisch alle registrierten Vermarkter.
  3. Über Reiter (DSPs, SSPs, ID-Systeme, Usecases, Data Partners) können sämtliche Objekte interaktiv bearbeitet, hinzugefügt oder gelöscht werden.
  4. Die Vermarkter-Auswahlfelder (`supportedVermarkter`) für DSPs und SSPs greifen dynamisch auf die geladenen Vermarkter zurück.
  5. Eine Live-Code-Vorschau generiert dynamisch den validen Code für `config/core.js` (bei DSPs, SSPs, IDs, Usecases) bzw. für `config/data_partners.js` (bei Data Partners) inklusive Kopier- und Download-Funktion.
  6. Beide Editoren (`vermarkter_editor.html` und `core_editor.html`) wurden in ihren Header-Bereichen gegenseitig verlinkt.
- **Konsequenzen**: Sowohl `config/core.js` als auch `config/data_partners.js` können im Core Config Editor separat gepflegt und sauber exportiert werden. Duplikate in den Konfigurationsdateien werden ausgeschlossen.
