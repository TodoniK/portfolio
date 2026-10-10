# MOTION.md — Kinetic, Apple-like

## Narrative Role of Motion

Le texte bouge pour être lu : le nom apparaît lettre par lettre, la phrase du hero change de mot, le manifeste s'allume au fil de la lecture. Le mouvement reste doux (ressorts légers), jamais gratuit.

## Scroll Experience

- Lenis sur pointeur fin, défilement natif au tactile.
- Hero : le texte s'efface vers le haut, l'écran vidéo grandit (0.86 → 1) et ses coins se resserrent.
- ScrollVelocity : deux bandeaux de mots en sens opposé, accélérés par la vitesse de scroll.
- Manifeste : groupes de trois mots qui passent du gris au noir (couleur, pas opacité, pour le contraste AA).
- Titres : mots qui montent d'un masque. Cartes : apparition par IntersectionObserver.
- Expertises : piste horizontale épinglée sur desktop, liste empilée sur mobile.
- Journal : la ligne bleue se trace avec la progression. Chiffres : comptage unique.

## Hero Video Behavior

- Poster AVIF prioritaire, vidéo WebM AV1 / MP4 H.264 attachée après le chargement, en pause hors écran, bouton pause visible.
- Non chargée sous mouvement réduit ou Save-Data.

## Transitions

- Splash, première visite : memoji qui apparaît puis « Bonjour / Hello / Hola », environ 2 s, le contenu est rendu dessous.
- Changement de page : voile blanc dépoli avec memoji, nom de la destination et barre de progression bleue (340 ms), puis fondu à l'arrivée.

## Micro-interactions

- TargetCursor : quatre crochets qui tournent au repos et se verrouillent sur les liens, boutons et cartes, avec un libellé (« Ouvrir », « Me faire signe »). Pointeur fin uniquement, en `difference`.
- Memoji : suit le pointeur en 3D, fait signe au clic avec une bulle « Salut ! ».
- Boutons magnétiques, pression à 0.97 au clic. Cartes : lumière qui suit le pointeur, légère élévation.
- 404 : la graisse des chiffres suit le pointeur ou le doigt (TextPressure).

## Fallback prefers-reduced-motion

Pas de splash, pas de voile, pas de Lenis, pas de scrub, pas de vidéo, pas de curseur personnalisé, pas de rotation de mots. Tout est visible immédiatement.

## Performance Budget

- Uniquement `transform`, `opacity`, `filter` et `color` animés. Hero sans opacité de départ (LCP).
- Pas de runtime React : les composants React Bits sont portés en TypeScript natif.
- GSAP et Lenis chargés en différé, au repos du navigateur.
