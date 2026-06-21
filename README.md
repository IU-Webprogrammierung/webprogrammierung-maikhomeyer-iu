# Portfolio Website – Maik Homeyer

Persönlicher Webauftritt mit Schwerpunkt auf semantischem HTML und Barrierefreiheit. Entstanden im Rahmen des Moduls "Projekt: Web Programmierung" an der IU Internationale Hochschule.

## Über das Projekt

Die Website präsentiert mich als UX Designer und dient als zentrale Plattform für berufliche Bewerbungen. Sie ist als One-Pager mit den vier Sektionen "Über mich", "Projekte", "Werdegang" und "Kontakt" aufgebaut. Eine separate Impressums-Unterseite ergänzt den Webauftritt. Detailansichten der Projekte öffnen sich als Modale über der Startseite, ohne den Kontext zu verlassen.

## Technologie-Stack

- **HTML** als semantische Grundstruktur
- **CSS** für Layout und Gestaltung (in Vorbereitung)
- **JavaScript** für Interaktionen und Komponenten-Loading
- **Git** zur Versionierung des gesamten Quellcodes

## Hinweis zur korrekten Darstellung Browser

Die Website nutzt JavaScript für das Laden wiederverwendbarer Komponenten (Header & Footer). Sie muss daher über einen lokalen Webserver geöffnet werden – nicht direkt aus dem Dateisystem (`file://`).

## Umgesetzte Features

