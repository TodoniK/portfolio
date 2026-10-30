## ADDED Requirements

### Requirement: Dépendances à jour automatiquement
Le dépôt MUST déclarer Dependabot pour npm et GitHub Actions, avec un délai de quarantaine avant d'adopter une nouvelle version. Les mises à jour mineures et correctifs SHALL être fusionnées automatiquement uniquement après un build et des tests verts. Les mises à jour majeures MUST rester en PR pour relecture. Les approbations de scripts d'installation (`allowScripts`) MUST être déclarées par nom de paquet, sans version épinglée.

#### Scenario: Correctif d'une dépendance
- **WHEN** Dependabot ouvre une PR qui passe Astro d'une version corrective à la suivante et que la CI est verte
- **THEN** la PR est fusionnée sans intervention

#### Scenario: Version majeure
- **WHEN** Dependabot propose une version majeure
- **THEN** la PR reste ouverte jusqu'à relecture
