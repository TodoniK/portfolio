## Context

Site vitrine personnel, environ 35 pages statiques en deux langues. Audience : recruteurs et clients freelance, majoritairement sur mobile depuis LinkedIn. Contraintes : mise en production le jour même, Core Web Vitals au vert sur mobile, accessibilité WCAG 2.2 AA, animations riches.

## Goals / Non-Goals

**Goals**
- HTML entièrement pré-rendu, JavaScript chargé par îlots et seulement quand il sert.
- Un seul fournisseur (Cloudflare) pour DNS, hébergement et analytics.
- Médias produits par scripts reproductibles et versionnés.

**Non-Goals**
- Rendu serveur, API, base de données.

## Decisions

- **Astro 7 en sortie statique.** Zéro JS par défaut, collections de contenu typées, View Transitions natives. Rejeté : Next.js export (runtime React sur chaque page), SvelteKit (moins de gains pour un site sans état).
- **Workers Static Assets sans script.** Recommandation actuelle de Cloudflare pour les nouveaux projets. `not_found_handling: 404-page`, `html_handling: drop-trailing-slash`. Les en-têtes passent par `_headers`. Rejeté : Pages (en maintenance), Vercel (fournisseur supplémentaire).
- **Animations : CSS d'abord, GSAP + ScrollTrigger + Lenis en îlot différé.** Les entrées et effets de scroll simples utilisent `animation-timeline: view()` avec repli. GSAP sert aux séquences complexes. Tout est désactivé sous `prefers-reduced-motion`.
- **Vidéos motion design en code.** Une page HTML expose `seek(t)` déterministe, Playwright capture chaque image, ffmpeg encode en AV1 (WebM) et H.264 (MP4) avec poster AVIF. Ressorts en forme fermée pour garder `seek(t)` pur.
- **Images via `astro:assets` (sharp).** AVIF + WebP, `srcset` multi-largeurs, dimensions explicites contre le CLS.
- **i18n par routes.** FR à la racine, EN sous `/en`, contenu FR/EN dans les mêmes fichiers de données pour garantir la parité.
- **Tests standard.** Playwright (parcours, débordement, clavier, 404, en-têtes) et `@axe-core/playwright`. Lighthouse CI en local sur le build.
- **Canonique apex.** Redirect Rule Cloudflare `www` vers apex en 301, en conservant chemin et query.

## Risks / Trade-offs

- Coupure DNS de quelques secondes à la bascule. Mitigation : validation préalable sur `*.workers.dev`, rollback en recréant les deux enregistrements Vercel tant que le projet existe.
- Changement de canonique `www` vers apex : Google réattribue les signaux via la 301, perte transitoire possible de quelques jours.
- Vidéos coûteuses en temps de rendu : si le délai déborde, les posters statiques les remplacent.
- CSP : Astro injecte des scripts inline pour les îlots. Mitigation : hashes CSP générés par Astro si disponibles, sinon `script-src 'self'` avec scripts externalisés.

## Migration Plan

1. Branche `rebuild`, build et tests verts.
2. Déploiement Worker sur `jules-portfolio.<compte>.workers.dev`, validation.
3. Suppression des enregistrements A apex et CNAME www Vercel, ajout des custom domains du Worker, Redirect Rule www.
4. Vérification HTTP (200 apex, 301 www, en-têtes), merge sur `main`.
5. Suppression du projet Vercel et des TXT `_vercel`.

Rollback : recréer `A @ 216.198.79.1` et `CNAME www → 4851f96a6e3888d8.vercel-dns-017.com` avant suppression du projet Vercel.
