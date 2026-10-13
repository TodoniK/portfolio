## ADDED Requirements

### Requirement: Direction visuelle sombre et cinétique
Le site SHALL utiliser un thème sombre unique, une seule famille typographique (Inter) et le memoji comme marqueur d'identité. Les titres de section MUST NOT dépasser 2,75 rem et le titre du hero MUST NOT dépasser 5,5 rem.

#### Scenario: Grand écran
- **WHEN** l'accueil est affiché à 2560 px de large
- **THEN** le `h1` mesure au plus 88 px et chaque `h2` de section au plus 44 px

### Requirement: Fond animé Aurora
Le hero de l'accueil SHALL afficher un fond Aurora en WebGL2. Le fond MUST être décoratif (`aria-hidden`), chargé après l'événement `load`, mis en pause hors écran ou onglet caché, et remplacé par un dégradé CSS statique sous mouvement réduit, `Save-Data` ou sans WebGL2.

#### Scenario: Mouvement réduit
- **WHEN** la préférence de mouvement réduit est active
- **THEN** aucun canvas Aurora n'est créé et le dégradé statique est visible

### Requirement: Accueil allégé
L'accueil SHALL présenter dans l'ordre : hero, manifeste d'une phrase avec quatre chiffres, six projets en grille uniforme, trois expertises, stack et parcours. Chaque carte projet MUST montrer sa vignette standardisée, son titre, son domaine et son année.

#### Scenario: Lecture des projets
- **WHEN** un visiteur arrive sur la section projets
- **THEN** il voit six cartes de même taille avec les logos des outils utilisés

### Requirement: Contenu visible sans script
Tout contenu textuel et toute carte MUST être visibles sans JavaScript. Les animations d'apparition MUST NOT masquer du contenu tant que le script de mouvement n'est pas actif.

#### Scenario: JavaScript désactivé
- **WHEN** l'accueil est chargé sans JavaScript
- **THEN** toutes les cartes projets ont une opacité de 1

### Requirement: Fil d'Ariane aligné
Les éléments du fil d'Ariane MUST partager la même ligne de base.

#### Scenario: Page de second niveau
- **WHEN** la page `/projects` est affichée
- **THEN** « Accueil » et « Projets » ont la même ligne de base à 1 px près

## MODIFIED Requirements

### Requirement: Mouvement réduit
Sous `prefers-reduced-motion: reduce`, le site MUST désactiver splash animé, défilement doux, parallaxe et fond Aurora, sans perte de contenu ni de fonctionnalité.

#### Scenario: Préférence système
- **WHEN** la préférence de mouvement réduit est active
- **THEN** tout le contenu est visible immédiatement et aucune animation de plus de 200 ms ne se joue

### Requirement: Performance
Sur mobile simulé (Lighthouse), chaque page MUST obtenir LCP < 2,5 s, CLS < 0,1 et TBT < 200 ms. Le JavaScript chargé avant interaction sur l'accueil MUST rester sous 60 Ko compressés. Le site MUST NOT servir de vidéo.

#### Scenario: Audit Lighthouse
- **WHEN** Lighthouse mobile analyse l'accueil
- **THEN** le score performance est d'au moins 90

## REMOVED Requirements

### Requirement: Curseur personnalisé
**Reason**: Le curseur TargetCursor ne correspond plus à la direction minimaliste.
**Migration**: Curseur natif partout. Les micro-interactions passent sur les éléments eux-mêmes (Magnet, SpotlightCard, survols).