### Semantik und Struktur
- Konsequent semantisches Markup (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`, `<dialog>`)
- Saubere Heading-Hierarchie ohne Sprünge
- Definition Lists (`<dl>`, `<dt>`, `<dd>`) für tabellarische Werdegangs-Inhalte
- `<address>`-Element für die Impressums-Adresse
- BEM-Notation für Klassen-Benennung (`block__element--modifier`) – sorgt für klare, konfliktfreie Selektoren

### Barrierefreiheit (WCAG 2.1, WAI-ARIA)
- Skip-Link zum Hauptinhalt für Tastatur-Navigation
- Aussagekräftige `aria-label`-Attribute auf interaktiven Elementen
- `aria-expanded` und `aria-controls` zur Kommunikation des Mobile-Menü-Zustands
- `aria-current="page"` zur Kennzeichnung der aktuellen Seite
- Dekorative Elemente mit `aria-hidden="true"` ausgeblendet
- Alt-Texte für alle inhaltlich relevanten Bilder
- `prefers-reduced-motion` wird respektiert: Smooth-Scroll und Transitionen werden für betroffene Nutzer:innen deaktiviert
- Touch-Target-Mindestgröße von 44×44 px auf interaktiven Elementen
- Logo-Link mit klarer Funktionsangabe für Screenreader

### Layout und Responsive Design

Mobile-First-Ansatz: Basisstyles gelten für mobile Geräte, größere Bildschirme werden über Media Queries erweitert.

**Verwendete Breakpoints:**

- **Mobile**: bis 639 px (Basisstyles)
- **Tablet**: ab 640 px
- **Wide Tablet**: ab 1024 px (Übergang zum Desktop-Layout)
- **Desktop**: ab 1376 px (für freistehenden Header und Modal-Abstände)

Layout-Techniken: Flexbox für eindimensionale Ausrichtungen (z. B. Navigation, Hero), CSS Grid für Karten-Listen (Projekte) und tabellarische Strukturen (Werdegangs-Einträge auf Tablet/Desktop).

### Design-System mit Custom Properties

Konsistentes Erscheinungsbild durch CSS Custom Properties (Variablen) in `:root`:

- **Schriften**: `--font-display` (DM Serif Display) und `--font-body` (Satoshi), beide lokal gehostet als TTF mit `font-display: swap`
- **Skalierbare Basis-Schriftgröße**: `--font-size` passt sich responsiv von 1rem (Mobile) auf 1.125rem (Tablet) an
- **Farben**: `--color-background`, `--color-text`, `--color-accent` und zwei Border-Abstufungen
- **Surface-Effekte**: `--color-surface-blur` und `--backdrop-blur` für den Glas-Effekt im Header und Mobile-Menü
- **Spacing**: `--section-padding-x` und `--section-padding-y` skalieren responsiv mit dem Viewport
- **Radien**: `--border-radius-md` für konsistente abgerundete Ecken

Dieses Variablensystem ist gleichzeitig die Vorbereitung für den geplanten Light-/Darkmode-Switch.

### Visuelle Gestaltung

Das Styling orientiert sich an Designsprachen moderner Tech-Produkte (Apple, Google, YouTube): klare Typografie, großzügige Abstände, durchgängig abgerundete Ecken sowie subtile Backdrop-Blur-Effekte für den schwebenden Header.

- Stilisiertes Logo "maikzn." mit akzentfarbenem Punkt
- Floating Header mit Backdrop-Blur (ab Tablet) – inspiriert durch Apple TV
- Card-basierte Projekt-Vorschauen mit definiertem Aspect Ratio (5:7)
- Abgerundete Kontakt-Footer-Fläche, die optisch eine zusammenhängende Einheit bildet
- Konsistente Icon-Sprache durch Tabler Icons als Inline-SVG

### Navigation

- **Mobile**: Hamburger-Icon mit aria-gesteuertem Toggle, öffnet ein vollflächiges Menü-Overlay
- **Tablet/Desktop**: Navigationspunkte ausgeschrieben, Theme-Toggle integriert
- **Hamburger-Animation**: rein per CSS umgesetzt, animiert zum Schließen-Kreuz im offenen Zustand
- **Sticky Header**: bleibt beim Scrollen am oberen Bildschirmrand, schrumpft leicht beim Scrollen
- **Floating Pattern**: ab Tablet schwebt der Header mit Abstand zum Rand
- **Smooth-Scroll** zu Sektions-Ankerlinks mit `scroll-padding-top`, damit Sektionen nicht hinter dem fixierten Header verschwinden

### Modal-Steuerung

- Native `<dialog>`-Elemente für Projekt-Detailansichten
- Steuerung über die **Invoker Commands API** (`commandfor` / `command`-Attribute) – vollständig deklarativ ohne JavaScript
- `closedby="any"` für intuitives Schließen via Backdrop-Klick oder Esc-Taste
- Automatischer Focus-Trap durch native Browser-API
- Responsive Anpassung: vollflächig auf Mobile, mit Abstand zum Rand ab Tablet, mittig zentriert mit `max-width: 1280px` auf Desktop
- Backdrop mit Backdrop-Filter (Blur und Abdunkelung) ab Tablet

### Komponenten-System

Header und Footer werden als wiederverwendbare HTML-Fragmente ausgelagert und per JavaScript dynamisch in die Seiten geladen.

- `components/header.html` und `components/footer.html` enthalten den Inhalt
- `script.js` lädt die Komponenten per `fetch()` und fügt sie in die entsprechenden Elemente ein
- Vorteil: Änderungen am Header oder Footer müssen nur an einer Stelle gepflegt werden
- Hinweis: Erfordert die Ausführung über einen lokalen Webserver (siehe oben)

### Mehrseitigkeit
- Startseite (`index.html`) mit Ankerlinks zu den einzelnen Sektionen
- Verlinkte Impressums-Unterseite (`impressum.html`) mit gültigen DDG-Pflichtangaben

## Git-Workflow

- **Conventional Commits**: Atomare Commits mit klaren Type-Präfixen (`feat`, `fix`, `refactor`, `docs`, `chore`)
- **Scopes** zur thematischen Einordnung (`nav`, `hero`, `projects`, `career`, `contact`, `footer`, `modal`, `styles`)
- **Tags zur Markierung der Projektphasen**: z. B. `v1.0-phase1` für die abgeschlossene Konzeptionsphase

## Konzept und Wireframes

Vor der Implementierung wurde ein umfassendes Konzept erstellt, das das responsive 
Verhalten, das Gestaltungsraster, die Sitemap sowie detaillierte Wireframes für 
Mobile, Tablet und Desktop beschreibt.

## Status

**Aktueller Stand: Konzeption und HTML/CSS-Phase abgeschlossen.** Das Styling ist responsive über alle drei Geräteklassen umgesetzt. In Vorbereitung: Light-/Darkmode-Funktionalität, finale Asset-Optimierung und Performance-Feinschliff.