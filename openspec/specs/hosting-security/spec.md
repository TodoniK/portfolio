# hosting-security Specification

## Purpose
Héberger le site sur Cloudflare de façon sûre et performante, avec un domaine canonique unique.

## Requirements

### Requirement: Domaine canonique
Le site MUST être servi sur `https://julesroyet.dev`. Toute requête sur `www.julesroyet.dev` MUST être redirigée en 301 vers l'apex en conservant chemin et paramètres. HTTP MUST être redirigé vers HTTPS.

#### Scenario: Ancien lien www
- **WHEN** un visiteur ouvre `https://www.julesroyet.dev/about?x=1`
- **THEN** il reçoit une 301 vers `https://julesroyet.dev/about?x=1`

### Requirement: En-têtes de sécurité
Toutes les réponses MUST inclure `Content-Security-Policy` sans `unsafe-eval`, `Strict-Transport-Security` (au moins un an, sous-domaines exclus), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restrictive et `frame-ancestors 'none'`.

#### Scenario: Audit HTTP
- **WHEN** Mozilla HTTP Observatory analyse l'apex
- **THEN** la note est au moins A

### Requirement: Cache
Les ressources versionnées par empreinte MUST être servies avec `Cache-Control: public, max-age=31536000, immutable`. Les pages HTML MUST être revalidées.

#### Scenario: Nouveau déploiement
- **WHEN** une nouvelle version est déployée
- **THEN** les visiteurs reçoivent le nouveau HTML sans vider leur cache

### Requirement: Sous-domaines existants préservés
La bascule MUST NOT modifier les enregistrements DNS des sous-domaines existants (dokploy, hermes, iplocator, ssh, stakeirb) ni les enregistrements mail.

#### Scenario: Après bascule
- **WHEN** la bascule DNS est terminée
- **THEN** `hermes.julesroyet.dev` répond comme avant

### Requirement: Dépendances à jour automatiquement
Le dépôt MUST déclarer Dependabot pour npm et GitHub Actions, avec un délai de quarantaine avant d'adopter une nouvelle version. Les mises à jour mineures et correctifs SHALL être fusionnées automatiquement uniquement après un build et des tests verts. Les mises à jour majeures MUST rester en PR pour relecture. Les approbations de scripts d'installation (`allowScripts`) MUST être déclarées par nom de paquet, sans version épinglée.

#### Scenario: Correctif d'une dépendance
- **WHEN** Dependabot ouvre une PR qui passe Astro d'une version corrective à la suivante et que la CI est verte
- **THEN** la PR est fusionnée sans intervention

#### Scenario: Version majeure
- **WHEN** Dependabot propose une version majeure
- **THEN** la PR reste ouverte jusqu'à relecture
