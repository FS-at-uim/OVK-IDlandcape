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
    *   **Value:** Dein GitHub Benutzername oder Org-Name (wo das Repo liegt, z.B. `fschenk`).
*   **Variable 3:**
    *   **Name:** `GITHUB_REPO`
    *   **Value:** Der Name deines Repositories (z.B. `Identifier` oder `OVK-IDlandscape`).
*   **Variable 4: (Option A) JSON Passwörter (Alte Variante)**
    *   **Name:** `VERMARKTER_PASSWORDS`
    *   **Value:** Ein JSON-Objekt. (z.B. `{"funke":"geheim2"}`)
*   **Variable 4: (Option B) Einzelne Passwörter (Bessere Variante!)**
    *   Du kannst jedes Passwort einzeln anlegen. Der Name muss immer `PWD_` + `ID` sein.
    *   **Name:** `PWD_ad_alliance` (für Ad Alliance)
    *   **Value:** `geheim1`
    *   **Name:** `PWD_uim_data` (für UIM Data Partner)
    *   **Value:** `passwort123`
    *   *Klicke auf `Encrypt` für jedes Passwort!*
*   **Variable 5:**
    *   **Name:** `ADMIN_PASSWORD`
    *   **Value:** Das Master-Passwort für dich als Admin (damit du alle Vermarkter bearbeiten kannst).
    *   *Klicke auf `Encrypt`!*
*   **Variable 6: (Optional - Für sicheres Testen)**
    *   **Name:** `GITHUB_BRANCH`
    *   **Value:** `v2-testing` (Oder der Name deines Test-Branches im originalen Repo)
    *   *Lässt du diese Variable weg, speichert der Worker standardmäßig in den `main` Branch.*

4. Klicke unten auf **Save and deploy**.

## Schritt 6: URL kopieren
1. Gehe in deinem Cloudflare Worker auf den Reiter **Triggers**.
2. Dort siehst du eine URL unter "Routes", die ähnlich aussieht wie `https://ovk-gatekeeper.<dein-username>.workers.dev`.
3. Kopiere diese URL! 
4. Diese URL müssen wir im nächsten Schritt im HTML Editor (`vermarkter_editor.html`) eintragen, damit der Editor weiß, wohin er die Passwörter und den Code senden muss.
