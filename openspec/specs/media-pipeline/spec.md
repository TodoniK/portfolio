# media-pipeline Specification

## Purpose
Produire et servir des images optimisées et des visuels rendus en code, reproductibles à partir des sources du dépôt.

## Requirements

### Requirement: Images responsives optimisées
Toute image matricielle affichée MUST être servie en AVIF avec repli WebP, en plusieurs largeurs, avec largeur et hauteur explicites et un texte alternatif bilingue (vide pour les images décoratives).

#### Scenario: Chargement mobile
- **WHEN** une page est chargée sur un écran de 375 px de large
- **THEN** le navigateur télécharge une variante d'au plus 2x la largeur affichée

### Requirement: Absence de doublons
Le site déployé MUST NOT contenir de fichiers sources non référencés (PNG originaux, doublons).

#### Scenario: Audit du build
- **WHEN** le dossier de build est inspecté
- **THEN** aucun fichier média n'est présent deux fois

### Requirement: Vignettes de projets standardisées
Chaque projet MUST disposer d'une vignette 16:10 rendue en code à partir d'un gabarit commun : nom court et logos officiels des outils utilisés. Chaque logo MUST avoir un texte alternatif égal au nom de l'outil, et sa source MUST être tracée dans `src/assets/brands/sources.json`.

#### Scenario: Nouveau projet
- **WHEN** un projet est ajouté au contenu sans liste de logos
- **THEN** le build échoue avec l'identifiant du projet

### Requirement: Icônes du site
Le site MUST fournir un `favicon.ico` (16, 32, 48 px), des icônes PNG carrées multiples de 48 px et une icône `maskable` séparée. Le visage du memoji MUST rester entier dans un recadrage circulaire.

#### Scenario: Résultat de recherche
- **WHEN** Google affiche l'icône du site dans un cercle
- **THEN** le memoji apparaît entier, centré et non déformé
