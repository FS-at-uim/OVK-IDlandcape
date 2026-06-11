# OVK ID Landscape Map

Dieses Projekt ist eine interaktive Visualisierung der 5 Stufen des OVK ID-Workflows: **Usecase**, **DSP**, **SSP**, **Vermarkter** und **Publisher**. 
Das Design orientiert sich an den offiziellen Farben und Richtlinien von [ovk.de](https://www.ovk.de/).

## Funktionsweise
Durch Klick auf eine **Usecase** und/oder eine **DSP** werden inkompatible Partner in den nachgelagerten Stufen (SSP, Vermarkter, Publisher) ausgeblendet bzw. ausgegraut. Die Beziehungen werden über ein einfaches Datenmodell in `config.js` gesteuert.

---

## Konfiguration (`config/`)

Die Konfiguration ist aufgeteilt, um die Pflege zu vereinfachen und Fehler zu reduzieren:
- `config/core.js`: Enthält die zentralen Register-Arrays: `ids`, `usecases`, `dsps` und `ssps`.
- `config/vermarkter/`: Ein Unterordner mit einer eigenen Konfigurationsdatei pro Vermarkter (z. B. `ad_alliance.js`, `media_impact.js`), in denen die Publisher direkt verschachtelt gepflegt werden.

### Datenstruktur

Die Konfiguration besteht aus 6 zentralen Arrays, aufgeteilt auf die Dateien:

#### 0. ID-Definitionen (`config/core.js`)
Zentrale Registrierung aller ID-Systeme mit Name, Kurzname, Farbe und Beschreibung:
```javascript
{
  id: "utiq",
  name: "Utiq",
  shortName: "Utiq",
  color: "#e30613",
  textColor: "#ffffff",
  description: "Telekom-basiertes ID-System..."
}
```

#### 1. Usecases (`config/core.js`)
```javascript
{
  id: "targeting",
  name: "Targeting"
}
```

#### 2. DSPs (`config/core.js`)
Eine DSP definiert, welche Usecases, SSPs, Vermarkter und ID-Systeme kompatibel sind.
```javascript
{
  id: "ttd",
  name: "The Trade Desk",
  supportedUsecases: ["fc", "targeting"],
  supportedSSPs: ["pubmatic", "index_exchange"],
  supportedVermarkter: ["ad_alliance"],
  supportedIds: ["utiq", "netid_utiq"]
}
```

#### 3. SSPs (`config/core.js`)
Eine SSP definiert, welche Usecases sie unterstützt, an welche Vermarkter sie angebunden ist und welche IDs sie unterstützt.
```javascript
{
  id: "pubmatic",
  name: "PubMatic",
  category: "curation",
  supportedUsecases: ["fc", "targeting"],
  supportedVermarkter: ["ad_alliance", "media_impact"],
  supportedIds: ["utiq"]
}
```

#### 4. Vermarkter & Publisher (`config/vermarkter/*.js`)
Publisher sind direkt hierarchisch in das jeweilige Vermarkter-Objekt verschachtelt, was Zuordnungsfehler (z. B. durch Tippfehler in einer `vermarkterId`) ausschließt:
```javascript
window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "ad_alliance",
  name: "Ad Alliance",
  description: "Vermarkter von RTL Deutschland, Gruner + Jahr etc.",
  publishers: [
    { 
      id: "rtl", 
      name: "RTL.de", 
      supportedInventoryTypes: ["desktop", "mobile", "ctv"], 
      supportedIds: ["utiq", "netid_utiq"] 
    }
  ]
});
```

---

## Vererbung von ID-Systemen
Vermarkter-Kacheln deklarieren in ihren Konfigurationsdateien keine statischen ID-Systeme. Stattdessen berechnet die Anwendung (`app.js`) beim Rendern dynamisch die Vereinigungsmenge (Union) aller IDs, die von den dem Vermarkter zugeordneten Publishern unterstützt werden. Dies stellt sicher, dass ID-Daten nur an einer einzigen Stelle gepflegt werden müssen.

---

## Automatisierte Konfigurationsvalidierung
Um Fehler in der Konfiguration (Syntaxfehler, fehlerhafte ID-Referenzen) sofort zu erkennen, kann das Validierungsskript über Node.js ausgeführt werden:
```bash
node scripts/validate-config.js
```
Dieses prüft:
- Ob alle Dateien fehlerfrei geladen und geparst werden können.
- Ob alle referenzierten IDs, SSPs und Vermarkter existieren (Referenzielle Integrität).
- Ob Pflichtfelder auf allen Objekten gepflegt sind.

---

## Projektdateien
- `index.html` - Struktur der Webseite und Einbindung der Konfigurationen
- `style.css` - Stylesheet (Farben, Grid-Layout, Responsive Layout)
- `config/` - Ordner mit Core- und Vermarkter-Konfigurationen
- `app.js` - Logik (Initialisierungs-Adapter zur Abflachung, Render-Schleife, Filterung, Interaktionslogik)
- `scripts/validate-config.js` - Validierungsskript für die Konfigurationen
- `docs/` - Dokumentation und ADRs
