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

## Dokumentation & Anleitungen

- 📘 **[Administrator-Handbuch (`docs/admin_guide.md`)](file:///c:/Users/fschenk/mein-webserver/Identifier/docs/admin_guide.md)**: Partner anlegen, pflegen & Passwörter in Cloudflare verwalten.
- 📗 **[Partner-Anleitung (`docs/partner_guide.md`)](file:///c:/Users/fschenk/mein-webserver/Identifier/docs/partner_guide.md)**: Anleitung für Vermarkter & Data Partner zur Pflege ihrer Daten in der Config-UI.
- ⚙️ **[Cloudflare Worker Setup (`docs/cloudflare_setup.md`)](file:///c:/Users/fschenk/mein-webserver/Identifier/docs/cloudflare_setup.md)**: Einrichtung & Konfiguration des sicheren Gatekeepers.

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

## Interaktives Config Portal

Das Projekt bietet ein modernes, zentrales Web-Portal zur rollenbasierten Pflege aller Konfigurationen:

- **[`editor.html`](editor.html)**: **Zentrales OVK Config Portal**
  - **Multi-Admin-Zugang via E-Mail** & integrierte Benutzerverwaltung (ohne Cloudflare-Dashboard).
  - **Vermarkter-Ansicht:** Ergonomische Coverage-Matrix für 4 Inventartypen (Desktop, Mobile Web, In-App, CTV), 65-Zeichen-Limit für Beschreibungen, DSP-Ausschlüsse und SSP-Opt-In-Chips.
  - **Partner-Ansichten (SSPs, DSPs, Data Partner):** Aufgeräumte Formulare ohne technischen JavaScript-Code.
  - **Sicherheit & Git-Sync:** Synchronisation über den Gatekeeper Worker (`docs/gatekeeper_worker.js`) mit SHA-256 + Salt Verschlüsselung (`config/auth_registry.json`).
  - *Legacy-Editoren:* [`core_editor.html`](core_editor.html) und [`vermarkter_editor.html`](vermarkter_editor.html) bleiben aus Kompatibilitätsgründen erhalten.

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
- `editor.html` - **Zentrales Unified Config Portal** (Multi-Admin, Vermarkter, SSP, DSP, Data Partner)
- `core_editor.html` - Legacy-Editor für Core- & Data-Partner-Konfigurationen
- `vermarkter_editor.html` - Legacy-Editor für Vermarkter-Konfigurationen
- `config/core.js` - Zentrale Register-Konfiguration (IDs, Usecases, DSPs, SSPs)
- `config/data_partners.js` - Data-Partner-Konfiguration
- `config/auth_registry.json` - Git-basierte Benutzer- und Partner-Zugänge (SHA-256 gehasht)
- `config/vermarkter/` - 9 Vermarkter-Konfigurationsdateien
- `scripts/validate-config.js` - Skript zur automatisierten Datenvalidierung
- `docs/` - Handbücher (`admin_guide.md`, `partner_guide.md`, `cloudflare_setup.md`), Gatekeeper Worker (`gatekeeper_worker.js`) und Architecture Decision Records (`docs/adr/`)

