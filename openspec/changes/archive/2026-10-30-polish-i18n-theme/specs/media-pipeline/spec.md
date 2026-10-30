## MODIFIED Requirements

### Requirement: Vignettes de projets standardisées
Chaque projet MUST disposer d'une vignette 16:10 rendue en code à partir d'un gabarit commun : nom court et logos officiels des outils utilisés, dans leur version actuelle, en SVG sans texte rendu par une police et cadrés au centre de leur `viewBox`. Chaque logo MUST avoir un texte alternatif égal au nom de l'outil, et sa source MUST être tracée dans `src/assets/brands/sources.json`.

#### Scenario: Nouveau projet
- **WHEN** un projet est ajouté au contenu sans liste de logos
- **THEN** le build échoue avec l'identifiant du projet

#### Scenario: Logo lisible
- **WHEN** une vignette affiche le logo Docker à 20 px
- **THEN** la baleine officielle apparaît en couleur et centrée dans sa pastille
