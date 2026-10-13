## ADDED Requirements

### Requirement: Vignettes de projets standardisées
Chaque projet MUST disposer d'une vignette 16:10 rendue en code à partir d'un gabarit commun : nom court et logos officiels des outils utilisés. Chaque logo MUST avoir un texte alternatif égal au nom de l'outil, et sa source MUST être tracée dans `src/assets/brands/sources.json`.

#### Scenario: Nouveau projet
- **WHEN** un projet est ajouté au contenu sans liste de logos
- **THEN** le build échoue avec l'identifiant du projet

### Requirement: Icônes du site
Le site MUST fournir un `favicon.ico` (16, 32, 48 px), des icônes PNG carrées multiples de 48 px et une icône `maskable` séparée. Le visage du memoji MUST rester entier dans un recadrage circulaire.

#### Scenario: Résultat de recherche
- **WHEN** Google affiche l'icône du site dans un cercle
- **THEN** le memoji apparaît entier, centré et non déformé

## REMOVED Requirements

### Requirement: Tuiles de projets générées
**Reason**: Les tuiles PNG abstraites ne montraient pas la stack et sont remplacées par les vignettes en code.
**Migration**: `ProjectThumb.astro` et `src/data/brands.ts`. Les images OG capturent le même gabarit.

### Requirement: Vidéos motion design
**Reason**: Les vidéos (environ 2 Mo) étaient peu parlantes et coûteuses en données.
**Migration**: Fond Aurora dans le hero, cartes avec logos pour les expertises.
