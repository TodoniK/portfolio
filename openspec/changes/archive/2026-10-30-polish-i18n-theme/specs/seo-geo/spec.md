## MODIFIED Requirements

### Requirement: Métadonnées par page
Chaque page MUST avoir un titre et une description uniques, une URL canonique sur `https://julesroyet.dev`, des alternates hreflang `fr`, `en`, `es` et `x-default`, et des balises Open Graph et Twitter avec une image 1200 x 630.

#### Scenario: Page projet
- **WHEN** un robot lit `/en/projects/omniroute`
- **THEN** il trouve un canonique vers cette URL, un alternate `fr` vers `/projects/omniroute` et un alternate `es` vers `/es/projects/omniroute`
