## Why

Le portfolio actuel (Next.js 16 sur Vercel) mesure 59 en performance mobile sur l'accueil (LCP 4,9 s, TBT 1 120 ms) et son design ne porte pas l'identité d'un architecte cloud et IA. Le DNS est déjà chez Cloudflare : servir le site depuis un Worker statique supprime un fournisseur, rapproche le contenu des visiteurs et simplifie la sécurité. On repart de zéro côté code et design, en ne gardant que le contenu brut.

## What Changes

- **BREAKING** Suppression complète de l'application Next.js (app/, components/, lib/, configuration Vercel).
- Nouveau site Astro statique, mobile-first, bilingue FR (racine) et EN (`/en`), avec les mêmes URLs publiques.
- Pipeline médias : images AVIF/WebP responsives, tuiles de cartes générées, vidéos motion design rendues image par image.
- Expérience animée : splash, curseur personnalisé, transitions entre pages, animations pilotées par le scroll, fond vidéo, 404 animée. Tout reste utilisable sans animation.
- SEO, AEO et GEO : métadonnées par page, JSON-LD fidèle au contenu, hreflang, sitemap, maillage interne, `llms.txt`.
- Hébergement sur Cloudflare Workers Static Assets avec en-têtes de sécurité, domaine canonique sur l'apex `julesroyet.dev` et redirection 301 de `www`.
- Retrait du projet Vercel après bascule.

## Capabilities

### New Capabilities
- `content-model`: contenu bilingue typé (identité, expériences, formations, certifications, projets, expertises) et regroupement des projets en grappes thématiques.
- `media-pipeline`: optimisation et génération des images et vidéos servies par le site.
- `site-experience`: pages, navigation, animations, splash, curseur, transitions, 404, accessibilité et performance.
- `seo-geo`: référencement classique, données structurées et lisibilité par les moteurs IA.
- `hosting-security`: déploiement Cloudflare, en-têtes HTTP, cache, DNS et redirections.

### Modified Capabilities

Aucune (pas de spec existante).

## Impact

- Code : remplacement total du dépôt, l'historique git reste.
- Infra : enregistrements DNS apex et www de la zone `julesroyet.dev`, nouveau Worker `jules-portfolio`, suppression du projet Vercel. Les sous-domaines du tunnel (dokploy, hermes, iplocator, ssh, stakeirb) ne sont pas touchés.
- SEO : URLs conservées, le canonique passe de `www` à l'apex avec redirection 301.

## Non-goals

- Pas de CMS, pas de back-end, pas de formulaire de contact (le mail suffit).
- Pas de réécriture du contenu éditorial ni des chiffres des études de cas.
- Pas de modification du CV PDF.
