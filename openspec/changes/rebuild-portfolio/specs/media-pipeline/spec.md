## Purpose

Produire et servir des images et vidéos optimisées pour le web, reproductibles à partir des sources du dépôt.

## ADDED Requirements

### Requirement: Images responsives optimisées
Toute image matricielle affichée MUST être servie en AVIF avec repli WebP, en plusieurs largeurs, avec largeur et hauteur explicites et un texte alternatif bilingue (vide pour les images décoratives).

#### Scenario: Chargement mobile
- **WHEN** une page est chargée sur un écran de 375 px de large
- **THEN** le navigateur télécharge une variante d'au plus 2x la largeur affichée

### Requirement: Tuiles de projets générées
Chaque projet MUST disposer d'une tuile visuelle issue d'un système graphique commun, générée par script versionné.

#### Scenario: Régénération
- **WHEN** le script de génération est relancé
- **THEN** il produit les mêmes fichiers pour les mêmes entrées

### Requirement: Vidéos motion design
Les vidéos de fond MUST être rendues de façon déterministe, encodées en WebM (AV1 ou VP9) et MP4 (H.264), sans piste audio, avec une image poster. Une vidéo de fond MUST NOT dépasser 2 Mo.

#### Scenario: Économie de données
- **WHEN** le visiteur a activé `prefers-reduced-motion` ou `Save-Data`
- **THEN** seule l'image poster est affichée et la vidéo n'est pas téléchargée

### Requirement: Absence de doublons
Le site déployé MUST NOT contenir de fichiers sources non référencés (PNG originaux, doublons).

#### Scenario: Audit du build
- **WHEN** le dossier de build est inspecté
- **THEN** aucun fichier média n'est présent deux fois
