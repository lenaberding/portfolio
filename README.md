# Lena Berding — Website

Sechs eigenständige Seiten, technisch für Google & KI-Suchmaschinen vorbereitet,
bereit für GitHub Pages.

## Dateistruktur

```
index.html                      → Home
live-fashion-illustration.html  → Live Fashion Illustration
editorial-illustration.html     → Editorial & Brand Illustration (Serien-Übersicht, Masonry-Galerie)
series-*.html                   → Detailseiten der einzelnen Serien (Titel, Beschreibung, Bildergalerie)
about.html                      → About
impressum.html                  → Impressum (Deutsch)
datenschutz.html                → Datenschutzerklärung (Deutsch)

style.css                       → Farben, Abstände, Layout (für alle Seiten gemeinsam)
script.js                       → Menü, FAQ-Klappliste, "E-Mail kopieren"

images/                         → alle Fotos/Illustrationen (aktuell Platzhalter)
fonts/                          → selbst gehostete Schriftdateien (kein Google-Fonts-Aufruf,
                                   dadurch kein Cookie-Banner dafür nötig) + Lizenztexte (OFL-*.txt)
favicon.ico, favicon-*.png,
apple-touch-icon.png, android-*.png,
site.webmanifest                → Browser-Tab-Icon (aktuell "LB"-Monogramm)

robots.txt                      → erlaubt Google, Bing und KI-Crawler (ChatGPT, Claude, Perplexity …)
sitemap.xml                     → Liste aller Seiten für Suchmaschinen
llms.txt                        → Kurzbeschreibung der Seite für KI-Systeme
```

Jede Seite ist jetzt eine eigene, echte HTML-Datei mit eigener Adresse
(z. B. `deineseite.de/live-fashion-illustration.html`) — dadurch kann jede
Unterseite einzeln bei Google ranken, einzeln geteilt und verlinkt werden,
und der Zurück-Button im Browser funktioniert normal.

## ⚠️ Erster Schritt: Domain eintragen

In allen Dateien steht aktuell der Platzhalter `your-domain-here.com`. Sobald
deine echte Domain feststeht, in VS Code **„In Dateien suchen und ersetzen"**
nutzen (Tastenkürzel `Strg/Cmd + Shift + H`):

- Suchen: `your-domain-here.com`
- Ersetzen durch: deine echte Domain, z. B. `lenaberding.com`
- „Alle ersetzen" klicken

Das betrifft: `index.html`, alle Unterseiten, `robots.txt`, `sitemap.xml`, `llms.txt`.

## Texte ändern

`Strg/Cmd + F` in der jeweiligen Datei, nach `TEXT:` suchen — führt durch jeden
änderbaren Textblock. Tags (`<h1>`, `<p class="lead">` …) stehen lassen, nur den
Text dazwischen ändern.

**E-Mail-Adresse:** kommt an zwei Stellen im selben Block vor (sichtbarer Text +
im `onclick`) — immer beide ändern:
```html
<span class="email-text">studio@lenaberding.com</span>
<button class="copy-btn" onclick="copyEmail(this, 'studio@lenaberding.com')">…</button>
```

**FAQ-Fragen** stehen nicht in den HTML-Dateien, sondern in `script.js`, in der
Liste `faqData` ganz unten — Frage/Antwort dort hinzufügen, ändern, entfernen.

**Jede Seite hat eigene SEO-Texte** ganz oben im `<head>`:
```html
<title>Live Fashion Illustration for Brand Events | Lena Berding</title>
<meta name="description" content="Book live fashion illustration for store openings…">
```
Der `<title>` erscheint als blauer Link-Text bei Google, die `description`
als Vorschautext darunter. Beides lohnt sich anzupassen, wenn sich der
Seiteninhalt deutlich ändert.

## Bilder austauschen

Wie gehabt: neue Datei mit **exakt demselben Dateinamen** in `images/` legen
und die Platzhalter-Datei überschreiben.

Die Dateinamen sind diesmal bewusst mit Suchbegriffen versehen (z. B.
`live-fashion-illustration-hero.jpg` statt `bild1.jpg`) — das hilft minimal
bei der Google-Bildersuche. Du kannst sie umbenennen, wenn du magst, musst
dann aber das `src="images/…"` an der jeweiligen Stelle im HTML mit anpassen.

