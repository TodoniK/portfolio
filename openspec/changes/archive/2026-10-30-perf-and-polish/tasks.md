# Tâches : perf-and-polish

## 1. Performance

- [x] 1.1 Vapeur Casa Mocha au survol seulement. Vérif : test, moins de 10 mises en page en 2 s à l'arrêt sur `/about`
- [x] 1.2 Lenis et GSAP retirés, effets en CSS et IntersectionObserver. Vérif : `rg "gsap|lenis" src package.json` vide, build OK
- [x] 1.3 Intro sans flou, première page de session seulement. Vérif : `rg "blur\(12px\)" src` vide
- [x] 1.4 Boucles bornées ou composées (shiny, ping, dégradé). Vérif : relecture `global.css`
- [x] 1.5 TextPressure et Magnet sans mise en page forcée. Vérif : boucle 404 arrêtée au repos

## 2. Correctifs visuels

- [x] 2.1 Mot qui défile lettre par lettre, dégradé continu sous WebKit. Vérif : capture WebKit
- [x] 2.2 Pastilles carrées. Vérif : test sur les 10 vignettes
- [x] 2.3 Memoji du header recadré et net. Vérif : capture
- [x] 2.4 Photo réelle sur Parcours, sans survol. Vérif : capture, alt dans les trois langues

## 3. Clôture

- [x] 3.1 Build, tests, Lighthouse, mesure du défilement de l'accueil. Vérif : tous verts, 60 i/s
- [x] 3.2 `MOTION.md`, `DESIGN.md`, archivage
