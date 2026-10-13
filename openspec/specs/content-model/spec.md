# content-model Specification

## Purpose
Décrire le contenu éditorial bilingue du portfolio et garantir que chaque page dispose de la même information en français et en anglais.

## Requirements

### Requirement: Contenu bilingue à parité
Chaque élément de contenu (identité, bio, expériences, formations, certifications, compétences, projets, expertises, FAQ) MUST exister en français et en anglais. Le build SHALL échouer si une traduction manque.

#### Scenario: Traduction manquante
- **WHEN** un projet n'a pas de titre anglais
- **THEN** la validation du contenu échoue au build avec le nom du champ manquant

### Requirement: Contenu repris sans altération
Les textes et chiffres des études de cas MUST reprendre le contenu existant. Seules les coquilles typographiques et l'harmonisation du vouvoiement SHALL être corrigées, et chaque correction MUST être listée dans le rapport de livraison.

#### Scenario: Chiffre d'étude de cas
- **WHEN** un visiteur ouvre l'étude de cas Hermes
- **THEN** les métriques affichées sont identiques à celles de l'ancien site

### Requirement: Grappes thématiques
Les projets MUST être rattachés à au moins une des trois grappes : Cloud et DevOps, Systèmes IA, Développement logiciel. Chaque grappe SHALL correspondre à une page d'expertise.

#### Scenario: Navigation par grappe
- **WHEN** un visiteur ouvre la page d'expertise Systèmes IA
- **THEN** elle liste tous les projets rattachés à cette grappe