| Datei | Verwendung | Format |
|---|---|---|
| `live-fashion-illustration-hero.jpg` | Home, Hero rechts | Hochformat 3:4 |
| `fashion-illustrator-lena-berding-portrait.jpg` | Home, About-Teaser | Hochformat 3:4 |
| `live-illustration-brand-activation.jpg` | Live-Seite, Hero rechts | Hochformat 3:4 |
| `fashion-sketch-live-drawing-event.jpg` | Live-Seite, "The magic of…" | Hochformat 4:5 |
| `live-fashion-illustration-photo-strip-1.jpg` bis `…-5.jpg` | Live-Seite, Fotoreihe bei "The most personal gift…" | beliebiges Format |
| `editorial-fashion-illustration-lena-berding.jpg` | Editorial-Seite, Hero rechts | Hochformat 3:4 |
| `private-commissions-cover.jpg` | Editorial-Galerie, Cover "Private Commissions" (+ Vorschaubild dieser Serie beim Teilen) | beliebiges Format |
| `fashion-sketches-cover.jpg` | Editorial-Galerie, Cover "Fashion Sketches" (+ Vorschaubild dieser Serie beim Teilen) | beliebiges Format |
| `private-commission-wedding-invitation.jpg` | Serie "Private Commissions", Bild 1 | beliebiges Format |
| `private-commission-couple-portrait.jpg` | Serie "Private Commissions", Bild 2 | beliebiges Format |
| `fashion-sketches-01.jpg`, `…-02.jpg`, `…-03.jpg` | Serie "Fashion Sketches" | beliebiges Format |
| `fashion-illustrator-lena-berding-about.jpg` | About-Seite, Hero rechts | Hochformat 3:4 |

