# DESIGN.md — Minimal, Apple-like, kinetic

## Visual Thesis

Beaucoup de blanc, une typographie qui fait tout le travail, du mouvement qui donne vie au texte. Le memoji porte la personnalité, la rigueur d'ingénieur passe par des chiffres réels et des visuels produits sobres. Les sections noires servent de « scène » pour les contenus techniques, comme les pages produit d'Apple.

## References

- apple.com (pages produit iPhone et Mac) : rythme blanc / gris clair / noir, titres très serrés, bento à grands rayons, nav en verre dépoli, liens « En savoir plus › ».
- React Bits, portés en TypeScript natif sans runtime React : TargetCursor, RotatingText, ScrollVelocity, TextPressure, SpotlightCard, Magnet, LogoLoop, CountUp, BlurText, ScrollReveal.
- Interfere (entrée floue du hero), jhey.dev (amélioration progressive).

## Typography Scale & Roles

| Rôle | Famille | Réglages |
|---|---|---|
| Hero | Inter Variable (axe optique) | 700, `clamp(3.4rem, 1rem + 11vw, 9.5rem)`, approche -0.055em, lettre par lettre |
| Titres de section | Inter | 650, `clamp(2.5rem, 1.4rem + 4.8vw, 5rem)`, -0.035em, interlignage 1.04 |
| Sous-titres / eyebrow | Inter | 600, 19 à 24 px, gris secondaire ou bleu lien |
| Corps | Inter | 400 à 450, 17 à 19 px, interlignage 1.47, -0.011em |
| Petits textes | Inter | 12 à 14 px, footer et légendes |

Une seule police (56 Ko, sous-ensemble latin). Aucune monospace.

## Color Roles

| Token | Hex | Rôle |
|---|---|---|
| `--white` | `#FFFFFF` | fond principal |
| `--gray-1` | `#F5F5F7` | sections teintées, cartes sur blanc |
| `--black` | `#1D1D1F` | texte principal |
| `--gray-5` | `#6E6E73` | texte secondaire (4.9:1) |
| `--gray-4` | `#86868B` | grands textes décoratifs seulement |
| `--blue` | `#0071E3` | boutons pleins |
| `--blue-link` | `#0066CC` | liens et eyebrows sur clair (5.6:1) |
| `--blue-dark` | `#2997FF` | liens sur noir |
| Sections sombres | `#000000` / `#1D1D1F` | scènes vidéo, cartes sombres |
| Dégradé | `#0090F7 → #BA62FC → #F2416B → #F55600` | mot qui défile du hero et 404, jamais en aplat |

## Layout & Grid

- Mobile-first, contenu max 1200 px (1440 px pour l'écran vidéo et les couvertures).
- Hero centré, le reste aligné à gauche. Sections `clamp(5.5rem, 13vw, 10rem)`.
- Bento : grille 1 / 2 / 3 colonnes, la première carte occupe 2 × 2 sur desktop.

## Surfaces & Elevation

- Rayons : 32 px cartes, 22 px tuiles internes, pilule pour boutons et puces.
- Pas de bordure sur les cartes, la séparation vient de la teinte. Ombre douce uniquement au survol.
- Lumière qui suit le pointeur dans les cartes (SpotlightCard).
- Verre dépoli limité à la nav, au menu mobile et au voile de transition.

## Media & Photography

- Memoji : nav, hero, splash, voile de transition, 404, favicon et images OG.
- Tuiles : fond noir et glyphe topologique bleu pour les projets sans capture, fenêtre macOS sur fond clair pour les captures.
- Vidéos : boucles noires rendues en code, présentées dans des écrans à grands rayons.

## Do and Don't

**Do** : beaucoup d'espace, une idée par section, chiffres réels, liens « › ».
**Don't** : bordures et filets décoratifs, monospace, pastilles partout, dégradés en fond, plus d'une couleur d'action.
