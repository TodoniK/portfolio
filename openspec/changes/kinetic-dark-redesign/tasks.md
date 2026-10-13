# Tâches : kinetic-dark-redesign

## 1. Fondations

- [ ] 1.1 Tokens sombres et échelle typographique réduite dans `global.css`. Vérif : build OK, `h1` de l'accueil ≤ 88 px à 2560 px
- [ ] 1.2 `DESIGN.md` et `MOTION.md` réécrits. Vérif : relecture, aucune mention Apple-like restante

## 2. Nettoyage

- [ ] 2.1 Suppression de TargetCursor, `header-dark`, ScrollVelocity et du pin horizontal. Vérif : `rg "tcursor|header-dark|data-velocity|data-hscroll" src` vide
- [ ] 2.2 Suppression des vidéos, tuiles, `BgVideo` et scripts associés. Vérif : `dist/` sans `.webm` ni `.mp4`, build OK

## 3. Composants

- [ ] 3.1 Port Aurora WebGL2 avec repli CSS. Vérif : test Playwright (canvas présent en mouvement normal, absent en mouvement réduit)
- [ ] 3.2 `brands.ts`, logo Astro sourcé, `ProjectThumb.astro`. Vérif : chaque vignette expose les noms de sa stack en `alt`
- [ ] 3.3 Nouvelle `ProjectCard` uniforme. Vérif : capture 390 et 1440 px

## 4. Pages

- [ ] 4.1 Accueil allégé. Vérif : six cartes, manifeste d'une phrase, captures multi-écrans
- [ ] 4.2 Projets, projet, expertise, parcours, contact, 404 et footer adaptés. Vérif : captures, aucune erreur console
- [ ] 4.3 Fiche portfolio mise à jour en FR et EN. Vérif : relecture

## 5. Corrections

- [ ] 5.1 Fil d'Ariane aligné. Vérif : test de ligne de base
- [ ] 5.2 Contenu visible sans script. Vérif : test JavaScript désactivé
- [ ] 5.3 Icônes du site régénérées. Vérif : dimensions contrôlées, inspection visuelle du recadrage circulaire

## 6. Médias et SEO

- [ ] 6.1 Images OG régénérées depuis le gabarit de vignette. Vérif : test HTTP OG, inspection de 2 images
- [ ] 6.2 `theme-color` et `color-scheme` sombres. Vérif : test de métadonnées

## 7. Qualité

- [ ] 7.1 `npm run build` et `npm test` verts (axe WCAG 2.2 AA inclus)
- [ ] 7.2 Lighthouse mobile et desktop : performance ≥ 90, autres catégories à 100
- [ ] 7.3 Captures 320, 390, 768, 1440 et 2560 px relues

## 8. Livraison

- [ ] 8.1 Commits sur `feat/kinetic-dark-redesign`, preview Workers validée par le propriétaire
- [ ] 8.2 Merge sur `main`, archive OpenSpec

## 9. Actions manuelles (propriétaire)

- [ ] 9.1 Ajouter la propriété domaine `julesroyet.dev` dans Search Console et soumettre le sitemap
- [ ] 9.2 Demander l'indexation de `/` pour accélérer le rafraîchissement du titre et du favicon
- [ ] 9.3 Supprimer le projet Vercel et les TXT `_vercel` (reporté depuis `rebuild-portfolio`)
