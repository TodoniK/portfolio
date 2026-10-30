# DESIGN.md : sombre ou clair, minimal, cinétique

## Visual Thesis

Un fond presque noir (ou presque blanc en thème clair), une seule police, peu d'éléments par écran. La couleur vient d'un seul endroit : le dégradé bleu, violet, rose de l'Aurora, rappelé en touches (puces, ligne du parcours, mot qui défile). Le memoji porte la personnalité. Les projets se lisent d'un coup d'œil grâce aux logos de leur stack.

## References

- React Bits, porté en TypeScript natif sans runtime React : Aurora, BlurText, RotatingText, ShinyText, StarBorder, SpotlightCard, GlareHover, Magnet, LogoLoop, CountUp, ScrollReveal, TextPressure.
- Linear et Vercel pour la retenue des surfaces sombres et des bordures fines.

## Typography Scale & Roles

| Rôle | Famille | Réglages |
|---|---|---|
| Hero | Inter Variable | 650, `clamp(2.6rem, 1.6rem + 4.6vw, 5.5rem)`, -0.05em |
| Titres de section | Inter | 600, `clamp(1.9rem, 1.4rem + 2.2vw, 2.75rem)`, -0.035em |
| Sous-titres | Inter | 600, 20 à 24 px |
| Corps | Inter | 400, 16 à 17 px, interlignage 1.55 |
| Méta, eyebrow | Inter | 500, 12 à 14 px, gris secondaire, puce en dégradé |

Une seule police (56 Ko). Aucune monospace.

## Color Roles

Chaque token est déclaré une fois avec `light-dark(clair, sombre)`. Le thème suit le système, le bouton du header force `data-theme` (mémorisé dans `localStorage`, appliqué avant le premier rendu).

| Token | Sombre | Clair | Rôle |
|---|---|---|---|
| `--bg` | `#0A0A0B` | `#FBFBFD` | fond |
| `--card` | `#141416` | `#FFFFFF` | cartes, vignettes |
| `--fg` | `#F5F5F7` | `#1D1D1F` | texte principal, bouton plein |
| `--fg-2` | `#A1A1A6` | `#5F5F66` | texte secondaire (AA) |
| `--fg-3` | `#6E6E73` | `#8E8E93` | décor et grands textes seulement |
| `--line` / `--line-2` | blanc 8 % / 16 % | noir 9 % / 18 % | bordures, séparateurs |
| `--link` | `#6CB6FF` | `#0062C4` | liens dans le texte |
| `--wash` | `--fg` à 5 % | idem | survols discrets |
| Dégradé | `#0090F7 → #BA62FC → #F2416B` | Aurora, puces, ligne du parcours, mot du hero, halos des vignettes |

Le halo des vignettes suit l'expertise principale : bleu pour Cloud et DevOps, violet pour Systèmes IA, rose pour Développement logiciel.

## Header

- Sélecteur de langue sans bordure : globe et code (FR, EN, ES), menu en popover ancré. Dans le menu mobile, les trois langues en bas.
- Bouton de thème (soleil, lune) à côté.
- Bandeau de suggestion en bas à droite quand la langue du navigateur diffère de la page, jamais de redirection.

## Layout & Grid

- Mobile-first, contenu max 1200 px. Sections `clamp(4rem, 8vw, 6rem)`.
- Projets : grille uniforme de 1, 2 puis 3 colonnes, toutes les cartes à la même taille.

## Surfaces & Elevation

- Rayons : 22 px pour les cartes, 16 px pour les vignettes, pilule pour les boutons et les puces.
- Bordure 1 px blanche à 8 %, qui s'éclaire au survol. Pas d'ombre portée sur les cartes.
- Verre sombre flouté réservé au header, au menu mobile et au voile de transition.

## Media

- Photo réelle (celle du CV) sur la page Parcours, recadrée en 4:5 sur l'axe du visage et du buste, sans effet. Source 342 × 427 px, affichée en 20 rem au plus.
- Textes longs (bio, études de cas) : accroche courte, paragraphes de deux phrases au plus, mesure de 38 rem, interligne 1,7.
- Memoji : header (avec une marge dans le disque), hero, splash, 404, favicon (disque sombre, marge de sécurité pour le recadrage circulaire de Google) et images OG.
- Vignettes de projets rendues en code (`ProjectThumb.astro`) : nom court et 3 à 5 logos officiels sur des pastilles claires, ou sombres pour les logos dessinés en blanc. Les sources des logos sont tracées dans `src/assets/brands/sources.json`.
- Aucune vidéo.

## Do and Don't

**Do** : une idée par section, des chiffres réels, les logos plutôt que des visuels abstraits.

**Don't** : titres géants, plusieurs couleurs d'action, dégradés en aplat sur le texte courant, curseur personnalisé, animations qui masquent le contenu.
