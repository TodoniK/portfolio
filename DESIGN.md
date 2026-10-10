# DESIGN.md — Control Plane

## Visual Thesis

Le site se lit comme le plan de contrôle d'une infrastructure saine : du papier clair, de l'encre, une grille de précision et une seule couleur de signal. La typographie large et mécanique porte l'identité, les données en monospace prouvent le sérieux. Chaque section « démarre » comme un service : elle passe de pending à healthy quand on l'atteint.

## References

- Interfere (interfere.com/blog/how-we-built-interferes-new-website) : entrée hero flou + opacité + translation, diagrammes SVG animés par `stroke-dashoffset`.
- rauno.me : titres révélés ligne par ligne, rigueur de la grille.
- jhey.dev : animations pilotées par le scroll en CSS pur, amélioration progressive.
- Galeries designeer.xyz : 60fps.design, Hover States, Landing Love, Sombra pour l'alternance de sections sombres.
- Fond vidéo : boucle motion design maison (topologie de nœuds et paquets), rendue en code.

## Typography Scale & Roles

| Rôle | Famille | Réglages |
|---|---|---|
| Display (nom, titres de section) | Archivo Variable | `wght 760-860`, `wdth 62-125` animé, interlignage 0.88, approche -0.03em |
| Titres H2/H3 | Archivo Variable | `wght 640`, `wdth 100`, interlignage 1.05 |
| Corps | Archivo Variable | `wght 400`, `wdth 100`, 1.0625rem mobile / 1.125rem desktop, interlignage 1.55, mesure 62ch |
| Données, kickers, labels | JetBrains Mono Variable | `wght 450`, 0.75-0.8125rem, capitales, approche +0.06em |

Échelle fluide : `--step-0` à `--step-6` en `clamp()` (Utopia, 360 → 1440 px, ratio 1.2 → 1.333). Le display hero atteint `clamp(3.4rem, 15vw, 13rem)`.

## Color Roles

| Token | Hex | Rôle unique |
|---|---|---|
| `--paper` | `#F1EEE6` | fond des sections claires |
| `--paper-2` | `#E7E2D6` | surfaces surélevées sur papier |
| `--ink` | `#0F1011` | fond des sections sombres, texte principal sur papier |
| `--ink-2` | `#1A1C1E` | surfaces sur encre |
| `--muted` | `#5C5A54` | texte secondaire sur papier (contraste 6.1:1) |
| `--muted-ink` | `#A3A099` | texte secondaire sur encre (contraste 7.4:1) |
| `--rule` | `#D2CCBE` / `#2A2D30` | filets et grille |
| `--signal` | `#FF4F1A` | accent unique sur encre, focus, curseur |
| `--signal-text` | `#B83A0C` | accent texte sur papier (contraste 5.3:1) |
| `--healthy` | `#1F7A4D` / `#3FCF8E` | statut « healthy » uniquement |

Aucun dégradé décoratif. Le seul flou autorisé est la barre de navigation en verre dépoli (`backdrop-filter: blur(14px)`) et l'entrée hero.

## Layout & Grid

- Mobile-first, 4 colonnes sous 720 px, 12 colonnes au-delà, gouttière `clamp(1rem, 2.5vw, 1.5rem)`.
- Largeur max du contenu 1440 px, texte courant limité à 62ch.
- Marges de page `clamp(1.25rem, 5vw, 4rem)`. Rythme vertical des sections `clamp(5rem, 14vw, 11rem)`.
- Alternance encre / papier pour rythmer l'accueil, jamais deux sections identiques à la suite.
- Chaque section commence par une ligne mono `NN — NOM · état`.

## Surfaces & Elevation

- Pas d'ombres portées. La hiérarchie passe par les filets de 1 px, la grille et l'inversion encre/papier.
- Rayon unique `--radius: 4px` pour cartes, boutons et médias. Les pastilles d'état sont les seuls éléments arrondis à 999px.
- Grain léger (SVG `feTurbulence`, 4 % d'opacité) sur les sections encre.

## Media & Photography

- Portraits en noir et blanc légèrement contrastés, cadrés serrés, filet 1 px.
- Tuiles de projets générées : composition commune (numéro, nom de code, glyphe topologique unique par projet, capture réelle dans un cadre navigateur quand elle existe).
- Vidéos : boucles sans coupe, sombres, sans texte, pour laisser la typographie dominer.

## Do and Don't

**Do**
- Données réelles en mono (périodes, stack, métriques).
- Une seule couleur de signal, utilisée pour l'action et l'état.
- Liens dans le texte avec ancres descriptives.

**Don't**
- Pas de pastilles colorées au-dessus de chaque titre, pas de dégradés violets ou néon.
- Pas de cartes aux coins très arrondis interchangeables.
- Pas d'animation qui retarde la lecture du contenu.
- Pas de texte en orange `#FF4F1A` sur papier.
