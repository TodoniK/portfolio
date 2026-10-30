## MODIFIED Requirements

### Requirement: Pages publiques
Le site SHALL exposer en FR à la racine, en EN sous `/en` et en ES sous `/es` : accueil, liste des projets, une page par projet, à propos, contact, trois pages d'expertise, mentions légales (`/mentions-legales`, `/en/legal-notice`, `/es/aviso-legal`) et une page 404.

#### Scenario: URL héritée
- **WHEN** un visiteur ouvre `/projects/hermes` ou `/en/about`
- **THEN** la page répond 200 avec le contenu correspondant

#### Scenario: Changement de langue
- **WHEN** un visiteur choisit Español dans le sélecteur de langue sur `/projects/hermes`
- **THEN** il arrive sur `/es/projects/hermes`

### Requirement: Splash et chargement entre sections
Un écran d'introduction SHALL s'afficher à la première visite de la session, durer au plus 1,3 s, n'animer que l'opacité et la transformation, et ne jamais bloquer le rendu du contenu principal. Les changements de page SHALL utiliser les View Transitions entre documents, sans retarder la navigation par script.

#### Scenario: Visite suivante
- **WHEN** le visiteur navigue vers une deuxième page dans la même session
- **THEN** le splash ne s'affiche pas et la page suivante se charge sans délai artificiel

### Requirement: Direction visuelle sombre et cinétique
Le site SHALL proposer un thème sombre et un thème clair partageant la même direction (une seule famille typographique, Inter, et le memoji comme marqueur d'identité). Les titres de section MUST NOT dépasser 2,75 rem et le titre du hero MUST NOT dépasser 5,5 rem.

#### Scenario: Grand écran
- **WHEN** l'accueil est affiché à 2560 px de large
- **THEN** le `h1` mesure au plus 88 px et chaque `h2` de section au plus 44 px

## ADDED Requirements

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
