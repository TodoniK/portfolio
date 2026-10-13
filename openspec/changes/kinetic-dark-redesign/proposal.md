# Proposition : kinetic-dark-redesign

## Why

La direction « Apple-like » livrée par `rebuild-portfolio` va trop loin dans l'imitation. Retours du propriétaire, et constats faits sur le site en ligne le 2026-10-13 :

- Titres trop gros (hero jusqu'à 9,5 rem, titres de section jusqu'à 5 rem), pages chargées.
- Projets de l'accueil peu lisibles : bento à tailles inégales, longues descriptions, tuiles abstraites qui ne disent rien de la stack.
- Manifeste de 44 mots en 3,75 rem, difficile à lire.
- Vidéos de fond (environ 2 Mo) peu parlantes pour présenter des projets.
- Curseur TargetCursor hors du ton minimaliste.
- Bugs : fil d'Ariane désaligné, header resté noir et bande noire après la section épinglée, contenu masqué tant qu'il n'a pas défilé, favicon étiré dans les résultats Google.

## What Changes

- Thème sombre dominant, minimal et cinétique. Inter et le memoji sont conservés.
- Échelle typographique réduite d'environ 40 %.
- Fond Aurora (React Bits) porté en WebGL2 natif dans le hero et le bandeau de contact, avec repli CSS statique.
- **BREAKING** : suppression du curseur personnalisé, des vidéos de fond, de ScrollVelocity et de la section expertises épinglée.
- Vignettes de projets standardisées, rendues en code à partir des logos officiels de la stack, à la place des tuiles PNG.
- Accueil allégé : manifeste en une phrase, six projets en grille uniforme, expertises en cartes simples.
- Corrections : fil d'Ariane, contenu visible sans script, icônes du site conformes aux recommandations Google.
- Fiche projet « portfolio » mise à jour (le site n'utilise plus Next.js).

## Capabilities

### Modified Capabilities

- `site-experience` : direction visuelle, fond animé, accueil, curseur, mouvement réduit, performance.
- `media-pipeline` : vignettes en code, fin des tuiles et des vidéos, icônes du site.
- `content-model` : manifeste court et correction de la fiche portfolio autorisés.

## Impact

- Code : `global.css`, `app.ts`, `motion.ts`, layout, composants et vues.
- Assets supprimés : `public/video/`, `src/assets/tiles/`, `src/assets/video/`, scripts `video.mjs` et `tiles.mjs`.
- Images OG régénérées.
- Aucune URL ne change.

## Non-goals

- Pas de bascule clair/sombre.
- Pas de runtime React.
- Pas de réécriture des études de cas, sauf la fiche portfolio devenue inexacte.
