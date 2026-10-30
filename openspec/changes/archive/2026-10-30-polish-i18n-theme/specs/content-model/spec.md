## MODIFIED Requirements

### Requirement: Contenu bilingue à parité
Chaque élément de contenu (identité, bio, expériences, formations, certifications, compétences, projets, expertises, FAQ) MUST exister en français, en anglais et en espagnol. Le build SHALL échouer si une traduction manque.

#### Scenario: Traduction manquante
- **WHEN** un projet n'a pas de titre espagnol
- **THEN** la vérification de types échoue au build avec le nom du champ manquant
