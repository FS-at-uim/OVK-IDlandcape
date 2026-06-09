# OVK ID Landscape Map

Dieses Projekt ist eine interaktive Visualisierung der 5 Stufen des OVK ID-Workflows: **Usecase**, **DSP**, **SSP**, **Vermarkter** und **Publisher**. 
Das Design orientiert sich an den offiziellen Farben und Richtlinien von [ovk.de](https://www.ovk.de/).

## Funktionsweise
Durch Klick auf eine **Usecase** und/oder eine **DSP** werden inkompatible Partner in den nachgelagerten Stufen (SSP, Vermarkter, Publisher) ausgeblendet bzw. ausgegraut. Die Beziehungen werden über ein einfaches Datenmodell in `config.js` gesteuert.

---

## Konfiguration (`config.js`)

Alle Partner und deren Abhängigkeiten sind in `config.js` in einem zentralen JavaScript-Objekt definiert. Um neue Partner hinzuzufügen oder Beziehungen zu ändern, muss nur dieses File editiert werden.

### Datenstruktur

Die Konfiguration besteht aus 5 Arrays:
1. `usecases`
2. `dsps`
3. `ssps`
4. `vermarkter`
5. `publishers`

#### 1. Usecases
```javascript
{
  id: "targeting",
  name: "Targeting"
}
```

#### 2. DSPs
Eine DSP definiert, welche Usecases und welche SSPs kompatibel sind.
```javascript
{
  id: "ttd",
  name: "The Trade Desk",
  supportedUsecases: ["fc", "targeting"],
  supportedSSPs: ["pubmatic", "index_exchange"]
}
```

#### 3. SSPs
Eine SSP definiert, welche Usecases sie unterstützt und an welche Vermarkter sie angebunden ist.
```javascript
{
  id: "pubmatic",
  name: "PubMatic",
  supportedUsecases: ["fc", "targeting"],
  supportedVermarkter: ["ad_alliance", "media_impact"]
}
```

#### 4. Vermarkter
Ein Vermarkter fasst n-Publisher zusammen.
```javascript
{
  id: "ad_alliance",
  name: "Ad Alliance"
}
```

#### 5. Publishers
Ein Publisher ist genau einem Vermarkter zugeordnet (`vermarkterId`).
```javascript
{
  id: "rtl",
  name: "RTL.de",
  vermarkterId: "ad_alliance"
}
```

---

## Projektdateien
- `index.html` - Struktur der Webseite
- `style.css` - Stylesheet (Farben, Grid-Layout, Responsive Layout)
- `config.js` - Daten-Konfiguration (Partner und Kompatibilitäten)
- `app.js` - Logik (Render-Schleife, Filterung, Interaktionslogik)
- `docs/` - Dokumentation und ADRs
