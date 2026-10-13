# Schritt-für-Schritt Anleitung: Cloudflare Worker Gatekeeper einrichten

Mit diesem Setup erstellst du ein sicheres Backend, das als Brücke zwischen dem Frontend (Editor) und GitHub fungiert, ohne dass Passwörter oder API-Schlüssel im Code sichtbar sind.

## Schritt 1: GitHub Personal Access Token (PAT) erstellen

Der Worker benötigt Schreibrechte für dein GitHub Repository.
1. Logge dich bei [GitHub](https://github.com) ein.
2. Gehe zu **Settings** (Dein Profilbild oben rechts) -> **Developer settings** -> **Personal access tokens** -> **Tokens (classic)**.
3. Klicke auf **Generate new token (classic)**.
4. Gib dem Token einen Namen (z.B. "OVK Gatekeeper").
5. Wähle bei Expiration am besten "No expiration" (oder denke daran, ihn später zu erneuern).
6. Hake bei den Scopes **`repo`** (Full control of private repositories) an. *(Damit darf das Token Dateien bearbeiten).*
7. Klicke auf **Generate token**. 
8. **WICHTIG:** Kopiere diesen Token (z.B. `ghp_xxxxx...`) und speichere ihn zwischen. Du siehst ihn danach nie wieder!

## Schritt 2: Cloudflare Account erstellen
1. Gehe zu [Cloudflare](https://dash.cloudflare.com/sign-up) und erstelle dir einen kostenlosen Account (falls du noch keinen hast).
2. Du musst keine Domain kaufen oder umziehen – die Workers-Funktion ist komplett kostenlos und unabhängig.

## Schritt 3: Cloudflare Worker anlegen
1. Im Cloudflare Dashboard gehst du links im Menü auf **Workers & Pages**.
2. Klicke auf **Create Application** und dann auf den Reiter **Workers** -> **Create Worker**.
3. Gib dem Worker einen Namen (z.B. `ovk-gatekeeper`).
4. Klicke unten rechts auf **Deploy** (Die voreingestellte Hello-World Vorlage ignorieren wir erstmal).

## Schritt 4: Worker Code einfügen
1. Du bist jetzt auf der Übersicht deines neuen Workers. Klicke oben rechts auf **Edit code**.
2. Ein Code-Editor öffnet sich. Lösche alles, was dort steht.
3. Öffne in VSCode die Datei `docs/gatekeeper_worker.js` (die wir gerade erstellt haben), kopiere den kompletten Code und füge ihn in den Cloudflare Editor ein.
4. Klicke oben rechts auf den blauen Button **Save and deploy**.

## Schritt 5: Umgebungsvariablen (Secrets) einrichten
Hier speicherst du nun sicher das GitHub Token und die Passwörter.
1. Verlasse den Code-Editor (zurück zur Worker-Übersicht).
2. Gehe im Reiter auf **Settings** -> **Variables**.
3. Unter "Environment Variables" klickst du auf **Add variable**.

Füge nun folgende Variablen hinzu (Wähle immer den Button `Encrypt` aus, damit die Werte versteckt werden!):

*   **Variable 1:**
    *   **Name:** `GITHUB_TOKEN`
    *   **Value:** Dein zuvor kopierter GitHub Token (`ghp_...`).
    *   *Klicke auf `Encrypt`!*
*   **Variable 2:**
    *   **Name:** `GITHUB_OWNER`
    *   **Value:** `BVDW-org`
*   **Variable 3:**
    *   **Name:** `GITHUB_REPO`
    *   **Value:** `ovk-identifiersupport`
*   **Variable 4: (Master-Admin & Pepper)**
    *   **Name:** `ADMIN_PASSWORD`
    *   **Value:** Das Master-Passwort für den Administrator (dient gleichzeitig als kryptografischer Pepper für Passwörter).
    *   *Klicke auf `Encrypt`!*
*   **Variable 5: (Pfad zum Projekt im Repository)**
    *   **Name:** `GITHUB_BASE_PATH`
    *   **Value:** `tools/identifier-landscape` (oder leer lassen, falls im Root).
    *   *Der Worker hängt diesen Pfad automatisch vor jeden Dateizugriff.*
*   **Variable 6: (Optional - Ziel-Branch)**
    *   **Name:** `GITHUB_BRANCH`
    *   **Value:** `main` (oder Name deines Test-Branches).
*   **Variable 7: (Optional - Zusätzlicher Pepper)**
    *   **Name:** `AUTH_SALT`
    *   *Zusätzlicher geheimer Pepper-String für das SHA-256 Hashing.*

> [!TIP]
> **Partner- und Multi-Admin-Passwörter:** Müssen **nicht mehr** in Cloudflare angelegt werden! Sie werden direkt im Portal (`editor.html` &rarr; *Benutzer & Logins*) verwaltet und sicher in `config/auth_registry.json` im GitHub-Repository gespeichert. Alte `PWD_<id>` Variablen können als Fallback verbleiben.

4. Klicke unten auf **Save and deploy**.

## Schritt 6: URL kopieren
1. Gehe in deinem Cloudflare Worker auf den Reiter **Triggers** oder die Übersicht.
2. Dort siehst du deine Worker-URL: `https://ovk-ladscape.friedrich-schenk.workers.dev`.
3. Diese URL ist im Portal (`editor.html`) als `WORKER_URL` hinterlegt.

## Schritt 7: Führendes Ziel-Repository (Single Source of Truth)
Das in den Cloudflare-Variablen angegebene Repository ist führend für alle Konfigurationsdateien:
* Beim Login im Portal [`editor.html`](editor.html) lädt der Cloudflare Worker die Dateien direkt über die GitHub API aus dem Ziel-Repository (z. B. `BVDW-org/ovk-identifiersupport`).
* **Wichtig bei Updates an `docs/gatekeeper_worker.js`:** Wenn `docs/gatekeeper_worker.js` erweitert wird (z. B. für Multi-Admin oder neue Speicher-Endpoints), kopiere den Code einmalig in das Cloudflare Dashboard (**Edit code**) und klicke auf **Save and deploy**.

