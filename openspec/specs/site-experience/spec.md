# site-experience Specification

## Purpose
Définir l'expérience utilisateur du portfolio : pages, navigation, animations et garanties d'accessibilité et de performance.

## Requirements

### Requirement: Pages publiques
Le site SHALL exposer en FR à la racine, en EN sous `/en` et en ES sous `/es` : accueil, liste des projets, une page par projet, à propos, contact, trois pages d'expertise, mentions légales (`/mentions-legales`, `/en/legal-notice`, `/es/aviso-legal`) et une page 404.

#### Scenario: URL héritée
- **WHEN** un visiteur ouvre `/projects/hermes` ou `/en/about`
- **THEN** la page répond 200 avec le contenu correspondant

#### Scenario: Changement de langue
- **WHEN** un visiteur choisit Español dans le sélecteur de langue sur `/projects/hermes`
- **THEN** il arrive sur `/es/projects/hermes`

### Requirement: Mobile-first et responsive
Le site MUST être utilisable sans défilement horizontal de 320 px à 2560 px de large, avec des cibles tactiles d'au moins 24 x 24 px.

#### Scenario: Petit écran
- **WHEN** une page est affichée à 320 px de large
- **THEN** aucun élément ne dépasse la largeur de la fenêtre

### Requirement: Splash et chargement entre sections
Un écran d'introduction SHALL s'afficher à la première visite de la session, durer au plus 1,3 s, n'animer que l'opacité et la transformation, et ne jamais bloquer le rendu du contenu principal. Les changements de page SHALL utiliser les View Transitions entre documents, sans retarder la navigation par script.

#### Scenario: Visite suivante
- **WHEN** le visiteur navigue vers une deuxième page dans la même session
- **THEN** le splash ne s'affiche pas et la page suivante se charge sans délai artificiel

### Requirement: Mouvement réduit
Sous `prefers-reduced-motion: reduce`, le site MUST désactiver splash animé, défilement doux, parallaxe et fond Aurora, sans perte de contenu ni de fonctionnalité.

#### Scenario: Préférence système
- **WHEN** la préférence de mouvement réduit est active
- **THEN** tout le contenu est visible immédiatement et aucune animation de plus de 200 ms ne se joue

### Requirement: Page 404 animée
Toute URL inconnue MUST répondre 404 avec une page animée dans le thème, proposant des liens vers l'accueil et les projets.

#### Scenario: URL inconnue
- **WHEN** un visiteur ouvre `/n-existe-pas`
- **THEN** le statut HTTP est 404 et la page propose un retour à l'accueil

### Requirement: Accessibilité
Le site MUST respecter WCAG 2.2 niveau AA : zéro violation axe-core sérieuse ou critique, navigation complète au clavier avec focus visible, lien d'évitement, un seul `h1` par page, contrastes conformes.

#### Scenario: Audit automatique
- **WHEN** axe-core analyse chaque page
- **THEN** aucune violation `serious` ou `critical` n'est remontée

### Requirement: Performance
Sur mobile simulé (Lighthouse), chaque page MUST obtenir LCP < 2,5 s, CLS < 0,1 et TBT < 200 ms. Le JavaScript chargé avant interaction sur l'accueil MUST rester sous 60 Ko compressés. Le site MUST NOT servir de vidéo.

#### Scenario: Audit Lighthouse
- **WHEN** Lighthouse mobile analyse l'accueil
- **THEN** le score performance est d'au moins 90

### Requirement: Direction visuelle sombre et cinétique
Le site SHALL proposer un thème sombre et un thème clair partageant la même direction (une seule famille typographique, Inter, et le memoji comme marqueur d'identité). Les titres de section MUST NOT dépasser 2,75 rem et le titre du hero MUST NOT dépasser 5,5 rem.

#### Scenario: Grand écran
- **WHEN** l'accueil est affiché à 2560 px de large
- **THEN** le `h1` mesure au plus 88 px et chaque `h2` de section au plus 44 px

### Requirement: Fond animé Aurora
Sur les appareils à pointeur fin, le hero de l'accueil SHALL afficher un fond Aurora en WebGL2. Le fond MUST être décoratif (`aria-hidden`), chargé après l'événement `load`, mis en pause hors écran ou onglet caché. Il MUST être remplacé par un dégradé CSS aux mêmes couleurs sur écran tactile, sous mouvement réduit, sous `Save-Data`, sans WebGL2 ou avec un rendu WebGL logiciel.

#### Scenario: Mouvement réduit
- **WHEN** la préférence de mouvement réduit est active
- **THEN** aucun canvas Aurora n'est créé et le dégradé statique est visible

#### Scenario: Téléphone
- **WHEN** l'accueil est ouvert sur un écran tactile
- **THEN** le module Aurora n'est pas téléchargé et le temps de blocage total reste sous 200 ms

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

### Requirement: Thème clair et sombre
Le site MUST suivre `prefers-color-scheme` par défaut. Un bouton du header SHALL basculer le thème, le choix MUST être mémorisé et appliqué avant le premier rendu. Les deux thèmes MUST respecter les contrastes WCAG 2.2 AA.

#### Scenario: Choix mémorisé
- **WHEN** un visiteur en thème système sombre passe en clair puis ouvre une autre page
- **THEN** la page s'affiche directement en clair, sans flash sombre

### Requirement: Suggestion de langue
Quand aucune langue n'a été choisie et que la première langue prise en charge du navigateur diffère de celle de la page, le site SHALL afficher un bandeau, rédigé dans cette langue, qui propose la page équivalente. Le site MUST NOT rediriger automatiquement. Fermer le bandeau ou changer de langue MUST mémoriser le choix.

#### Scenario: Visiteur hispanophone
- **WHEN** un navigateur réglé en `es-ES` ouvre `/projects`
- **THEN** l'URL reste `/projects` et un bandeau propose `/es/projects`

### Requirement: Texte cinétique compatible WebKit
Tout texte en dégradé (`background-clip: text`) MUST porter le dégradé sur l'élément qui contient directement le texte.

#### Scenario: Safari
- **WHEN** l'accueil est ouvert dans Safari
- **THEN** le mot qui défile après « Je construis » est visible

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

### Requirement: Textes longs lisibles
Les textes longs de la page Parcours et des études de cas SHALL s'afficher en paragraphes d'au plus deux phrases, sur une mesure d'environ 65 caractères, sans modifier leur contenu.

#### Scenario: Étude de cas
- **WHEN** un visiteur ouvre `/projects/hermes`
- **THEN** chaque paragraphe de la problématique et de l'architecture compte au plus deux phrases
