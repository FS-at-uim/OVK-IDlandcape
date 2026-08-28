# OVK ID Landscape Map

Projekt zur interaktiven Visualisierung und Filterung der Stufen der **OVK ID Landscape Map**:
- **Stage 1**: Usecases
- **Stage 1a**: Data Partner (aktiviere Usecase "Targeting (Data Partner)")
- **Stage 2**: DSPs (Demand Side Platforms)
- **Stage 3**: SSPs (Supply Side Platforms)
- **Stage 4**: Vermarkter (Sales Houses inkl. Inventartypen & ID-Reichweiten)

Das Design orientiert sich an den offiziellen Farben und Richtlinien von [ovk.de](https://www.ovk.de/).

---

## Funktionsweise

Durch Auswahl einer **Usecase**, eines **Data Partners** oder einer **DSP** werden inkompatible Partner in den nachgelagerten Stufen (SSP, Vermarkter) automatisch ausgeblendet bzw. ausgegraut. 

In der Detailansicht (Info-Drawer) und in den Inventar-Icons (Desktop, Mobile, App, CTV) werden inventarspezifische ID-Abdeckungen (ID Coverage in %) und detaillierte Beschreibungen angezeigt.

---

## Konfiguration (`config/`)

Die Konfiguration ist modular aufgebaut, um die Pflege übersichtlich zu halten:
- **`config/core.js`**: Enthält die zentralen Register-Arrays: `ids`, `usecases`, `dsps` und `ssps`.
- **`config/data_partners.js`**: Enthält die Konfiguration aller Data Partner (`dataPartners`).
- **`config/vermarkter/`**: 9 eigenständige Konfigurationsdateien pro Vermarkter (`ad_alliance.js`, `bcn.js`, `iqd.js`, `media_impact.js`, `score.js`, `seven_one_media.js`, `stroeer.js`, `uim.js`, `visoon.js`).

### Datenstruktur

#### 0. ID-Definitionen (`config/core.js`)
Zentrale Registrierung aller ID-Systeme mit Name, Kurzname, Farbe und Beschreibung:
```javascript
{
  id: "utiq",
  name: "Utiq",
  shortName: "Utiq",
  color: "#e30613",
  textColor: "#ffffff",
  description: "Telco-basiertes ID System für sicheres Consent-Targeting."
}
```

#### 1. Usecases (`config/core.js`)
```javascript
{
  id: "targeting",
  name: "Targeting (Third Party Data / Cookie-basiert)"
}
```

#### 2. DSPs (`config/core.js`)
```javascript
{
  id: "ttd",
  name: "The Trade Desk",
  logo: "TTD",
  supportedUsecases: ["fc", "targeting", "targeting_pre"],
  supportedSSPs: ["pubmatic", "index_exchange", "magnite", "xandr"],
  supportedVermarkter: ["ad_alliance", "bcn", "iqd", "media_impact", "score", "seven_one_media", "stroeer", "uim", "visoon"],
  supportedIds: ["utiq", "netid_utiq", "netid"]
}
```

#### 3. SSPs (`config/core.js`)
```javascript
{
  id: "pubmatic",
  name: "PubMatic",
  category: "curation",
  supportedUsecases: ["targeting_pre"],
  supportedVermarkter: ["bcn", "iqd", "media_impact", "uim", "visoon"],
  supportedIds: ["utiq"]
}
```

#### 4. Data Partner (`config/data_partners.js`)
```javascript
{
  id: "iq_data",
  name: "IQ digital data",
  description: "Daten von IQ digital",
  supportedIds: ["utiq"],
  supportedDSPs: ["adform"],
  supportedSSPs: ["index_exchange", "xandr"]
}
```

#### 5. Vermarkter (`config/vermarkter/*.js`)
Vermarkter definieren ihr unterstütztes Inventar (Desktop, Mobile, App, CTV) sowie die jew. ID-Systeme mit Reichweiten-Prozenten:
```javascript
window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "ad_alliance",
  name: "Ad Alliance",
  description: "Vermarkter von RTL Deutschland, Gruner + Jahr etc.",
  supportedInventoryTypes: [
    {
      type: "desktop",
      supportedIds: [
        { id: "utiq", coverage: 15 },
        { id: "netid_utiq", coverage: 25 }
      ]
    }
  ]
});
```

---

## Lokalen Server starten

Um Probleme mit CORS (Cross-Origin Resource Sharing) beim Laden der Konfigurationen zu vermeiden, muss das Projekt über einen lokalen Webserver ausgeführt werden. 

**Über WSL (Windows Subsystem for Linux):**
```bash
# Im Projektverzeichnis ausführen:
python3 -m http.server 8000
```
Das Projekt ist anschließend im Browser unter [http://localhost:8000](http://localhost:8000) erreichbar.

---

## Interaktive Editoren

Das Projekt bietet visuelle Web-Editoren zur einfachen Bearbeitung der Konfigurationen ohne Syntaxfehler:

1. **`vermarkter_editor.html`**: Visual-Editor für Vermarkter-Dateien unter `config/vermarkter/*.js`.
2. **`core_editor.html`**: Visual-Editor für die zentrale `config/core.js` (DSPs, SSPs, IDs, Usecases) sowie `config/data_partners.js` (Data Partner), inklusive dynamischer Vermarkter-Checkboxen und Live-Code-Vorschau.

---

## Cache-Busting & Dynamisches Stand-Datum

- **Dynamisches Cache-Busting**: Alle Konfigurationsskripte und Fetch-Aufrufe verwenden `?t=${Date.now()}`, sodass Änderungen nach einem Neuladen der Seite (`F5`) sofort wirksam werden.
- **Automatisches Stand-Datum**: Der Hinweistext am Seitenende (*"Stand: TT.MM.JJJJ"*) ermittelt dynamisch das Änderungsdatum (`Last-Modified`) der jüngsten Konfigurationsdatei.

---

## Automatisierte Konfigurationsvalidierung

Prüfung aller Konfigurationsdateien auf Syntax und referenzielle Integrität über Node.js (oder WSL):
```bash
node scripts/validate-config.js
```

---

## Projektstruktur

- `index.html` - Hauptseite mit interaktiver Stufen-Visualisierung
- `style.css` - Haupt-Stylesheet
- `app.js` - Anwendungslogik, Filterung & dynamisches Konfigurationsladen
- `vermarkter_editor.html` - Visueller Editor für Vermarkter-Konfigurationen
- `core_editor.html` - Visueller Editor für Core- & Data-Partner-Konfigurationen
- `config/core.js` - Zentrale Register-Konfiguration (IDs, Usecases, DSPs, SSPs)
- `config/data_partners.js` - Data-Partner-Konfiguration
- `config/vermarkter/` - 9 Vermarkter-Konfigurationsdateien
- `scripts/validate-config.js` - Skript zur automatisierten Datenvalidierung
- `docs/adr/` - Architecture Decision Records (ADRs 0001 - 0012)
