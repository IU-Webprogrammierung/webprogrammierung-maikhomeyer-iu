# Portfolio Website – Maik Homeyer

Persönlicher Webauftritt mit Schwerpunkt auf semantischem HTML und Barrierefreiheit. Entstanden im Rahmen des Moduls "Projekt: Web Programmierung" an der IU Internationale Hochschule.

## Über das Projekt

Die Website präsentiert mich als UX Designer und dient als zentrale Plattform für berufliche Bewerbungen. Sie ist als One-Pager mit den vier Sektionen "Über mich", "Projekte", "Werdegang" und "Kontakt" aufgebaut. Eine separate Impressums-Unterseite ergänzt den Webauftritt. Detailansichten der Projekte öffnen sich als Modale über der Startseite, ohne den Kontext zu verlassen.

## Technologie-Stack

- **HTML** als semantische Grundstruktur
- **CSS** für Layout und Gestaltung (in Vorbereitung)
- **Git** zur Versionierung des gesamten Quellcodes

## Umgesetzte Features (Phase 1)

### Semantik und Struktur
- Konsequent semantisches Markup (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`, `<dialog>`)
- Saubere Heading-Hierarchie ohne Sprünge
- Definition Lists (`<dl>`, `<dt>`, `<dd>`) für tabellarische Werdegangs-Inhalte
- `<address>`-Element für die Impressums-Adresse

### Barrierefreiheit (WCAG 2.1, WAI-ARIA)
- Skip-Link zum Hauptinhalt für Tastatur-Navigation
- Aussagekräftige `aria-label`-Attribute auf interaktiven Elementen
- `aria-current="page"` zur Kennzeichnung der aktuellen Seite
- Dekorative Elemente mit `aria-hidden="true"` ausgeblendet
- Alt-Texte für alle inhaltlich relevanten Bilder
- Logo-Link mit klarer Funktionsangabe für Screenreader

### Modal-Steuerung
- Native `<dialog>`-Elemente für Projekt-Detailansichten
- Steuerung über die **Invoker Commands API** (`commandfor` / `command`-Attribute) — vollständig deklarativ ohne JavaScript
- `closedby="any"` für intuitives Schließen via Backdrop-Klick oder Esc-Taste
- Automatischer Focus-Trap durch native Browser-API

### Mehrseitigkeit
- Startseite (`index.html`) mit Ankerlinks zu den einzelnen Sektionen
- Verlinkte Impressums-Unterseite (`impressum.html`) mit gültigen DDG-Pflichtangaben

## Git-Workflow

- **Conventional Commits**: Atomare Commits mit klaren Type-Präfixen (`feat`, `fix`, `refactor`, `docs`, `chore`)
- **Tags zur Markierung der Projektphasen**: z.B. `v1.0-phase1` für die abgeschlossene Konzeptionsphase

## Konzept und Wireframes

Vor der Implementierung wurde ein umfassendes Konzept erstellt, das das responsive 
Verhalten, das Gestaltungsraster, die Sitemap sowie detaillierte Wireframes für 
Mobile, Tablet und Desktop beschreibt.

## Status

**Aktueller Stand: Konzeptions- und HTML-Phase abgeschlossen.** Die CSS-Phase mit responsivem Layout, visueller Gestaltung und Light-/Darkmode-Switch ist in Vorbereitung.