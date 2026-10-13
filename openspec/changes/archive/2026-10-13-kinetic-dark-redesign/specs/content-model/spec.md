## MODIFIED Requirements

### Requirement: Contenu repris sans altération
Les textes et chiffres des études de cas MUST reprendre le contenu existant. Seules les coquilles typographiques, l'harmonisation du vouvoiement, le manifeste court de l'accueil et la fiche projet « portfolio » (devenue inexacte après la migration vers Astro) SHALL être modifiés, et chaque modification MUST être listée dans le rapport de livraison.

#### Scenario: Chiffre d'étude de cas
- **WHEN** un visiteur ouvre l'étude de cas Hermes
- **THEN** les métriques affichées sont identiques à celles de l'ancien site

#### Scenario: Fiche portfolio
- **WHEN** un visiteur ouvre l'étude de cas portfolio
- **THEN** la stack décrite correspond au site réellement déployé (Astro, TypeScript, Cloudflare Workers)
