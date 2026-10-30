# Tâches : polish-i18n-theme

## 1. Dépendances

- [x] 1.1 Toutes les dépendances en dernière version compatible, `npm audit` propre. Vérif : `npm outdated` ne liste que TypeScript 7, `npm audit` à 0
- [x] 1.2 Dependabot (npm + GitHub Actions, groupés, cooldown) et job d'auto-merge après CI verte, `renovate.json` supprimé. Vérif : YAML valide, `allowScripts` sans version épinglée

## 2. Correctifs

- [x] 2.1 Mot du hero visible sous WebKit. Vérif : capture Playwright WebKit, le mot a une largeur non nulle et une couleur de fond clipée
- [x] 2.2 Memoji net, sans déformation, clic sans saut. Vérif : `srcset` jusqu'à 3x, plus de `drop-shadow` sur l'image, une seule règle d'animation au clic
- [x] 2.3 Journal : logos au-dessus de la ligne, plus de `<span>` dans `<ol>`. Vérif : capture, axe sans erreur
- [x] 2.4 Splash et transitions sans flou plein écran ni délai JS. Vérif : `rg "jr-nav|is-leaving" src` vide, `@view-transition` présent

## 3. Thème

- [x] 3.1 Tokens clairs, `data-theme` posé avant le premier rendu, bouton dans le header. Vérif : test Playwright (bascule, persistance, contraste axe en clair et en sombre)

## 4. Langues

- [x] 4.1 Sélecteur de langue sans bordure (FR, EN, ES). Vérif : capture header 390 et 1440 px
- [x] 4.2 Contenus espagnols (`dictionary.ts`, `projects-data.ts`, `expertises.ts`, `site.ts`). Vérif : `astro check` sans erreur
- [x] 4.3 Pages `/es`, hreflang, sitemap, llms, OG. Vérif : tests routes à 200 sur les trois langues
- [x] 4.4 Bandeau de suggestion de langue. Vérif : test Playwright avec `locale: es-ES` sur `/`

## 5. Logos

- [x] 5.1 Hermes Agent, Docker, Traefik officiels et à jour, Oracle centré, `sources.json` à jour. Vérif : sha256 conformes, capture des vignettes

## 6. Clôture

- [x] 6.1 `npm run build`, `npm test`, Lighthouse accueil. Vérif : tous verts
- [x] 6.2 Docs (`DESIGN.md`, `MOTION.md`, `DECISIONS.md`) et archivage OpenSpec
