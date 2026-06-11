# Vorschlag zur Optimierung der Konfiguration (Aktualisiert)

Um die Konfiguration einfacher pflegbar zu machen und Tippfehler (wie doppelte Anführungszeichen oder falsche IDs) zu minimieren, schlagen wir folgendes Konzept vor:

---

## 1. Strukturelle Vereinfachung: Verschachtelung statt flacher Relationen
Aktuell sind `publishers` und `vermarkter` zwei flache Arrays. Ein Publisher verweist per `vermarkterId` auf seinen Vermarkter.

**Vorschlag:** Wir verschachteln die Publisher direkt in das jeweilige Vermarkter-Objekt:
```javascript
// Neu (Fehler bei Zuordnung strukturell ausgeschlossen)
vermarkter: [
  {
    id: "ad_alliance",
    name: "Ad Alliance",
    description: "...",
    publishers: [
      { id: "rtl", name: "RTL.de", supportedInventoryTypes: ["desktop", "mobile", "ctv"], supportedIds: ["utiq", "netid_utiq"] }
    ]
  }
]
```
*Vorteil:* Es gibt keine `vermarkterId` mehr, die falsch geschrieben werden kann. Die hierarchische Beziehung (n:1) wird direkt über das Datenformat abgebildet.

---

## 2. Aufteilung der Konfiguration
Wir behalten die Kern-Definitionen (IDs, Usecases, DSPs und SSPs) in einer gemeinsamen Datei `config/core.js` und lagern die Vermarkter (inklusive ihrer verschachtelten Publisher) in separate Dateien aus:

```
Identifier/
├── config/
│   ├── core.js               # IDs, Usecases, DSPs, SSPs
│   └── vermarkter/           # Ein File pro Vermarkter
│       ├── ad_alliance.js
│       ├── media_impact.js
│       ├── seven_one_media.js
│       ├── stroeer.js
│       ├── uim.js
│       └── iqd.js
```

### Technische Umsetzung (ohne Build-Step)
Jede Datei erweitert ein globales Konfigurationsobjekt `window.OVK_LANDSCAPE_CONFIG`.

**Beispiel `config/core.js`:**
```javascript
window.OVK_LANDSCAPE_CONFIG = {
  ids: [...],
  usecases: [...],
  dsps: [...],
  ssps: [...]
};
```

**Beispiel `config/vermarkter/ad_alliance.js`:**
```javascript
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}
window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "ad_alliance",
  name: "Ad Alliance",
  description: "...",
  publishers: [
    { id: "rtl", name: "RTL.de", supportedInventoryTypes: ["desktop", "mobile"], supportedIds: ["utiq"] }
  ]
});
```

**Einbindung in `index.html`:**
```html
<!-- Core-Definitionen (IDs, Usecases, DSPs, SSPs) -->
<script src="config/core.js"></script>

<!-- Vermarkter einzeln geladen -->
<script src="config/vermarkter/ad_alliance.js"></script>
<script src="config/vermarkter/media_impact.js"></script>
<script src="config/vermarkter/seven_one_media.js"></script>
<script src="config/vermarkter/stroeer.js"></script>
<script src="config/vermarkter/uim.js"></script>
<script src="config/vermarkter/iqd.js"></script>

<!-- App logic -->
<script src="app.js"></script>
```

---

## 3. Automatischer Config-Validator (Linter)
Wir erstellen ein kleines Node.js-Skript `scripts/validate-config.js` zur statischen Überprüfung.

**Prüfungen des Validators:**
1. **Syntax-Check**: Lässt sich jede Konfigurationsdatei fehlerfrei parsen?
2. **Referenzielle Integrität**:
   - Existieren alle IDs aus den `supportedIds` der DSPs, SSPs und Publisher auch im globalen `ids`-Register?
   - Existieren alle SSPs aus den `supportedSSPs` der DSPs im `ssps`-Array?
   - Existieren alle Vermarkter aus den `supportedVermarkter` der DSPs im `vermarkter`-Array?
3. **Struktur-Check**: Haben alle Partner die Pflichtfelder `id` und `name`?
