# Proposition : perf-and-polish

## Why

Retours du propriétaire le 2026-10-30, confirmés par mesure (Chromium, build de production) :

- Le site paraît lent. Le crédit Casa Mocha force 60 recalculs de mise en page par seconde sur toutes les pages, Lenis retarde volontairement le défilement, GSAP (49 Ko gzip) est rechargé à chaque page et l'accueil descend à 43 images/s au défilement.
- Les apparitions de texte animent un flou lettre par lettre, rejoué à chaque page et à chaque changement de langue.
- Pastilles de logos étirées sur Shopeen et IP Locator (logo MongoDB plus haut que large).
- Memoji du header trop gros et flou.
- Page Parcours : la vraie photo du CV doit remplacer les illustrations, sans effet au survol.
- Mot qui défile : l'ancien effet lettre par lettre était préféré.

## What Changes

- Vapeur Casa Mocha animée au survol seulement.
- **BREAKING** : suppression de Lenis et GSAP. Les effets liés au défilement passent en animations CSS pilotées par le défilement (`animation-timeline`), les effets uniques par `IntersectionObserver`.
- Intro du nom et des titres sans flou, jouée seulement à la première page de la session.
- Boucles décoratives bornées ou composées par le GPU.
- Mot qui défile lettre par lettre, chaque lettre portant sa part du dégradé (compatible WebKit).
- Pastilles carrées quelle que soit la forme du logo. Memoji du header recadré, source jusqu'en 3x.
- Photo réelle sur la page Parcours.
- TextPressure (404) et Magnet sans lectures et écritures de mise en page entrelacées.

## Capabilities

### Modified Capabilities

- `site-experience` : mouvement, performance, page Parcours.
- `media-pipeline` : vignettes.

## Impact

- Dépendances retirées : `gsap`, `lenis`.
- Code : `global.css`, `app.ts`, `motion.ts` (supprimé), `Home.astro`, `PageHero.astro`, `Footer.astro`, `Header.astro`, `Portrait.astro`, `ProjectThumb.astro`, `Rotator.astro`, `Base.astro`, `site.ts`.
- Assets : `jules-base.webp` et `jules-hey.webp` supprimés, `jules.png` ajouté.