**Wichtig für Ladezeit:** Fotos vor dem Hochladen komprimieren (z. B. mit
[squoosh.app](https://squoosh.app), kostenlos) — Zielgröße ca. 150–400 KB pro Bild,
nicht mehrere MB direkt vom Handy/der Kamera.

**Jede Datei gehört nur einer Stelle:** Jedes Bild in der Tabelle oben wird nur an
genau einer Stelle verwendet (Ausnahme: die beiden Serien-Cover erscheinen
zusätzlich als Vorschaubild, wenn die jeweilige Serien-Seite geteilt wird — das
ist dieselbe Serie, kein Konflikt). Du kannst also jedes Bild einzeln ersetzen,
ohne dass sich dadurch ungewollt ein Foto an einer anderen Stelle mitändert.

## Editorial-Galerie: neue Serie hinzufügen

Die Galerie auf `editorial-illustration.html` ist ein **Masonry-Raster**: Fotos
ordnen sich automatisch in Spalten ein, egal ob Hoch-, Quer- oder Quadratformat —
du musst nichts zuschneiden oder auf ein einheitliches Format bringen. Jede Kachel
zeigt beim Hover (bzw. beim ersten Antippen auf dem Handy) den Serientitel als
Overlay und verlinkt beim Klick auf eine eigene Detailseite mit Titel,
Kurzbeschreibung und der vollständigen Bildergalerie dieser Serie.

**Neue Serie hinzufügen, in drei Schritten:**

1. **Detailseite anlegen** — eine bestehende `series-*.html`-Datei (z. B.
   `series-private-commission.html`) duplizieren und umbenennen, z. B.
   `series-street-style.html`. Darin ändern:
   - `<title>`, `canonical`-Link, `og:title`, `og:url`, `og:description` und den
     `<h1>`-Titel sowie den Beschreibungstext (`<p class="lead">`) unter
     `TEXT:`-Kommentaren.
   - Die Bilder im `<div class="masonry series-gallery">`-Block: pro Foto einen
     kompletten `<div class="masonry-item">…</div>`-Block kopieren, einfügen
     oder entfernen — beliebig viele, beliebiges Format.
2. **Bilder in `images/` legen**, mit eigenen, gut benannten Dateinamen (siehe
   Tabelle oben).
3. **Kachel auf der Übersichtsseite ergänzen** — in `editorial-illustration.html`
   im `<div class="masonry">`-Block einen kompletten
   `<a class="masonry-item">…</a>`-Block kopieren, einfügen und anpassen:
   Bildpfad, Alt-Text, Serientitel (`<span class="masonry-title">`) und den
   `href` auf die neue Detailseite.

Optional: die neue Detailseite in `sitemap.xml` ergänzen (gleiches Muster wie
die bestehenden `series-*`-Einträge), damit Google sie schneller findet.

## Schriften (selbst gehostet)

Die drei Schriften (Inter, Playfair Display, Cormorant Garamond) liegen als
eigene Dateien im `fonts/`-Ordner statt über `fonts.googleapis.com` geladen zu
werden. Der Vorteil: der Browser des Besuchers baut keine Verbindung zu
Google auf, wodurch dafür auch **kein Cookie-Banner/Einwilligung nötig ist**
(anders als bei der eingebundenen Google-Fonts-Variante).

Das war's — nichts zu tun, außer die 6 `.woff2`-Dateien und die
`@font-face`-Regeln ganz oben in `style.css` unangetastet zu lassen. Nur falls
du irgendwann eine **weitere** Schriftstärke oder eine ganz neue Schriftart
brauchst, müsste die als zusätzliche `.woff2`-Datei + `@font-face`-Regel
ergänzt werden (dabei gerne nochmal melden).

## Favicon (Browser-Tab-Icon) ändern

Aktuell ein einfaches "LB"-Monogramm in Terracotta. Wenn du ein eigenes Logo hast:
lass es dir (z. B. über [realfavicongenerator.net](https://realfavicongenerator.net))
in dieselben Dateinamen exportieren und die bestehenden Dateien im Root-Ordner
überschreiben: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`,
`apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`.

## Auf GitHub Pages veröffentlichen

1. Neues Repository auf GitHub anlegen.
2. Alle Dateien aus diesem Ordner (nicht den Ordner selbst) per Drag & Drop hochladen.
3. **Settings → Pages** → Branch `main`, Ordner `/ (root)` → Save.
4. Seite ist nach 1–2 Minuten live unter `https://DEIN-BENUTZERNAME.github.io/REPO-NAME/`.

## Domain von IONOS verbinden

**Bei GitHub:** Settings → Pages → „Custom domain" → deine Domain eintragen, Save.
(Legt automatisch eine `CNAME`-Datei im Repo an.)

**Bei IONOS** (Domains & SSL → DNS):
- Ohne `www` (`lenaberding.com`): vier **A-Records** auf `@`:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```
- Mit `www` (`www.lenaberding.com`): **CNAME-Record** auf `www`, Ziel:
  `DEIN-BENUTZERNAME.github.io`

Beides gleichzeitig einrichten empfohlen. DNS braucht 10 Min. bis mehrere Stunden.
Danach bei GitHub Pages **„Enforce HTTPS"** aktivieren, sobald anklickbar.

## Nach dem Go-Live: Suchmaschinen anmelden

Diese Schritte sorgen dafür, dass Google & Bing die Seite überhaupt finden:

1. **Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console)):
   Domain hinzufügen, Eigentum bestätigen (Anleitung dort), dann unter
   „Sitemaps" die URL `https://deine-domain.de/sitemap.xml` einreichen.
2. **Bing Webmaster Tools** ([bing.com/webmasters](https://www.bing.com/webmasters)):
   gleiches Prinzip, deckt zusätzlich ChatGPT-Suche ab (die nutzt teilweise Bing-Daten).

## Sprache: aktuell Englisch (außer Impressum/Datenschutz)

Alle Marketing-Seiten sind bewusst auf Englisch, weil das zur internationalen,
hochpreisigen Zielgruppe passt. Das bedeutet: bei deutschsprachigen Google-Suchen
(z. B. "modeillustratorin für events") wird die Seite schlechter gefunden als bei
englischen Suchen (z. B. "fashion illustrator berlin"). Impressum und
Datenschutzerklärung sind bewusst auf Deutsch geblieben, weil sie rechtlich für
ein deutsches Gewerbe gelten. Eine deutsche Version der Marketing-Seiten lässt
sich später sauber ergänzen (inkl. `hreflang`-Tags, damit Google beide Sprachen
korrekt zuordnet) — bei Bedarf einfach melden.

## Bereits eingebaute technische SEO-Maßnahmen

- Eigener `<title>` und `<meta name="description">` pro Seite
- `canonical`-Link pro Seite (verhindert doppelte Inhalte in Googles Augen)
- Open-Graph- und Twitter-Card-Tags (saubere Vorschau beim Teilen auf Social Media)
- Strukturierte Daten (Schema.org `Person`/`Service`) für Google & KI-Suchmaschinen
- `robots.txt` mit expliziter Freigabe für KI-Crawler (GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended u. a.), damit die Seite auch in ChatGPT-/Perplexity-Antworten
  auftauchen kann
- `sitemap.xml` mit allen sechs Seiten
- `llms.txt` — eine kurze, strukturierte Zusammenfassung der Seite speziell für
  KI-Systeme (neuer, noch nicht von allen Anbietern genutzter Standard, aber
  kostet nichts und schadet nicht)
- `width`/`height`-Attribute an allen `<img>`-Tags (verhindert "Springen" der
  Seite beim Laden)
- Favicon-Set für alle gängigen Geräte/Browser

## Noch offen / bitte prüfen

- Platzhalter-Domain `your-domain-here.com` überall ersetzen (siehe oben)
- Links bei den Firmennamen auf der About-Seite (`href="#"`) durch echte URLs ersetzen
- LinkedIn- und Pinterest-Links (Menü, Footer) durch echte Profil-URLs ersetzen
- Impressum: `[Straße, Hausnummer]`, `[PLZ, Ort]` und ggf. USt-ID eintragen
- Datenschutzerklärung: von einem Generator (z. B. eRecht24) oder einer
  Anwältin/einem Anwalt final prüfen lassen, bevor die Seite live geht
- Platzhalter-Bilder durch echte, komprimierte Fotos ersetzen
