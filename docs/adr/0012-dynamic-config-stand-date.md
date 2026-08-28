# ADR 0012: Dynamische Stand-Datumsanzeige basierend auf den jüngsten Konfigurationsdateien

- **Status**: Accepted
- **Kontext**: Am Ende der Seite soll der Hinweistext *"Alle Angaben basieren auf Auskünften der Vermarkter, ID Solutions und Technologien. Stand: [Datum]"* angezeigt werden. Dieses Datum sollte sich automatisch an das Modifikationsdatum (`Last-Modified`) der am jüngsten geänderten Konfigurationsdatei (`core.js`, `data_partners.js` oder `vermarkter/*.js`) anpassen.
- **Entscheidung**: 
  1. In `app.js` wird während des dynamischen Ladevorgangs (`loadConfigData()`) der `Last-Modified`-HTTP-Header aller 11 Konfigurationsdateien ausgelesen und das jüngste Datum (`latestTimestamp`) ermittelt.
  2. Das Element `<span id="config-stand-date">` in `index.html` wird dynamisch mit dem formatierten Datum (`TT.MM.JJJJ`) der jüngsten Datei aktualisiert.
  3. Sollte der Webserver in spezifischen Umgebungen keinen `Last-Modified`-Header bereitstellen, dient das aktuelle Tagesdatum als Fallback.
- **Konsequenzen**: Der Stand der Daten spiegelt stets automatisch das Datum der aktuellsten Konfigurationsdatei wider, ohne dass manuell Datumsangaben im Quellcode geändert werden müssen.
