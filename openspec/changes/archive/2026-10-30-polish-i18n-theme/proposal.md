# Proposition : polish-i18n-theme

## Why

Retours du propriétaire le 2026-10-30 :

- Safari : le mot qui défile dans le hero (« Je construis … ») est invisible.
- Memoji flou et déformé sur tous les navigateurs, animation qui saute au clic.
- Écran de chargement et transition de page coûteux (flou plein écran, navigation retardée de 340 ms).
- Pas de thème clair. Bouton de langue entouré d'un ovale jugé disgracieux.
- Pas de version espagnole, aucune suggestion de langue au visiteur.
- Journal de parcours : la ligne en dégradé passe par-dessus les logos.
- Logos Hermes, Docker et Traefik non reconnaissables, logo Oracle décentré.
- Dépendances en retard et mises à jour automatiques inopérantes (Renovate jamais installé sur le dépôt).

## What Changes

- Mot du hero animé d'un bloc, le texte en dégradé est porté par l'élément qui contient le texte (correctif WebKit).
- Memoji : source plus nette (jusqu'à 3x), inclinaison réduite, plus de filtre sur l'image, animation de clic qui ne rejoue plus l'entrée.
- Splash allégé (opacité et transform uniquement, plus court). Le voile de transition JS est remplacé par les View Transitions entre documents, sans délai de navigation.
- Thème clair et sombre : suit le système par défaut, bouton dans le header, choix mémorisé, appliqué avant le premier rendu.
- Sélecteur de langue sans bordure, en menu (FR, EN, ES).
- Version espagnole sous `/es`, hreflang et sitemap à trois langues.
- Bandeau discret qui propose la langue du navigateur quand elle diffère de la page. Aucune redirection automatique (recommandation Google).
- Journal : logos au-dessus de la ligne, ligne hors de la liste (HTML valide).
- Logos officiels à jour pour Hermes Agent, Docker, Traefik, Oracle recentré, sources tracées.
- Dépendances à jour. Dependabot remplace Renovate, fusion automatique des mises à jour mineures et correctifs après CI verte.

## Capabilities

### Modified Capabilities

- `site-experience` : thème, langues, splash et transitions, hero.
- `seo-geo` : trois langues dans hreflang, sitemap et llms.
- `media-pipeline` : logos officiels.
- `hosting-security` : mises à jour automatiques des dépendances.

## Impact

- Code : `global.css`, `app.ts`, `Base.astro`, `Header.astro`, `Memoji.astro`, `Rotator.astro`, vues, données (`site.ts`, `dictionary.ts`, `projects-data.ts`, `expertises.ts`).
- Nouvelles pages `src/pages/es/**`, images OG `public/og/es-*.jpg`.
- `renovate.json` supprimé, `.github/dependabot.yml` et job d'auto-merge ajoutés.

## Non-goals

- Redirection serveur selon `Accept-Language`.
- TypeScript 7 : `@astrojs/check` ne le supporte pas encore (peer `^5 || ^6`).
