## 1. Cadrage

- [x] 1.1 Recherche d'inspiration (galeries designeer, tendances X) et références retenues
- [x] 1.2 Rédiger `DESIGN.md` et `MOTION.md` (contrat visuel et mouvement)
- [x] 1.3 Révision : direction minimaliste Apple, memoji, composants React Bits portés

## 2. Socle

- [x] 2.1 Supprimer l'application Next.js et ses fichiers de configuration
- [x] 2.2 Initialiser Astro 7 statique, TypeScript strict, Prettier
- [x] 2.3 Configurer `wrangler.jsonc` (assets-only, 404-page) et `public/_headers`

## 3. Contenu

- [x] 3.1 Migrer identité, bio, expériences, formations, certifications, compétences en données typées FR/EN
- [x] 3.2 Migrer les 10 études de cas et les 3 expertises, avec rattachement aux grappes
- [x] 3.3 Validation de parité FR/EN au build et liste des corrections typographiques

## 4. Médias

- [x] 4.1 Inventaire des sources et suppression des doublons et originaux non utilisés
- [x] 4.2 Images responsives AVIF/WebP via `astro:assets`
- [x] 4.3 Script de génération des tuiles de projets
- [x] 4.4 Moteur `seek(t)` + rendu Playwright + encodage ffmpeg des vidéos de fond, posters

## 5. Expérience

- [x] 5.1 Layout, tokens, typographie, thème, navigation, pied de page, lien d'évitement
- [x] 5.2 Accueil (hero vidéo, grappes, projets, parcours, contact)
- [x] 5.3 Pages projets (liste + étude de cas), à propos, contact, expertises, mentions légales
- [x] 5.4 Splash, transitions entre pages, curseur personnalisé
- [x] 5.5 Animations pilotées par le scroll et défilement doux, repli mouvement réduit
- [x] 5.6 Page 404 animée

## 6. SEO / GEO

- [x] 6.1 Métadonnées, canonique, hreflang, Open Graph
- [x] 6.2 JSON-LD par type de page
- [x] 6.3 `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`
- [x] 6.4 Images Open Graph générées par page

## 7. Qualité

- [x] 7.1 Tests Playwright : routes, statut 404, débordement multi-viewport, clavier, langue
- [x] 7.2 axe-core sur toutes les pages
- [x] 7.3 Lighthouse mobile et desktop, validation HTML et liens internes
- [x] 7.4 Vérification des en-têtes de sécurité et de cache

## 8. Mise en production

- [x] 8.1 Déploiement sur `workers.dev` et validation
- [x] 8.2 Bascule DNS apex, custom domain, Redirect Rule www, réglages de zone
- [x] 8.3 Vérifications post-bascule (apex, www, sous-domaines, en-têtes) : vérifié le 2026-10-13, apex 200 servi par Cloudflare, www 301 vers l'apex, CSP et HSTS présents
- [x] 8.4 Suppression du projet Vercel et des TXT `_vercel` : reportée, action manuelle suivie dans `kinetic-dark-redesign` (tâche 9.3), `jules-portfolio.vercel.app` répond encore 200 au 2026-10-13
- [x] 8.5 Merge sur `main`, archive OpenSpec
