# MOTION.md — Control Plane

## Narrative Role of Motion

Le mouvement raconte un déploiement : démarrage (splash), mise en service des sections (pending → healthy), trafic qui circule (fond vidéo, filets qui se tracent). Il guide l'ordre de lecture et ne cache jamais le contenu.

## Scroll Experience

- Défilement doux Lenis sur pointeur fin uniquement, natif au tactile.
- Hero : en scrollant, le nom se compresse (`wdth 125 → 62`) et la vidéo se rétracte dans un cadre de 4 px de rayon (scrub GSAP).
- Manifeste : révélation par groupes de trois mots, opacité 0.14 → 1, scrubée.
- Expertises : panneau épinglé à défilement horizontal sur desktop (≥ 1024 px), cartes empilées en `position: sticky` sur mobile.
- Parcours : la ligne du journal se trace avec la progression, chaque entrée passe à l'état `healthy`.
- Entrées génériques : `animation-timeline: view()` quand supporté, sinon IntersectionObserver.

## Hero Video Behavior

- Boucle 8 s, 16:9 desktop et 9:16 mobile via `<source media>`, WebM AV1 puis MP4 H.264, poster AVIF prioritaire pour le LCP.
- `muted playsinline loop`, lancée après le chargement, mise en pause hors écran, bouton pause visible (WCAG 2.2.2).
- Non téléchargée sous mouvement réduit ou `Save-Data`.

## Transitions

- Splash : journal de démarrage de 4 lignes, 1,1 s max, première visite de la session uniquement. Le contenu est rendu dessous.
- Changement de page : rideau encre qui monte (380 ms, `cubic-bezier(.7,0,.2,1)`) avec la route cible en mono et une barre de progression, puis redescend sur la nouvelle page (420 ms). Pages préchargées au survol.
- 404 : traceroute qui s'imprime ligne par ligne puis `* * *` et le chiffre 404 qui se compose.

## Micro-interactions

- Curseur : point 6 px + anneau 36 px en `mix-blend-mode: difference`, interpolation ressort. Au survol d'un lien l'anneau grossit, sur une carte projet il affiche « Ouvrir ».
- Boutons : soulignement qui se trace de gauche à droite, flèche qui se décale de 4 px.
- Cartes : la tuile se zoome à 1.04, l'état passe en `healthy`.
- Copie d'e-mail : retour textuel annoncé via `aria-live`.

## Fallback prefers-reduced-motion

Sous `reduce` : pas de splash, pas de rideau, pas de Lenis, pas de scrub, pas de vidéo (poster seul), pas de curseur personnalisé. Tout le contenu est visible immédiatement. Les états de survol restent en changement de couleur instantané.

## Performance Budget

- Uniquement `transform`, `opacity`, `clip-path` et `font-variation-settings` sur l'élément hero.
- JS avant interaction sur l'accueil < 80 Ko compressés, GSAP chargé après le premier rendu.
- Aucune tâche longue > 50 ms au chargement, vidéos < 2 Mo, 60 fps visés sur un téléphone milieu de gamme.
