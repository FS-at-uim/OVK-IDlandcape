# OVK ID Landscape – Anleitung für Partner

Diese Anleitung richtet sich an **Vermarkter** und **Data Partner**, die ihre Daten im **OVK ID Landscape** selbstständig über die webbasierte Benutzeroberfläche pflegen und veröffentlichen möchten.

---

## 1. Übersicht

Sie haben von der OVK-Administration einen individuellen Link und ein Passwort erhalten.
* **Vermarkter** nutzen den **Vermarkter Config Editor** (`vermarkter_editor.html?id=<Ihre_ID>`).
* **Data Partner** nutzen den **Core Editor** (`core_editor.html?id=<Ihre_ID>`).

Alle Änderungen werden nach der Freigabe direkt im offiziellen Repository des OVK ID Landscape gespeichert und sind beim nächsten Neuladen der Karte für den Markt sichtbar.

---

## 2. Anleitung für Vermarkter

### Schritt 1: Editor öffnen & anmelden
1. Öffnen Sie Ihren persönlichen Link (z. B. `https://<domain>/vermarkter_editor.html?id=uim`).
2. Im Anmeldefenster ist Ihr Vermarkter-Name bereits vorausgewählt.
3. Geben Sie Ihr **Passwort** ein und klicken Sie auf **Anmelden**.

> [!NOTE]
> Nach erfolgreicher Anmeldung lädt der Editor automatisch die aktuell im OVK-System hinterlegten Daten Ihres Hauses.

---

### Schritt 2: Basisdaten pflegen
* **ID:** Technischer Bezeichner (schreibgeschützt).
* **Name:** Offizieller Anzeigename Ihres Vermarkters (z. B. *United Internet Media*).
* **Beschreibung:** Kurze Leistungs- und Profilbeschreibung (max. **65 Zeichen**). Ein Zeichenzähler hilft Ihnen bei der Einhaltung.

---

### Schritt 3: Inventartypen & ID-Abdeckungen (Coverage %)
Hier hinterlegen Sie, auf welchen Kanälen Sie welche ID-Lösungen unterstützen:

1. **Inventartyp anlegen:**
   * Klicken Sie auf **`+ Inventory hinzufügen`**.
   * Wählen Sie die Gattung aus: `Desktop`, `Mobile Web`, `In-App` oder `Connected TV (CTV)`.
2. **Unterstützte IDs zuweisen:**
   * Klicken Sie innerhalb des Inventarblocks auf **`+ ID hinzufügen`**.
   * Wählen Sie das ID-System aus (z. B. *Utiq*, *netID*, *netID via Utiq*).
   * **Coverage %:** Tragen Sie den prozentualen Reichweitenanteil (0–100%) ein, auf dem diese ID in Ihrem Inventar zur Verfügung steht (z. B. `66`).
3. **Optionale DSP-Ausschlüsse:**
   * Falls eine ID für bestimmte DSPs in Ihrem Setup *nicht* verfügbar ist, klicken Sie auf **`DSPs ausschließen`**.
   * Setzen Sie ein Häkchen bei den Plattformen, die ausgeschlossen werden sollen.
4. **Inventar oder ID entfernen:**
   * Über das rote **`X`** können Sie einzelne IDs oder ganze Inventarblöcke entfernen.

---

### Schritt 4: SSP Opt-In
Im Bereich **SSP Opt-In** finden Sie alle im OVK gelisteten Supply Side Platforms (z. B. *PubMatic*, *Magnite*, *Yieldlab*, *Equativ* etc.):
* **Aktivieren Sie die Checkboxen** aller SSPs, an die Ihr Vermarkter angebunden ist.
* Abgewählte SSPs führen dazu, dass Ihr Vermarkter bei entsprechenden Abfragen nicht als Zielpfad angezeigt wird.

---

### Schritt 5: Änderungen veröffentlichen
1. In der rechten Spalte finden Sie die Box **"Veröffentlichen"** sowie die Live-Code-Vorschau.
2. Klicken Sie auf den blauen Button **`Änderungen speichern & veröffentlichen`**.
3. Nach wenigen Sekunden erscheint eine grüne Erfolgsmeldung:
   > *Erfolgreich gespeichert! Die Map wird beim nächsten Neuladen aktualisiert.*
4. Ihre Daten sind damit sofort im System aktiv.

---

## 3. Anleitung für Data Partner

1. Öffnen Sie Ihren persönlichen Link (z. B. `https://<domain>/core_editor.html?id=iq_data`).
2. Geben Sie Ihr **Passwort** ein und klicken Sie auf **Anmelden**.
3. Der Editor öffnet sich direkt in der Detailansicht Ihres Data-Partner-Profils:
   * **Name & Beschreibung:** Bezeichnung und Information zu Ihren Datensegmenten.
   * **Unterstützte ID-Systeme:** Setzen Sie Häkchen bei den ID-Lösungen, über die Ihre Segmente adressierbar sind (z. B. *Utiq*).
   * **Kompatible DSPs:** Wählen Sie alle DSPs aus, auf denen Ihre Zielgruppendaten für den Einkauf zur Verfügung stehen.
   * **Kompatible Curation-SSPs:** Wählen Sie die angebundenen Curation-SSPs aus.
4. Klicken Sie unten auf **`Speichern / Übernehmen`**.
5. Klicken Sie in der rechten Spalte auf **`Änderungen speichern & veröffentlichen`**, um die Daten live zu schalten.

---

## 4. Häufige Fragen & Support

* **Passwort vergessen?** Wenden Sie sich bitte an Ihren OVK-Administrator, der Ihr Passwort im Cloudflare Gatekeeper neu setzen kann.
* **Ergebnis überprüfen:** Sie können jederzeit über den Link **"OVK Landscape Map öffnen"** oben rechts zur Hauptansicht wechseln und Ihr Profil live auf der Karte testen.
