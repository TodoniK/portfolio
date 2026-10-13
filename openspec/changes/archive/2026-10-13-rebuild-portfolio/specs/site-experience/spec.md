## Purpose

Définir l'expérience utilisateur du portfolio : pages, navigation, animations et garanties d'accessibilité et de performance.

## ADDED Requirements

### Requirement: Pages publiques
Le site SHALL exposer en FR à la racine et en EN sous `/en` : accueil, liste des projets, une page par projet, à propos, contact, trois pages d'expertise, mentions légales et une page 404.

#### Scenario: URL héritée
- **WHEN** un visiteur ouvre `/projects/hermes` ou `/en/about`
- **THEN** la page répond 200 avec le contenu correspondant

#### Scenario: Changement de langue
- **WHEN** un visiteur bascule la langue sur `/projects/hermes`
- **THEN** il arrive sur `/en/projects/hermes`

### Requirement: Mobile-first et responsive
Le site MUST être utilisable sans défilement horizontal de 320 px à 2560 px de large, avec des cibles tactiles d'au moins 24 x 24 px.

#### Scenario: Petit écran
- **WHEN** une page est affichée à 320 px de large
- **THEN** aucun élément ne dépasse la largeur de la fenêtre

### Requirement: Splash et chargement entre sections
Un écran d'introduction SHALL s'afficher à la première visite de la session, durer moins de 1,2 s et ne jamais bloquer le rendu du contenu principal. Les changements de page SHALL afficher une transition thématique.

#### Scenario: Visite suivante
- **WHEN** le visiteur navigue vers une deuxième page dans la même session
- **THEN** le splash ne s'affiche pas et seule la transition est jouée

### Requirement: Curseur personnalisé
Un curseur personnalisé SHALL être actif uniquement sur les appareils à pointeur fin avec survol. Le curseur système MUST rester disponible pour les champs de texte.

#### Scenario: Écran tactile
- **WHEN** le site est ouvert sur un téléphone
- **THEN** aucun curseur personnalisé n'est rendu et aucun script de curseur n'est exécuté

### Requirement: Mouvement réduit
Sous `prefers-reduced-motion: reduce`, le site MUST désactiver splash animé, défilement doux, parallaxe, vidéos et curseur animé, sans perte de contenu ni de fonctionnalité.

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
Sur mobile simulé (Lighthouse), chaque page MUST obtenir LCP < 2,5 s, CLS < 0,1 et TBT < 200 ms. Le JavaScript chargé avant interaction sur l'accueil MUST rester sous 80 Ko compressés.

#### Scenario: Audit Lighthouse
- **WHEN** Lighthouse mobile analyse l'accueil
- **THEN** le score performance est d'au moins 90
