# Interactions

- Clic global : React Bits Click Spark adapté au viewport. Huit traits, 400 ms, ease-out. Aucun RAF au repos. N’intercepte pas les liens ou le défilement. Pas d’effet en reduced motion.
- Cadre du portrait : React Bits Star Border, deux passages cuivre en cinq secondes, sans déplacement de la cible. Libellé explicite au-dessous, adapté au pointeur. Repli statique en reduced motion et contraste forcé.
- Portrait : bouton natif accessible au clavier. Un clic/tap inverse l’état, indépendamment de la pression. Le survol ne s’applique qu’à la souris. Shader existant initialisé à l’interaction, RAF arrêté à convergence et nettoyé au démontage. Image HTML de repli si WebGL est indisponible ou en reduced motion.
- Polaroids : entrée courte et légère inclinaison au survol, même contenu sur tactile. Suppression du mouvement en reduced motion.
- Casa Mocha : apparition unique avec rotation/échelle légère, 450 ms ; survol et focus sur le logo, 200 ms. Repli sans mouvement.
- Entrées de contenu : CSS dès le rendu HTML, sans attendre l’hydratation pour afficher les textes. Reduced motion désactive les animations.
- Stack physique : activation à proximité de la section, arrêt hors écran et onglet masqué. Liste statique en reduced motion.
