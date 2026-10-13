# Tâches : kinetic-dark-redesign

## 1. Fondations

- [x] 1.1 Tokens sombres et échelle typographique réduite dans `global.css`. Vérif : build OK, `h1` de l'accueil ≤ 88 px à 2560 px
- [x] 1.2 `DESIGN.md` et `MOTION.md` réécrits. Vérif : relecture, aucune mention Apple-like restante

## 2. Nettoyage

- [x] 2.1 Suppression de TargetCursor, `header-dark`, ScrollVelocity et du pin horizontal. Vérif : `rg "tcursor|header-dark|data-velocity|data-hscroll" src` vide
- [x] 2.2 Suppression des vidéos, tuiles, `BgVideo` et scripts associés. Vérif : `dist/` sans `.webm` ni `.mp4`, build OK

## 3. Composants

- [x] 3.1 Port Aurora WebGL2 avec repli CSS. Vérif : test Playwright (canvas présent en mouvement normal, absent en mouvement réduit)
- [x] 3.2 `brands.ts`, logo Astro sourcé, `ProjectThumb.astro`. Vérif : chaque vignette expose les noms de sa stack en `alt`
- [x] 3.3 Nouvelle `ProjectCard` uniforme. Vérif : capture 390 et 1440 px

## 4. Pages

- [x] 4.1 Accueil allégé. Vérif : six cartes, manifeste d'une phrase, captures multi-écrans
- [x] 4.2 Projets, projet, expertise, parcours, contact, 404 et footer adaptés. Vérif : captures, aucune erreur console
- [x] 4.3 Fiche portfolio mise à jour en FR et EN. Vérif : relecture

## 5. Corrections

- [x] 5.1 Fil d'Ariane aligné. Vérif : test de ligne de base
- [x] 5.2 Contenu visible sans script. Vérif : test JavaScript désactivé
- [x] 5.3 Icônes du site régénérées. Vérif : dimensions contrôlées, inspection visuelle du recadrage circulaire

## 6. Médias et SEO

- [x] 6.1 Images OG régénérées depuis le gabarit de vignette. Vérif : test HTTP OG, inspection de 2 images
- [x] 6.2 `theme-color` et `color-scheme` sombres. Vérif : test de métadonnées

## 7. Qualité

- [x] 7.1 `npm run build` et `npm test` verts (axe WCAG 2.2 AA inclus)
- [x] 7.2 Lighthouse mobile et desktop : performance ≥ 90, autres catégories à 100. Mesuré le 2026-10-13 en local : mobile 98 à 99, desktop 100, accessibilité et SEO 100. Bonnes pratiques à 96 en local à cause du CORS du beacon analytics sur 127.0.0.1, à revérifier sur la preview
- [x] 7.3 Captures 390 et 1440 px relues sur 6 pages. Débordement horizontal nul à 320, 768 et 2560 px. Taille des titres contrôlée à 2560 px par test

## 8. Livraison

- [ ] 8.1 Commits sur `feat/kinetic-dark-redesign`, preview Workers validée par le propriétaire
- [ ] 8.2 Merge sur `main`, archive OpenSpec

## 9. Actions manuelles (propriétaire)

- [ ] 9.1 Ajouter la propriété domaine `julesroyet.dev` dans Search Console et soumettre le sitemap
- [ ] 9.2 Demander l'indexation de `/` pour accélérer le rafraîchissement du titre et du favicon
- [ ] 9.3 Supprimer le projet Vercel et les TXT `_vercel` (reporté depuis `rebuild-portfolio`)
