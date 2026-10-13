# OVK ID Landscape – Administrator-Handbuch

Dieses Handbuch beschreibt, wie Administratoren der **OVK ID Landscape Map** neue Partner anlegen, bestehende Partnerdaten pflegen und Partner-Zugänge verwalten.

---

## 1. Übersicht der Editoren & Zuständigkeiten

| Editor | Datei / URL | Zuständigkeit |
| :--- | :--- | :--- |
| **Core Editor** | [`core_editor.html`](file:///c:/Users/fschenk/mein-webserver/Identifier/core_editor.html) | DSPs, SSPs, Data Partner, ID-Systeme, Usecases (`config/core.js` & `config/data_partners.js`) |
| **Vermarkter Editor** | [`vermarkter_editor.html`](file:///c:/Users/fschenk/mein-webserver/Identifier/vermarkter_editor.html) | Vermarkter-Inventare, ID-Abdeckungen (Coverage %), DSP-Ausschlüsse, SSP-Opt-Ins (`config/vermarkter/<id>.js`) |
| **Cloudflare Worker** | `docs/gatekeeper_worker.js` | Authentifizierung, Passwörter, Rechteprüfung, Single Source of Truth (GitHub API) |

---

## 2. DSPs & SSPs pflegen oder neu anlegen

Öffne [`core_editor.html`](file:///c:/Users/fschenk/mein-webserver/Identifier/core_editor.html) und melde dich mit dem **Admin-Passwort** an.

### A. Neuen DSP / SSP anlegen
1. Klicke auf den Tab **DSPs** bzw. **SSPs**.
2. Klicke oben rechts auf den blauen Button **`+ Neu erstellen`**.
3. Gib eine eindeutige technische ID ein (z. B. `ttd`, `adform`, `pubmatic` – Kleinbuchstaben, keine Sonderzeichen).
4. Fülle die Metadaten aus:
   * **Name & Logo**: Anzeigename und Kürzel.
   * **Kategorie (nur SSPs)**: `Standard SSP` (leitet IDs durch) oder `Curation SSP` (Targeting/FC möglich).
   * **Unterstützte Usecases & IDs**: Relevante Checkboxen aktivieren.
   * **Kompatible SSPs / Vermarkter**: Verknüpfungen mit angebundenen Systemen setzen.
5. Klicke unten auf **`Speichern / Übernehmen`**.
6. Klicke in der rechten Spalte auf **`Änderungen speichern & veröffentlichen`**.

### B. Bestehenden DSP / SSP bearbeiten
1. Wähle im Dropdown **"Eintrag auswählen"** den gewünschten Partner.
2. Passe die Felder und Checkboxen an.
3. Klicke auf **`Speichern / Übernehmen`** und anschließend rechts auf **`Änderungen speichern & veröffentlichen`**.

---

## 3. Data Partner anlegen & pflegen

1. Öffne [`core_editor.html`](file:///c:/Users/fschenk/mein-webserver/Identifier/core_editor.html) und melde dich als Admin an.
2. Wechsle auf den Tab **Data Partners**.
3. **Neuer Data Partner:**
   * Klicke auf **`+ Neu erstellen`** und gib die technische ID ein (z. B. `mein_partner_data`).
   * Wähle die unterstützten ID-Systeme, DSPs und Curation-SSPs aus.
   * Klicke auf **`Speichern / Übernehmen`** und rechts auf **`Änderungen speichern & veröffentlichen`**.
4. **Passwort vergeben:** Lege im Cloudflare Dashboard das Passwort `PWD_<id>` an (siehe Abschnitt 5).
5. **Partner-Link bereitstellen:** Übergib dem Partner den Direktlink `core_editor.html?id=<id>` und sein Passwort.

---

## 4. Vermarkter anlegen & pflegen

### A. Neuen Vermarkter vollständig einrichten (3 Schritte)

1. **Schritt 1: Passwort im Cloudflare Worker anlegen**
   * Öffne das Cloudflare Dashboard -> **Workers & Pages** -> Worker auswählen -> **Settings** -> **Variables**.
   * Lege eine verschlüsselte Variable an:
     * **Name:** `PWD_<vermarkterId>` (z. B. `PWD_meinvermarkter`)
     * **Value:** Sicheres Passwort für diesen Vermarkter.
   * Klicke auf **Save and deploy**.

2. **Schritt 2: Initiale Konfigurationsdatei im Repository anlegen**
   * Im führenden GitHub-Repository (`BVDW-org/ovk-identifiersupport`) unter `tools/identifier-landscape/config/vermarkter/<vermarkterId>.js` die Basiskonfiguration ablegen:
     ```javascript
     if (!window.OVK_LANDSCAPE_CONFIG) {
       window.OVK_LANDSCAPE_CONFIG = {};
     }
     if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
       window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
     }

     window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
       id: "meinvermarkter",
       name: "Mein Vermarkter Name",
       description: "Kurzbeschreibung",
       supportedInventoryTypes: [],
       supportedSSPs: []
     });
     ```
   * *Hinweis:* Alternativ kann der Admin die Datei nach dem Setzen des Passworts direkt über den Vermarkter-Editor konfigurieren und speichern.

3. **Schritt 3: Verknüpfungen in `core.js` aktivieren**
   * Öffne [`core_editor.html`](file:///c:/Users/fschenk/mein-webserver/Identifier/core_editor.html).
   * Gehe in die Tabs **DSPs** und **SSPs** und aktiviere bei den angebundenen Partnern die Checkbox für den neuen Vermarkter.
   * Klicke auf **`Änderungen speichern & veröffentlichen`**.

4. **Schritt 4: Übergabe an den Vermarkter**
   * Sende dem Vermarkter seinen Link:
     `https://<domain>/vermarkter_editor.html?id=<vermarkterId>`
   * Teile ihm sein in Schritt 1 vergebenes Passwort mit.

### B. Bestehenden Vermarkter als Admin bearbeiten
1. Öffne [`vermarkter_editor.html`](file:///c:/Users/fschenk/mein-webserver/Identifier/vermarkter_editor.html) (ohne `?id=...`).
2. Gib das **Admin-Passwort** ein.
3. Als Admin ist das Dropdown freigeschaltet – wähle den gewünschten Vermarkter aus.
4. Passe Inventartypen, Coverage-Werte oder SSP-Opt-Ins an.
5. Klicke auf **`Änderungen speichern & veröffentlichen`**.

---

## 5. Passwörter & Cloudflare-Konfiguration verwalten

Die Passwörter und Repository-Verknüpfungen liegen geschützt im Cloudflare Gatekeeper Worker:

* **Admin-Passwort:** Umgebungsvariable `ADMIN_PASSWORD` (berechtigt zur Bearbeitung aller Editoren und Partner).
* **Vermarkter-Passwörter:** Variable `PWD_<vermarkterId>` (z. B. `PWD_uim`, `PWD_stroeer`).
* **Data-Partner-Passwörter:** Variable `PWD_<dataPartnerId>` (z. B. `PWD_iq_data`).
* **Ziel-Repository:**
  * `GITHUB_OWNER`: z. B. `BVDW-org`
  * `GITHUB_REPO`: z. B. `ovk-identifiersupport`
  * `GITHUB_BRANCH`: `main`
  * `GITHUB_BASE_PATH`: z. B. `tools/identifier-landscape`
  * `GITHUB_TOKEN`: GitHub Personal Access Token (PAT) mit `repo`-Scope.
