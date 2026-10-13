# Design : kinetic-dark-redesign

## Context

Site Astro 7 statique sur Cloudflare Workers. Composants React Bits déjà portés en TypeScript natif. Le propriétaire a choisi le 2026-10-13 : fond Aurora, thème sombre dominant, curseur natif, suppression de toutes les vidéos, vignettes rendues en code.

## Decisions

### Thème sombre unique
Un seul jeu de tokens sombres sur `:root` (`color-scheme: dark`). Il n'y a plus de sections `.dark` ni de bascule du header. Cela supprime la cause du header resté noir et la logique `header-dark`.

Contrastes visés : texte secondaire `#A1A1A6` sur `#0A0A0B` (7,6:1), liens `#5AB0FF` (8:1).

### Aurora en WebGL2 brut
Le shader de React Bits est repris tel quel. OGL n'est pas utilisé : un triangle plein écran suffit.

Le module est importé dynamiquement après l'événement `load` et quand le navigateur est inactif. Il n'est jamais chargé dans ces cas :
- `prefers-reduced-motion`
- `Save-Data`
- WebGL2 absent

Une fois chargé :
- La DPR est plafonnée à 1, et à 0,75 sur mobile, car le dégradé est flou par nature.
- La boucle s'arrête hors écran et quand l'onglet est caché.

Le repli est un dégradé radial CSS aux mêmes couleurs, peint dès le premier rendu. Le canvas apparaît en fondu par-dessus. Il n'y a aucun impact LCP ni CLS.

Alternative écartée : vidéo pré-rendue, plus lourde et non interactive.

### Vignettes en code (`ProjectThumb.astro`)
Gabarit unique 16:10 :
- fond `#141416` et halo teinté selon l'expertise principale
- nom court du projet
- 3 à 5 logos officiels sur des pastilles claires, pour que les logos monochromes noirs restent lisibles

Les logos sont des `<img>` avec un `alt` égal au nom de l'outil. La liste par projet et les libellés vivent dans `src/data/brands.ts`, partagé avec LogoLoop.

Les images OG restent des JPEG : `og.mjs` capture ce même gabarit.

Alternative écartée : PNG générés, plus lourds et à régénérer à chaque changement.

### Contenu visible par défaut
`.reveal` n'est masqué que sous `html.motion`, une classe posée par `app.ts` au moment où l'observateur démarre. Sans script, ou si le script échoue, tout reste visible. Les robots et moteurs IA voient donc le contenu complet.

### Icônes du site
Les icônes sont régénérées depuis `memoji.png` par sharp, avec un script versionné :
- un disque sombre et une marge de sécurité, pour que le recadrage circulaire de Google ne coupe pas le visage
- `favicon.ico` en 16, 32 et 48 px
- PNG en 48, 96, 192 et 512 px, plus une variante `maskable` séparée avec une zone sûre de 80 %

## Risks / Trade-offs

- **WebGL sur mobiles d'entrée de gamme.** Atténuation : demi-résolution, pause hors écran, repli CSS.
- **Rafraîchissement par Google.** Le favicon et le titre affichés dépendent du recrawl, cela prend des semaines et sort de notre contrôle.
- **Fin des vidéos.** Les visuels des pages expertise deviennent des logos et du texte. C'est assumé.
