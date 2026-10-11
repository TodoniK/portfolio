# Décisions

- **Stack** : Astro statique (change OpenSpec `rebuild-portfolio`), servi par Cloudflare Workers Static Assets. Next.js et Vercel quittés le 2026-10-11.
- **Domaine canonique** : apex `https://julesroyet.dev` (custom domain du Worker). `www.julesroyet.dev` redirige en 301 avec chemin et query (Redirect Rule gérée dans `casa-mocha-infra`).
- **CI/CD** : `.github/workflows/ci.yml` : build (images OG avec Chromium) et tests Playwright sur chaque PR et sur `main`. Preview (`wrangler versions upload`) sur les PR, `wrangler deploy` sur `main`, dès que le secret `CLOUDFLARE_API_TOKEN` existe. Manuel en secours : `npm run deploy`.
- **Mesure d'audience** : Cloudflare Web Analytics, beacon dans `Base.astro` (injection automatique coupée), sans cookie. Les tests neutralisent le beacon.
- **SEO / IA** : robots.txt ouvert aux robots de recherche et d'IA avec `Content-Signal: search=yes, ai-input=yes, ai-train=yes`, sitemap hreflang, `llms.txt` et `llms-full.txt`, JSON-LD par page.
- **Zone Cloudflare** : Speed Brain et Bot Fight Mode désactivés (préchargements en 503 vers un Worker, script injecté incompatible avec la CSP à hashes).
