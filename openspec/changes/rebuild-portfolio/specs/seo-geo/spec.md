## Purpose

Rendre le portfolio trouvable par les moteurs de recherche et citable par les moteurs de réponse IA.

## ADDED Requirements

### Requirement: Métadonnées par page
Chaque page MUST avoir un titre et une description uniques, une URL canonique sur `https://julesroyet.dev`, des alternates hreflang `fr`, `en` et `x-default`, et des balises Open Graph et Twitter avec une image 1200 x 630.

#### Scenario: Page projet
- **WHEN** un robot lit `/en/projects/omniroute`
- **THEN** il trouve un canonique vers cette URL et un alternate `fr` vers `/projects/omniroute`

### Requirement: Données structurées fidèles
Le site MUST publier en JSON-LD `Person`, `WebSite`, `ProfilePage` (à propos), `BreadcrumbList` (pages profondes), `CreativeWork` (projets) et `FAQPage` (expertises). Les valeurs MUST correspondre au contenu visible.

#### Scenario: Validation
- **WHEN** une page d'expertise est analysée par un validateur schema.org
- **THEN** aucune erreur n'est remontée

### Requirement: Indexabilité
Le site MUST fournir `robots.txt` autorisant les robots de recherche et d'IA, un `sitemap.xml` à jour listant toutes les pages indexables avec leurs alternates, ainsi que `llms.txt` et `llms-full.txt`.

#### Scenario: Sitemap
- **WHEN** une nouvelle étude de cas est ajoutée au contenu
- **THEN** elle apparaît dans le sitemap au build suivant sans action manuelle

### Requirement: Maillage interne
Chaque projet MUST être lié depuis au moins une page d'expertise et depuis la liste des projets, par des liens dans le texte avec des ancres descriptives.

#### Scenario: Page orpheline
- **WHEN** les liens internes du build sont analysés
- **THEN** aucune page indexable n'a zéro lien entrant
