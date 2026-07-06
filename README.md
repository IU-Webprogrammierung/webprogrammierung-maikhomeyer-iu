# Portfolio Website – Maik Homeyer

Persönlicher Webauftritt mit Schwerpunkt auf semantischem HTML, Barrierefreiheit und moderner CSS-Architektur. Entstanden im Rahmen des Moduls "Projekt: Web Programmierung" an der IU Internationale Hochschule.

## Über das Projekt

Die Website präsentiert mich als UX Designer und dient als zentrale Plattform für berufliche Bewerbungen. Sie ist als One-Pager mit den vier Sektionen "Über mich", "Projekte", "Werdegang" und "Kontakt" aufgebaut. Eine separate Impressums-Unterseite ergänzt den Webauftritt. Detailansichten der Projekte öffnen sich als Modale über der Startseite, ohne den Kontext zu verlassen.

## Technologie-Stack

- **HTML** als semantische Grundstruktur
- **CSS** mit modernem CSS Nesting für Layout und Gestaltung
- **JavaScript** für Interaktionen, Komponenten-Loading, Theme-Toggle und Scroll-Reveal
- **Git** zur Versionierung des gesamten Quellcodes

### Hinweis zur korrekten Darstellung im Browser

Die Website nutzt JavaScript für das Laden wiederverwendbarer Komponenten (Header & Footer). Sie muss daher über einen lokalen Webserver geöffnet werden – nicht direkt aus dem Dateisystem (`file://`).

## Konzept und Wireframes

Vor der Implementierung wurde ein umfassendes Konzept erstellt, das das responsive Verhalten, das Gestaltungsraster, die Sitemap, detaillierte Wireframes für Mobile, Tablet und Desktop sowie einen Styleguide zu Typografie, Farben und Komponenten-Patterns beschreibt. Dieses Konzept bildet die Grundlage für alle weiteren Umsetzungsschritte.

## Umgesetzte Features

Die Features sind in der Reihenfolge dokumentiert, in der sie umgesetzt wurden – von der grundlegenden Struktur bis hin zu den finalen Interaktions-Details.

### Semantik und Struktur

Der erste Schritt war der Aufbau der HTML-Struktur mit konsequent semantischem Markup:

