# OVK ID Landscape – Anleitung für Partner

Diese Anleitung richtet sich an **Vermarkter**, **SSPs**, **DSPs** und **Data Partner**, die ihre Daten im **OVK ID Landscape** selbstständig über die webbasierte Benutzeroberfläche pflegen und veröffentlichen möchten.

---

## 1. Übersicht & Zugang

Sie haben von der OVK-Administration einen Link zum **OVK Config Portal** und Anmeldedaten (E-Mail-Adresse oder Partner-ID und Passwort) erhalten:
* **Zentrales Portal:** `https://<domain>/editor.html` (oder mit Direkt-ID: `editor.html?id=<Ihre_ID>`).
* **Automatische Rollenerkennung:** Das Portal erkennt anhand Ihrer Anmeldedaten automatisch Ihr Profil (Vermarkter, SSP, DSP oder Data Partner) und öffnet direkt Ihre persönliche Pflegemaske.
* **Kein technischer Code:** Sie pflegen Ihre Daten in einem intuitiven Formular – ganz ohne JavaScript-Code.
* **🌙 Live-Schaltung:** Alle Änderungen werden sofort im zentralen BVDW-Repository gesichert. In der öffentlich erreichbaren **OVK ID Landscape Map** greifen die Daten automatisch **über Nacht** mit dem nächsten nächtlichen Build- und Cache-Zyklus.

---

## 2. Anleitung für Vermarkter

### Schritt 1: Portal öffnen & anmelden
1. Öffnen Sie den Link `https://<domain>/editor.html`.
2. Geben Sie Ihre **E-Mail-Adresse** oder Ihre **Partner-ID** (z. B. `uim`) sowie Ihr **Passwort** ein.
3. Klicken Sie auf **„Anmelden & Daten laden“**.
4. Nach erfolgreicher Anmeldung lädt das Portal automatisch den aktuellen Datenstand Ihres Hauses aus dem Repository.

---

### Schritt 2: Basisdaten pflegen
* **Technische ID:** Systembezeichner (schreibgeschützt).
* **Offizieller Name:** Offizieller Anzeigename Ihres Vermarkters (z. B. *United Internet Media*).
* **Kurzbeschreibung (wird in der Landscape so angezeigt):** Kurze Leistungs- und Profilbeschreibung mit **maximal 65 Zeichen**. Der integrierte Zeichenzähler unterstützt Sie bei der Einhaltung.

---

### Schritt 3: Inventartypen & ID-Coverage (Matrix)
Hier tragen Sie ein, in welchen Inventaren Sie welche ID-Lösungen im programmatischen Ökosystem zur Verfügung stellen und für wie viel % der Requests diese ID übergeben wird:

1. **Inventargattungen aktivieren/deaktivieren:**
   * Die Matrix enthält die 4 Standard-Gattungen: `💻 Desktop`, `📱 Mobile Web`, `📲 In-App` und `📺 Connected TV (CTV)`.
   * Über den **Schalter (Toggle)** in der Spalte *Aktiv* schalten Sie eine Gattung ein oder aus.
2. **Reichweite eintragen (0–100%):**
   * Tragen Sie in den Feldern der jeweiligen ID-Systeme (z. B. *Utiq*, *netID*) den Prozentwert der Requests ein, die die entsprechende ID enthalten (z. B. `66%`).
3. **DSP-Ausschlüsse (`⚙️ DSPs ausschließen`):**
   > [!IMPORTANT]
   > Wähle eine DSP in diesem Menü **nur dann aus**, wenn du eine Weitergabe der ID durch diese DSP **ausdrücklich ausschließt**.
   * Klicken Sie auf den Button `⚙️ DSPs ausschließen`, um das Auswahlfenster zu öffnen.
   * Klicken Sie auf die betroffenen DSP-Kacheln (rot hinterlegt = Weitergabe ausgeschlossen).

---

### Schritt 4: SSP Freischaltungen (Opt-Ins)
Wählen Sie alle Supply-Side-Plattformen aus, über die Ihr Vermarkter-Inventar angebunden ist und die genannten IDs übergeben werden:
* Klicken Sie auf die jeweiligen **SSP-Pill-Chips**:
  * **Blau mit Häkchen (`✓`):** Anbindung aktiv.
  * **Grau:** Keine ID-Übergabe über diese SSP.

---

### Schritt 5: Speichern
1. Klicken Sie unten in der Leiste auf den grünen Button:
   **`💾 Änderungen für [Name] speichern`**.
2. Eine Erfolgsmeldung bestätigt die Speicherung direkt im BVDW-Repository.
3. Ihre Änderungen greifen in der öffentlichen Landscape Map automatisch **über Nacht**.

---

## 3. Anleitung für Supply-Side-Plattformen (SSPs)

1. Melden Sie sich mit Ihren Zugangsdaten im Portal an.
2. Sie sehen direkt die Konfiguration Ihrer SSP:
   * **Kategorie:** `Standard SSP` (leitet IDs durch) oder `Curation SSP` (Targeting / Deal IDs / FC).
   * **Unterstützte ID-Systeme:** Klicken Sie auf die entsprechenden ID-Chips, um die Unterstützung zu aktivieren.
   * **Unterstützte Usecases:** Weisen Sie die relevanten Anwendungsfälle zu.
3. Klicken Sie auf **`💾 SSP-Konfiguration speichern`**.

---

## 4. Anleitung für Demand-Side-Plattformen (DSPs)

1. Melden Sie sich mit Ihren Zugangsdaten im Portal an.
2. Passen Sie die Daten Ihrer Plattform an:
   * **Name & Logo-Kürzel:** Offizielle Bezeichnung und Kachel-Kürzel.
   * **Unterstützte ID-Systeme & Usecases:** Zuweisung per Klick auf die Chips.
   * **Kompatible SSPs:** Markieren Sie alle Supply-Partner, über die Ihre DSP IDs empfangen kann.
3. Klicken Sie auf **`💾 DSP-Konfiguration speichern`**.

---

## 5. Anleitung für Data Partner

1. Melden Sie sich mit Ihren Zugangsdaten im Portal an.
2. Pflegen Sie die Metadaten und Anbindungen Ihrer Daten:
   * **Name & Beschreibung:** Information zu Ihren Zielgruppensegmenten.
   * **Unterstützte IDs:** Zuweisung der ID-Lösungen (z. B. Utiq, netID).
   * **Kompatible DSPs:** Wählen Sie alle DSPs aus, auf denen Ihre Segmente aktivierbar sind.
   * **Curation-SSPs:** Wählen Sie die angebundenen Curation-Plattformen aus.
3. Klicken Sie auf **`💾 Data-Partner-Konfiguration speichern`**.

---

## 6. Häufige Fragen & Support

* **Passwort vergessen oder Login-Probleme?** Wenden Sie sich bitte an Ihren OVK-Administrator. Dieser kann Ihr Passwort im Portal unter *Benutzer & Logins* jederzeit zurücksetzen.
* **Ergebnis überprüfen:** Sie können jederzeit über den Link **„🗺️ Live-Map“** in der Kopfzeile die öffentliche Darstellung einsehen (Änderungen greifen über Nacht).
