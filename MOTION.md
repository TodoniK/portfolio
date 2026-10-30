# MOTION.md : sombre, minimal, cinétique

## Narrative Role of Motion

Le mouvement donne vie au texte et au fond, jamais au détriment de la lecture. Le nom apparaît lettre par lettre à la première page de la session, la phrase du hero change de mot, le manifeste s'allume pendant la lecture. Le reste est discret : survols, lumière qui suit le pointeur, logos qui se soulèvent.

## Backdrop

- **Desktop** : Aurora (React Bits) en WebGL2 natif dans le hero. Le module est chargé après `load`, quand le navigateur est inactif. La compilation du shader est parallèle (`KHR_parallel_shader_compile`), le rendu se fait à 60 % de la taille CSS, et la boucle s'arrête hors écran ou quand l'onglet est caché. La lueur se déplace en suivant le pointeur.
- **Tactile, Save-Data, rendu logiciel (SwiftShader, llvmpipe)** : le dégradé CSS aux mêmes couleurs dérive lentement (16 s), en `transform` uniquement.
- **Bandeau de contact** : écho statique du dégradé, sans WebGL.

## Scroll Experience

Défilement natif partout (Lenis retiré : son lissage se ressentait comme du retard). Aucune bibliothèque d'animation : les effets liés au défilement sont des animations CSS pilotées par `animation-timeline`, exécutées par le navigateur hors du thread principal. Sans prise en charge (Firefox), le contenu reste statique et lisible.

- Hero : le texte remonte et s'efface en quittant l'écran (`view-timeline` du hero, plage `exit`).
- Manifeste : groupes de trois mots, rendus côté serveur, qui passent du gris au blanc (couleur, pas opacité).
- Titres : mots qui montent d'un masque, une fois, déclenchés par `IntersectionObserver`.
- Cartes : apparition au défilement, uniquement pour les éléments sous la ligne de flottaison. Sans script, tout est visible.
- Journal : la ligne en dégradé se trace avec la progression. Chiffres : comptage unique en `requestAnimationFrame`.

## Transitions

- Première page de la session : splash, puis le nom et les titres montent en place (transform et opacité, sans flou). Les pages suivantes, y compris après un changement de langue, s'affichent directement.
- Splash, première visite : memoji puis trois salutations (celle de la page en dernier), 1,3 s au total, opacité et transform uniquement, le contenu est rendu dessous.
- Changement de page : View Transitions natives entre documents (fondu de 220 ms, header fixe), aucun délai ajouté par script. Bascule de thème en View Transition.

## Micro-interactions

- Curseur natif partout.
- Mot du hero : lettres qui sortent une à une puis entrent avec un ressort, la largeur suit. Chaque lettre porte sa part du dégradé (décalage calculé), ce qui le garde continu sous WebKit.
- Memoji : s'incline vers le pointeur (18° max), fait signe au clic avec une bulle. Le signe en cours se termine avant d'en rejouer un, sans filtre ni mise à l'échelle sur l'image (netteté).
- StarBorder sur le CTA principal, ShinyText sur la pastille de statut (trois passages puis arrêt), point vert qui pulse en transform.
- Boutons magnétiques, pression à 0,97.
- Cartes : SpotlightCard, bordure qui s'éclaire, élévation de 2 px. Vignettes : reflet GlareHover et logos qui se soulèvent en cascade.
- 404 : la graisse des chiffres suit le pointeur (TextPressure), la boucle s'arrête au repos.
- Crédit Casa Mocha : la vapeur ne s'anime qu'au survol (une animation SVG infinie relançait la mise en page à chaque image).

## Fallback prefers-reduced-motion

Pas de splash, pas de View Transition, pas d'effet lié au défilement, pas d'Aurora ni de dérive du dégradé, pas de rotation de mots. Tout est visible immédiatement.

## Performance Budget

- Seules les propriétés `transform`, `opacity` et `color` sont animées, plus la largeur du mot du hero. Pas de filtre animé. Les lettres de l'intro partent d'une opacité de 0,01, jamais 0, pour compter comme peintes dans le LCP.
- Aucune boucle décorative ne doit recalculer la mise en page au repos (test Playwright sur les métriques Chromium).
- JS total : environ 5 Ko gzip, plus Aurora (4 Ko) après `load` sur l'accueil desktop.
- Pas de runtime React : les composants React Bits sont portés en TypeScript natif.