- Verwendung nativer HTML5-Elemente (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`, `<dialog>`)
- Saubere Heading-Hierarchie ohne Sprünge
- Definition Lists (`<dl>`, `<dt>`, `<dd>`) für tabellarische Werdegangs-Inhalte
- `<address>`-Element für die Impressums-Adresse
- BEM-Notation für Klassen-Benennung (`block__element--modifier`) – sorgt für klare, konfliktfreie Selektoren

### Barrierefreiheit (WCAG 2.1, WAI-ARIA)

Bereits parallel zur Struktur wurde die Barrierefreiheit konsequent mitgedacht:

- Skip-Link zum Hauptinhalt für Tastatur-Navigation
- Aussagekräftige `aria-label`-Attribute auf interaktiven Elementen
- `aria-expanded` und `aria-controls` zur Kommunikation des Mobile-Menü-Zustands
- `aria-pressed` am Theme-Toggle zur Anzeige des aktiven Farbschemas
- `aria-current="page"` zur Kennzeichnung der aktuellen Seite
- Dekorative Elemente mit `aria-hidden="true"` ausgeblendet
- Alt-Texte für alle inhaltlich relevanten Bilder
- `prefers-reduced-motion` wird respektiert: Smooth-Scroll, Reveal-Animationen und Circle-Rotation werden für betroffene Nutzer:innen deaktiviert
- `prefers-color-scheme` wird als initiale Theme-Einstellung berücksichtigt
- Touch-Target-Mindestgröße von 44×44 px auf interaktiven Elementen
- Logo-Link mit klarer Funktionsangabe für Screenreader

### Modal-Steuerung mit nativer Dialog-API

Für die Projekt-Detailansichten wurde das native `<dialog>`-Element genutzt – zusammen mit der modernen **Invoker Commands API**:

- Steuerung über `commandfor` / `command`-Attribute – vollständig deklarativ ohne JavaScript
- `closedby="any"` für intuitives Schließen via Backdrop-Klick oder Esc-Taste
- Automatischer Focus-Trap durch native Browser-API
- **Bleed-Scroll-Pattern** ab Tablet: Das Modal ist von der Höhe abhängig vom Inhalt, wird bei Bedarf am unteren Bildschirmrand abgeschnitten und scrollt als Ganzes; beim Scroll-Ende wird der Abstand zum Rand wieder sichtbar
- Responsive Anpassung: vollflächig auf Mobile, mit Abstand zum Rand ab Tablet, mittig zentriert mit `max-width: 1280px` auf Desktop
- Backdrop mit Backdrop-Filter (Blur und Abdunkelung) ab Tablet
- Scrollbar ausgeblendet für sauberes visuelles Erscheinungsbild

### Layout und Responsive Design

Mobile-First-Ansatz: Basisstyles gelten für mobile Geräte, größere Bildschirme werden über Media Queries erweitert.

**Verwendete Breakpoints:**

- **Mobile**: bis 639 px (Basisstyles)
- **Tablet**: ab 640 px
- **Wide Tablet**: ab 1024 px (Übergang zum Desktop-Layout)
- **Desktop**: ab 1376 px (für freistehenden Header und Modal-Abstände)

Layout-Techniken: Flexbox für eindimensionale Ausrichtungen (z. B. Navigation, Hero), CSS Grid für Karten-Listen (Projekte), tabellarische Strukturen (Werdegangs-Einträge auf Tablet/Desktop) und die Modal-Galerie.

### Design-System mit Custom Properties

Konsistentes Erscheinungsbild durch CSS Custom Properties (Variablen) in `:root`:

- **Schriften**: `--font-display` (DM Serif Display) und `--font-body` (Satoshi), beide lokal gehostet als TTF mit `font-display: swap`
- **Farben**: primäre und sekundäre Backgrounds, Textfarbe, zwei Accent-Varianten (für Text vs. Surface), Border-Abstufungen und inverse Werte für Akzentflächen
- **Surface-Effekte**: `--color-surface-blur` und `--backdrop-blur` für den Glas-Effekt im Header und den Modal-Backdrop
- **Spacing**: `--section-padding-x` und `--section-padding-y` skalieren responsiv mit dem Viewport
- **Radien**: `--border-radius-md` und `--border-radius-sm` für konsistente Rundungen
- **Dynamische Farbmischungen**: `color-mix()` für Hover-Overlays, die sich automatisch an die aktive Akzentfarbe anpassen

Die Variablen bildeten von Anfang an die Basis – dadurch war später der Wechsel zwischen Light- und Darkmode ohne Umbauten in den einzelnen Regeln möglich.

### Visuelle Gestaltung

Das Styling orientiert sich an Designsprachen moderner Tech-Produkte (Apple, Google, YouTube): klare Typografie, großzügige Abstände, durchgängig abgerundete Ecken sowie subtile Backdrop-Blur-Effekte für den schwebenden Header.

- Stilisiertes Logo "maikzn." mit akzentfarbenem Punkt
- Floating Header mit Backdrop-Blur (ab Tablet) – inspiriert durch Apple TV
- Card-basierte Projekt-Vorschauen mit definiertem Aspect Ratio (5:7)
- Abgerundete Kontakt-Footer-Fläche, die optisch eine zusammenhängende Einheit bildet
- Konsistente Icon-Sprache durch Tabler Icons als Inline-SVG
- Rotierender Text-Kreis im Hero-Bereich als visueller Anker

### Navigation

- **Mobile**: Hamburger-Icon mit aria-gesteuertem Toggle, öffnet ein vollflächiges Menü-Overlay
- **Tablet/Desktop**: Navigationspunkte ausgeschrieben, Theme-Toggle integriert
- **Hamburger-Animation**: rein per CSS umgesetzt, animiert zum Schließen-Kreuz im offenen Zustand
- **Sticky Header**: bleibt beim Scrollen am oberen Bildschirmrand, schrumpft leicht beim Scrollen
- **Floating Pattern**: ab Tablet schwebt der Header mit Abstand zum Rand
- **Smooth-Scroll** zu Sektions-Ankerlinks mit `scroll-padding-top`, damit Sektionen nicht hinter dem fixierten Header verschwinden

### Komponenten-System

Header und Footer werden als wiederverwendbare HTML-Fragmente ausgelagert und per JavaScript dynamisch in die Seiten geladen:

- `components/header.html` und `components/footer.html` enthalten den Inhalt
- `script.js` lädt die Komponenten per `fetch()` und fügt sie in die entsprechenden Elemente ein
- Vorteil: Änderungen am Header oder Footer müssen nur an einer Stelle gepflegt werden
- Hinweis: Erfordert die Ausführung über einen lokalen Webserver (siehe oben)

### JavaScript-Architektur

Der JavaScript-Code ist bewusst schlank gehalten und in klar getrennte Init-Funktionen organisiert. Da Header und Footer per `fetch()` nachgeladen werden, ist die Reihenfolge der Initialisierung entscheidend:

```javascript
async function init() {
    await loadComponent('.site-header', 'components/header.html');
    await loadComponent('.site-footer', 'components/footer.html');
    
    initNavigation();
    initScroll();
    initThemeToggle();
    initReveal();
}
```

**Wichtig:** Die Init-Funktionen für Navigation, Scroll-Handling und Theme-Toggle greifen alle auf Elemente **im Header** zu. Sie können daher erst laufen, wenn `loadComponent()` mit `await` abgeschlossen ist. Genauso muss `initReveal()` nach dem Footer-Loading laufen, damit die Reveal-Klassen dort auch beobachtet werden können. Ohne diese Reihenfolge würden die Selektoren ins Leere greifen.

### Light- und Darkmode

Vollständiger Theme-Switch mit persistenter Speicherung:

- **`data-theme`-Attribut** am `<html>`-Element steuert das aktive Theme (skalierbarer als eine einzelne Class)
- **Systempräferenz** wird via `prefers-color-scheme` initial übernommen
- **User-Auswahl** wird im `localStorage` gespeichert und überschreibt die Systempräferenz
- **Pill-Style Theme-Toggle** mit animiertem Thumb und Sun-/Moon-Icons (Tabler Icons)
- Alle Farben werden über die zentralen Custom Properties gesteuert – ein Theme-Wechsel tauscht nur die Variablen-Werte, nicht die einzelnen Regeln

### CSS Nesting als strukturelle Umstellung

Auf Feedback des Tutors hin wurde das komplette Stylesheet auf **natives CSS Nesting** umgestellt (ohne Preprocessor wie SASS). Media Queries stehen jetzt direkt bei ihrer Komponente:

```css
.hero__title {
    font-size: 2.5rem;

    @media (min-width: 1024px) {
        font-size: 3.75rem;
    }
}
```

**Vorteile:**
- Alle Zustände eines Elements (Hover, Modifier, responsive Verhalten) an einem Ort
- Deutlich weniger Kontext-Wechsel beim Lesen und Bearbeiten
- Klarere BEM-Beziehungen zwischen Block, Element und Modifier

Vorher waren die Media Queries in großen globalen Blöcken am Ende der Datei gesammelt – nach dem Refactor sind sie auf die jeweiligen Komponenten verteilt, was die Wartbarkeit erheblich verbessert.

### Scroll-Reveal-Animationen

Beim Laden und Scrollen erscheinen die Inhalte gestaffelt mit einer Fade-in- und Slide-up-Animation:

- **Hero-Elemente** werden direkt nach dem Page-Load nacheinander eingeblendet (Bild → Titel → Text → Icons → Circle)
- **Projekte, Werdegang und Footer** erscheinen erst beim Scrollen in den Viewport
- **Umsetzung** über `IntersectionObserver` in JavaScript, der eine CSS-Klasse `reveal--visible` triggert
- **Modifier-Variante** `reveal--scale` für Elemente, die statt eines Slide-Effekts skalieren sollen (z. B. der Text-Kreis mit zusätzlicher Rotation, der Footer)
- **`prefers-reduced-motion`** wird respektiert: Alle Reveals starten sofort sichtbar, ohne Animation

**Zu den Inline-Delays:** Die gestaffelten `transition-delay`-Werte wurden bewusst als Inline-Styles direkt im HTML gesetzt (z. B. `style="transition-delay: 0.2s"`). Zwar widerspricht das dem Prinzip der Trennung von Struktur und Präsentation, hier war es aber die pragmatischste Lösung. Die Alternative wäre gewesen, für jede Sektion `:nth-child`-Regeln zu schreiben. Inline-Delays halten die Zuordnung zwischen Element und Timing sichtbar am HTML und lassen sich schnell justieren, ohne im CSS suchen zu müssen.

### Farbliche Textauswahl

Das native Browser-Verhalten der Textauswahl wurde an das Design-System angepasst:

- Auf regulären Flächen: Akzentfarbe als Background, weißer Text
- Auf Akzentflächen (Footer): invertiert – weißer Background, Akzent-Text
- Umsetzung mit dem `::selection`-Pseudo-Element, kontextsensitiv gescoped

### Interaktions-Feedback

Zusätzlich zu den Hover-States geben Buttons und interaktive Elemente auch **`:active`-Feedback**:

- Kurze Skalierung auf `scale(0.9)` beim Drücken vermittelt ein taktiles Gefühl
- Wirkt besonders auf Touch-Geräten wie ein "Klick"
- Wird auf Nav-Links, Theme-Toggle, Contact-Button, Back-to-Top, Modal-Close, Social-Icons und Project-Cards konsistent angewendet

### Mehrseitigkeit

- Startseite (`index.html`) mit Ankerlinks zu den einzelnen Sektionen
- Verlinkte Impressums-Unterseite (`impressum.html`) mit gültigen DDG-Pflichtangaben
- **404-Fehlerseite** (`404.html`) mit eigenem Design, wird von GitHub Pages automatisch bei nicht existierenden URLs ausgeliefert – nutzt den rotierenden Text-Kreis als Wiedererkennungselement

## Erkenntnisse und Herausforderungen

Während der Umsetzung sind einige Themen aufgekommen, die zusätzliche Iterationen und Workarounds erforderten. Diese sind bewusst dokumentiert, weil sie den Entwicklungsprozess widerspiegeln und für ähnliche Projekte wertvoll sind.

### Farbwahl und Kontraste

Die Akzentfarbe war ursprünglich ein warmes Rot (`#FF4E5F`), das im Lightmode gut funktioniert. Als der Darkmode dazu kam, wurde schnell klar, dass dasselbe Rot auf dunklem Hintergrund die Kontrast-Anforderungen nicht mehr sauber erfüllte und optisch weniger stimmig wirkte. Nach mehreren Iterationen (unter anderem auch mit einem Gelb-Ton, das gute Kontraste bot, aber nicht ins Gesamtbild passte) wurde für den Darkmode ein Blau-Ton gewählt (`#6871E9`), der auf dunklem Untergrund deutlich harmonischer wirkt.

Zusätzlich wurden für die Akzentfarbe zwei Varianten eingeführt: `--color-accent` für Text und `--color-accent-surface` als Flächenfarbe. Diese Unterscheidung ist wichtig, weil Text- und Surface-Verwendungen unterschiedliche Anforderungen an Sättigung und Helligkeit haben.

### Header-Verhalten mit Backdrop-Filter

Der Header nutzt einen Backdrop-Blur-Effekt, der auf modernen Browsern eine schöne Glasoptik erzeugt. Bei der Darkmode-Umsetzung trat allerdings ein subtiles Problem auf: Der Header war beim initialen Laden auch dann leicht sichtbar, wenn eigentlich noch nichts unter ihm lag, weil die halbtransparente Surface-Farbe durch das Blur-Filter interpretiert wurde und leicht "aufblitzte".

**Workaround:** Der Header startet jetzt komplett transparent und ohne Backdrop-Filter. Erst beim Scrollen (Klasse `.site-header--scrolled`) werden Blur und Surface-Farbe aktiviert. Damit das auch bei einem Reload auf gescrollter Position sofort korrekt aussieht, wird der Scroll-Status in `initScroll()` direkt beim Init geprüft, nicht erst beim ersten Scroll-Event.

Um zusätzlich zu verhindern, dass die Header-Transition beim initialen Setzen der Klasse mitläuft (was zu einem sichtbaren "Zucken" führte), wird beim Init kurzzeitig eine `.site-header--no-transition`-Klasse gesetzt, die nach zwei `requestAnimationFrame`-Zyklen wieder entfernt wird.

### CSS Nesting: Probleme mit dem `&`-Kombinator

Bei der Umstellung auf CSS Nesting trat ein Problem mit BEM-Modifiern auf: Selektoren wie `&--scrolled` wurden von einigen Browser-Parsern (insbesondere älteren Versionen und dem VS-Code-CSS-Highlighter) nicht als BEM-Modifier interpretiert, sondern als Descendant-Combinator (`& --scrolled`) – die Regel griff dadurch nicht.

**Workaround:** Statt `&--scrolled` wurde konsequent `&.site-header--scrolled` (Kompound-Selektor mit vollem Klassennamen) verwendet. Diese Schreibweise ist in allen CSS-Nesting-Implementierungen eindeutig und funktioniert zuverlässig.

Ergänzend wurde die VS-Code-Extension "CSS Nesting Syntax Highlighting" installiert, um Nesting-Selektoren wie `&:focus` und `&:hover` korrekt einzufärben.

### Reveal-Animationen: Konflikte mit Transform-States

Die Scroll-Reveal-Animation nutzt `transform: translateY()` bzw. `scale()` als Startzustand. Bei Elementen, die selbst bereits ein `transform` im Hover- oder Active-State haben (z. B. Project-Cards mit `scale(1.025)` oder der rotierende Text-Kreis), überschrieben sich die Werte gegenseitig – der Reveal wurde nicht sichtbar.

**Workaround:** Trennung von Reveal und Interaktion auf verschiedene DOM-Elemente:

- Beim Text-Kreis wurde ein zusätzlicher Wrapper eingeführt, der den Reveal übernimmt, während der Circle selbst weiter rotiert
- Bei Project-Cards wurde die `.reveal`-Klasse auf das umschließende `<li>` gelegt statt auf den Button selbst

Damit stören sich die Transform-Werte nicht mehr, weil sie auf unterschiedlichen Elementen sitzen.

## Git-Workflow

- **Conventional Commits**: Atomare Commits mit klaren Type-Präfixen (`feat`, `fix`, `refactor`, `docs`, `chore`, `style`)
- **Scopes** zur thematischen Einordnung (`nav`, `hero`, `projects`, `career`, `contact`, `footer`, `modal`, `styles`, `imprint`, `assets`)
- **Tags zur Markierung der Projektphasen**: z. B. `v1.0-phase1` für die abgeschlossene Konzeptionsphase, `v2.0-phase2` für die abgeschlossene HTML/CSS-Phase

## Status

**Aktueller Stand: Website ist funktional vollständig und deployed.** Alle Kernfeatures sind umgesetzt: responsive Layout, Light-/Darkmode, Scroll-Reveal-Animationen, modale Projektansichten und barrierefreie Interaktionen. Der Code ist mit modernem CSS Nesting strukturiert. In Vorbereitung: finale Asset-Optimierung (WOFF2-Konvertierung der Schriften, Bild-Kompression) und Performance-Feinschliff.
