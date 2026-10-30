## ADDED Requirements

### Requirement: Animations sobres
Aucune animation décorative MUST provoquer de recalcul de mise en page continu quand la page est au repos. Les effets liés au défilement SHALL être confiés au navigateur (`animation-timeline`) et le défilement MUST rester natif. L'intro du nom et des titres SHALL ne se jouer qu'à la première page de la session, sans filtre de flou.

#### Scenario: Page au repos
- **WHEN** `/about` est ouverte depuis 1,5 s sans interaction
- **THEN** moins de 10 mises en page ont lieu dans les 2 s suivantes

#### Scenario: Changement de langue
- **WHEN** un visiteur passe de `/` à `/es` dans la même session
- **THEN** le nom s'affiche directement, sans rejouer l'intro

### Requirement: Photo sur la page Parcours
La page Parcours SHALL montrer la photo réelle de Jules Royet, sans effet au survol, avec un texte alternatif dans la langue de la page.

#### Scenario: Version espagnole
- **WHEN** un visiteur ouvre `/es/about`
- **THEN** la photo s'affiche avec le texte alternatif « Foto de Jules Royet »

### Requirement: Pastilles de logos carrées
Les pastilles des vignettes MUST rester carrées quelles que soient les proportions du logo.

#### Scenario: Logo plus haut que large
- **WHEN** la vignette Shopeen affiche le logo MongoDB
- **THEN** ses cinq pastilles ont la même taille et sont carrées
