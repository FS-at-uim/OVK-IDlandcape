# OVK ID Landscape – Administrator-Handbuch

Dieses Handbuch beschreibt, wie Administratoren der **OVK ID Landscape Map** neue Partner anlegen, bestehende Partnerdaten pflegen und Benutzer- sowie Partner-Zugänge verwalten.

---

## 1. Das zentrale Portal & Architektur

Das zentrale **OVK Config Portal** (`editor.html`) vereint alle Bearbeitungs- und Verwaltungsfunktionen in einer einzigen, aufgeräumten Oberfläche im offiziellen Design von `tech.ovk.de`:

| Komponente | Datei / URL | Zuständigkeit |
| :--- | :--- | :--- |
| **Unified Config Portal** | [`editor.html`](file:///c:/Users/fschenk/mein-webserver/Identifier/editor.html) | **Zentrales Portal:** Vermarkter (Matrix-Tabelle, SSP-Chips), SSPs, DSPs, Data Partner, ID-Kataloge und Multi-Admin-Benutzerverwaltung |
| **Gatekeeper Worker** | `docs/gatekeeper_worker.js` | Cloudflare Worker mit Git-basierter Auth-Registry, SHA-256 + Salt Verschlüsselung und direkter GitHub-Synchronisation |
| **Auth-Registry** | `config/auth_registry.json` | Gespeicherte Login-Hashes für Multi-Admin und Partner im Ziel-Repository |
| **Live Map** | [`index.html`](file:///c:/Users/fschenk/mein-webserver/Identifier/index.html) | Öffentliche Landscape-Visualisierung |

> [!NOTE]
> **Veröffentlichungszyklus:** Alle über das Portal vorgenommenen Änderungen werden sofort und versionssicher im BVDW-Ziel-Repository committet. In der öffentlich erreichbaren Landscape Map greifen sie automatisch **über Nacht**.

---

## 2. Multi-Admin & Benutzerverwaltung (Login via E-Mail)

Das Portal unterstützt **mehrere vollwertige Administratoren**, die sich jeweils mit ihrer persönlichen **E-Mail-Adresse** und einem eigenen Passwort anmelden können. Neue Admins und Partner-Logins können direkt aus der Oberfläche heraus angelegt werden, ohne dass ein Zugriff auf das Cloudflare-Dashboard erforderlich ist.

### A. Neuen Administrator anlegen
1. Melde dich als bestehender Administrator in [`editor.html`](file:///c:/Users/fschenk/mein-webserver/Identifier/editor.html) an.
2. Wechsle auf den Tab **„👤 Benutzer & Logins“**.
3. Fülle das Formular aus:
   * **E-Mail-Adresse (Login-Kennung):** E-Mail-Adresse des neuen Admins (z. B. `vorname.nachname@ovk.de`).
   * **Rolle:** Wähle `👑 Administrator (Vollzugriff)`. *(Das Feld „Zugehörige Partner-ID“ wird automatisch ausgeblendet, da Admins globalen Zugriff haben.)*
   * **Name / Organisation:** Vollständiger Name des Administrators.
   * **Passwort:** Vergib ein sicheres Passwort oder klicke auf `🎲 Generieren`.
4. Klicke auf **`💾 Benutzer speichern`**.
5. Der Zugang ist sofort aktiv und wird kryptografisch sicher (SHA-256 + 16-Byte Salt + Worker-Pepper) in `config/auth_registry.json` im BVDW-Repository persistiert.

### B. Partner-Login anlegen (Vermarkter, SSP, DSP, Data Partner)
1. Wähle im Tab **„👤 Benutzer & Logins“** die entsprechende Rolle aus (z. B. `🏷️ Vermarkter` oder `⚡ Supply-Side-Plattform`).
2. Gib die E-Mail-Adresse des Partners und die **technische Partner-ID** ein (z. B. `uim`, `magnite`, `ttd`).
3. Vergib ein Passwort und klicke auf **`💾 Benutzer speichern`**.
4. Teile dem Partner die Login-URL `https://<domain>/editor.html` (oder mit Vorbelegung `editor.html?id=<partnerId>`), seine E-Mail-Adresse/ID und sein Passwort mit.
5. **Partner-Ansicht:** Der Partner sieht nach dem Login ausschließlich seinen eigenen Bereich (keine fremden Daten, kein technischer JavaScript-Code) und kann seine Inventare, Coverage-Werte oder ID-Freigaben eigenständig pflegen.

### C. Passwörter ändern oder Accounts löschen
* In der Tabelle **„Aktive Benutzer- und Partner-Accounts“** kann bei jedem Eintrag über **`🔑 Ändern`** ein neues Passwort vergeben oder über **`🗑️ Löschen`** der Zugang dauerhaft entfernt werden.

---

## 3. Vermarkter pflegen & neu anlegen

Vermarkter konfigurieren ihre ID-Bereitstellung über eine kompakte **Coverage-Matrix**:

### A. Basisdaten
* **Offizieller Name:** z. B. `United Internet Media`.
* **Kurzbeschreibung (wird in der Landscape angezeigt):** Maximal **65 Zeichen** (mit integriertem Live-Zeichenzähler).

### B. Coverage-Matrix (Inventartypen & ID-Coverage)
Die Matrix umfasst standardmäßig 4 Inventargattungen:
1. `💻 Desktop`
2. `📱 Mobile Web`
3. `📲 In-App`
4. `📺 Connected TV (CTV)`

* **Aktivierungs-Schalter:** Schalte Gattungen, in denen kein Inventar bereitgestellt wird, einfach aus (Eingabefelder werden deaktiviert).
* **ID-Coverage (%):** Trage pro ID-System (z. B. Utiq, netID) die Reichweite in Prozent (0–100%) ein (*„Für wie viel % der Requests im programmatischen Ökosystem wird die ID übergeben?“*).
* **DSP-Ausschlüsse (`⚙️ DSPs ausschließen`):**
  > [!IMPORTANT]
  > Wähle eine DSP in diesem Flyout **nur dann aus**, wenn eine Weitergabe der ID durch diese DSP **ausdrücklich ausgeschlossen** werden soll.

### C. SSP Freischaltungen (Opt-Ins)
* Klicke auf die interaktiven **Pill-Chips** der Supply-Side-Plattformen, um anzuzeigen, über welche SSPs das Vermarkter-Inventar angebunden ist (blau mit Häkchen = aktiv, grau = inaktiv).

---

## 4. SSPs, DSPs und Data Partner verwalten

Als Administrator kannst du im oberen Tab-Menü direkt zwischen allen Partnergruppen wechseln:

### A. Supply-Side-Plattformen (SSPs)
* **Kategorie:** Unterscheidung zwischen `Standard SSP` (leitet IDs durch) und `Curation SSP` (Targeting / Deal IDs / Frequency Capping).
* **ID-Systeme & Usecases:** Per Klick auf die entsprechenden Chips zuweisen.

### B. Demand-Side-Plattformen (DSPs)
* Name, Logo-Kürzel, unterstützte ID-Systeme, Usecases und kompatible SSPs über die Chip-Cloud pflegen.

### C. Data Partner
* Name, Beschreibung, ID-Systeme, angebundene DSPs und Curation-SSPs definieren.

### D. ID-Systeme & Usecase-Kataloge (Core)
* Im Tab **„🆔 IDs & Usecases“** können die zentralen Core-Definitionen eingesehen und im Bedarfsfall gesamthaft aktualisiert werden.

---

## 5. Technische Konfiguration (Cloudflare Worker)

Der Worker benötigt im Cloudflare Dashboard folgende Environment-Variablen (Single Source of Truth):

| Variable | Beschreibung | Beispielwert |
| :--- | :--- | :--- |
| `GITHUB_OWNER` | GitHub Organisations- oder Benutzername | `BVDW-org` |
| `GITHUB_REPO` | Repository-Name | `ovk-identifiersupport` |
| `GITHUB_BRANCH` | Ziel-Branch für Commits | `main` |
| `GITHUB_BASE_PATH` | Basispfad innerhalb des Repositories | `tools/identifier-landscape` |
| `GITHUB_TOKEN` | GitHub Personal Access Token (PAT) mit Schreibrechten (`repo`-Scope) | `ghp_...` |
| `ADMIN_PASSWORD` | Master-Admin-Passwort (Notfall-Fallback) | `...` |
| `AUTH_SALT` | Optional: Geheimer Pepper für SHA-256 Hashing | `...` |
