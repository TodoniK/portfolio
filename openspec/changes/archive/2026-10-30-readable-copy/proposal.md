# Proposition : readable-copy

## Why

Retour du propriétaire le 2026-10-30 : la bio de la page Parcours et les descriptions des études de cas forment de gros blocs difficiles à lire, et la photo n'est pas centrée sur le sujet.

## What Changes

- Textes longs découpés à l'affichage en paragraphes de deux phrases au plus, sans changer le contenu. Phrase d'accroche plus légère, mesure limitée à environ 65 caractères, interligne 1,7.
- Photo recadrée en 4:5 autour de l'axe du visage et du buste.

## Capabilities

### Modified Capabilities

- `site-experience` : lisibilité des pages Parcours et études de cas.

## Impact

- `src/data/site.ts` (`sentences`, `paragraphs`), `About.astro`, `Project.astro`, `Portrait.astro`, `src/assets/portraits/jules.png`.
