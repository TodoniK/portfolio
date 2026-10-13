# MOTION.md : sombre, minimal, cinétique

## Narrative Role of Motion

Le mouvement donne vie au texte et au fond, jamais au détriment de la lecture. Le nom apparaît lettre par lettre, la phrase du hero change de mot, le manifeste s'allume pendant la lecture. Le reste est discret : survols, lumière qui suit le pointeur, logos qui se soulèvent.

## Backdrop

- **Desktop** : Aurora (React Bits) en WebGL2 natif dans le hero. Le module est chargé après `load`, quand le navigateur est inactif. La compilation du shader est parallèle (`KHR_parallel_shader_compile`), le rendu se fait à 60 % de la taille CSS, et la boucle s'arrête hors écran ou quand l'onglet est caché. La lueur se déplace en suivant le pointeur.
- **Tactile, Save-Data, rendu logiciel (SwiftShader, llvmpipe)** : le dégradé CSS aux mêmes couleurs dérive lentement (16 s), en `transform` uniquement.
- **Bandeau de contact** : écho statique du dégradé, sans WebGL.

## Scroll Experience

- Lenis sur pointeur fin, défilement natif au tactile.
- Hero : le texte remonte et s'efface en quittant l'écran.
- Manifeste : groupes de trois mots qui passent du gris au blanc (couleur, pas opacité).
- Titres : mots qui montent d'un masque.
- Cartes : apparition au défilement, uniquement pour les éléments sous la ligne de flottaison. Sans script, tout est visible.
- Journal : la ligne en dégradé se trace avec la progression. Chiffres : comptage unique.

## Transitions

- Splash, première visite : memoji puis « Bonjour / Hello / Hola », 1,7 s au total, le contenu est rendu dessous.
- Changement de page : voile sombre flouté avec memoji, nom de la destination et barre en dégradé (340 ms), puis fondu.

## Micro-interactions

- Curseur natif partout.
- Memoji : suit le pointeur en 3D, fait signe au clic avec une bulle.
- StarBorder sur le CTA principal, ShinyText sur la pastille de statut.
- Boutons magnétiques, pression à 0,97.
- Cartes : SpotlightCard, bordure qui s'éclaire, élévation de 2 px. Vignettes : reflet GlareHover et logos qui se soulèvent en cascade.
- 404 : la graisse des chiffres suit le pointeur (TextPressure).

## Fallback prefers-reduced-motion

Pas de splash, pas de voile, pas de Lenis, pas de scrub, pas d'Aurora ni de dérive du dégradé, pas de rotation de mots. Tout est visible immédiatement.

## Performance Budget

- Seules les propriétés `transform`, `opacity`, `filter` et `color` sont animées. Le hero et le memoji n'ont pas d'opacité de départ, car ils sont l'élément LCP.
- JS avant interaction sur l'accueil : environ 4 Ko gzip. GSAP et Lenis (49 Ko) se chargent au repos, Aurora (4 Ko) après `load`.
- Pas de runtime React : les composants React Bits sont portés en TypeScript natif.
