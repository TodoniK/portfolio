## 1. Cadrage

- [ ] 1.1 Recherche d'inspiration (galeries designeer, tendances X) et références retenues
- [ ] 1.2 Rédiger `DESIGN.md` et `MOTION.md` (contrat visuel et mouvement)

## 2. Socle

- [ ] 2.1 Supprimer l'application Next.js et ses fichiers de configuration
- [ ] 2.2 Initialiser Astro 7 statique, TypeScript strict, Prettier
- [ ] 2.3 Configurer `wrangler.jsonc` (assets-only, 404-page) et `public/_headers`

## 3. Contenu

- [ ] 3.1 Migrer identité, bio, expériences, formations, certifications, compétences en données typées FR/EN
- [ ] 3.2 Migrer les 10 études de cas et les 3 expertises, avec rattachement aux grappes
- [ ] 3.3 Validation de parité FR/EN au build et liste des corrections typographiques

## 4. Médias

- [ ] 4.1 Inventaire des sources et suppression des doublons et originaux non utilisés
- [ ] 4.2 Images responsives AVIF/WebP via `astro:assets`
- [ ] 4.3 Script de génération des tuiles de projets
- [ ] 4.4 Moteur `seek(t)` + rendu Playwright + encodage ffmpeg des vidéos de fond, posters

## 5. Expérience

- [ ] 5.1 Layout, tokens, typographie, thème, navigation, pied de page, lien d'évitement
- [ ] 5.2 Accueil (hero vidéo, grappes, projets, parcours, contact)
- [ ] 5.3 Pages projets (liste + étude de cas), à propos, contact, expertises, mentions légales
- [ ] 5.4 Splash, transitions entre pages, curseur personnalisé
- [ ] 5.5 Animations pilotées par le scroll et défilement doux, repli mouvement réduit
- [ ] 5.6 Page 404 animée

## 6. SEO / GEO

- [ ] 6.1 Métadonnées, canonique, hreflang, Open Graph
- [ ] 6.2 JSON-LD par type de page
- [ ] 6.3 `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`
- [ ] 6.4 Images Open Graph générées par page

## 7. Qualité

- [ ] 7.1 Tests Playwright : routes, statut 404, débordement multi-viewport, clavier, langue
- [ ] 7.2 axe-core sur toutes les pages
- [ ] 7.3 Lighthouse mobile et desktop, validation HTML et liens internes
- [ ] 7.4 Vérification des en-têtes de sécurité et de cache

## 8. Mise en production

- [ ] 8.1 Déploiement sur `workers.dev` et validation
- [ ] 8.2 Bascule DNS apex, custom domain, Redirect Rule www, réglages de zone
- [ ] 8.3 Vérifications post-bascule (apex, www, sous-domaines, en-têtes)
- [ ] 8.4 Suppression du projet Vercel et des TXT `_vercel`
- [ ] 8.5 Merge sur `main`, archive OpenSpec
