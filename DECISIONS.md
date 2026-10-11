# Décisions

- **Stack** : Astro statique (change OpenSpec `rebuild-portfolio`), servi par Cloudflare Workers Static Assets. Next.js et Vercel quittés le 2026-10-11.
- **Domaine canonique** : apex `https://julesroyet.dev` (custom domain du Worker). `www.julesroyet.dev` redirige en 301 avec chemin et query (Redirect Rule gérée dans `casa-mocha-infra`).
- **Déploiement** : Workers Builds (intégration Git Cloudflare, app GitHub « Cloudflare Workers and Pages ») : `main` déploie en production, chaque branche et PR obtient une URL de preview et un statut dans GitHub. GitHub Actions (`ci.yml`) lance les tests. Node 24 (`.node-version`). Manuel en secours : `npm run deploy`.
- **Images de partage** : `public/og/*.jpg` générées par `npm run media:og` (Chromium local) et commitées, l'environnement Workers Builds n'a pas de navigateur. À relancer après un ajout de page ou un changement de titre (les tests vérifient leur présence).
- **Mesure d'audience** : Cloudflare Web Analytics, beacon dans `Base.astro` (injection automatique coupée), sans cookie. Les tests neutralisent le beacon.
- **SEO / IA** : robots.txt ouvert aux robots de recherche et d'IA avec `Content-Signal: search=yes, ai-input=yes, ai-train=yes`, sitemap hreflang, `llms.txt` et `llms-full.txt`, JSON-LD par page.
- **Zone Cloudflare** : Speed Brain et Bot Fight Mode désactivés (préchargements en 503 vers un Worker, script injecté incompatible avec la CSP à hashes).
