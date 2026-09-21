import { NextResponse } from "next/server";

const LLMS_FULL_TEXT = `# Profil Technique Détaillé : Jules Royet

> Consolidation technique complète du profil de Jules Royet, Architecte Cloud & DevOps chez Orange et Ingénieur Logiciel diplômé de l'ENSEIRB-MATMECA.

## Identité & Positionnement

- Nom : Jules Royet
- Rôle actuel : Architecte Cloud & DevOps chez Orange (DSI Orange France, équipe Move To Cloud)
- Formation : Diplôme d'ingénieur en Informatique et Réseaux de l'ENSEIRB-MATMECA (2022 à 2025)
- Localisation : Bordeaux, Nouvelle-Aquitaine, France (Résidence) / Nice, France (Mission)
- Contact : jules.royet.pc@gmail.com
- Portfolio : https://julesroyet.dev
- Profils publics : LinkedIn (linkedin.com/in/jules-royet), GitHub (github.com/todonik), Root-Me (root-me.org/ROYET)

## Parcours Professionnel

### Orange : Architecte Cloud & DevOps
- Période : Depuis le 1er septembre 2025
- Périmètre : Équipe Move To Cloud (LFY / DEFY / DSI Orange France)
- Mission : Accompagnement des équipes applicatives dans leurs migrations SI vers Azure et les environnements On-Premise pérennes Orange.
- Responsabilités :
  - Conception de l'architecture cible : schémas techniques, matrices de flux et building blocks cloud.
  - Préparation des scénarios de bascule et migration de données.
  - Consolidation du DAT : sécurité, HA/PRA, scalabilité et observabilité fondée sur des SLO.
  - Validation FinOps et chiffrage soumis au Comité FinOps.
  - Accompagnement des déploiements : ConfigRules, sécurité et tests de performance.
  - Revues post-production à J+30 : analyse des coûts réels et optimisations.
- Stack cloud : Azure Container Apps (ACA), Azure Kubernetes Service (AKS), Application Gateway WAF v2, Azure Virtual Network (VNet), Private Endpoints, Azure Container Registry (ACR), Azure Key Vault, Azure Cosmos DB, Azure Monitor, Event Hub, Azure Bastion, Terraform.
- Outillage & Innovation :
  - M2C Flows : application web stateless (GitLab Pages & on-premise) agissant comme un jumeau numérique du SI pour visualiser les dépendances multi-couches, simuler des migrations et analyser les impacts de latence.
  - Claude Code & OpenCode : automatisation des relances, rédaction de DAT et optimisation de workflows via mémoire Obsidian, RTK et plugins sur mesure.

### Orange : Ingénieur Logiciel
- Période : 1er septembre 2022 au 31 août 2025 (3 ans, apprentissage ENSEIRB-MATMECA)
- Localisation : Bordeaux, France
- Réalisations :
  - Développement de solutions web full stack pour la boutique en ligne Orange (+600 000 visiteurs par an) en Spring Boot, Kotlin, Svelte, Node.js et MongoDB.
  - Intégration de l'IA générative (GPT-4o, LiteLLM) dans le back-end pour automatiser la création de contenu de fiches produits, réduisant le temps de mise en ligne de 75% (de 1h à 15min).
  - Stratégie de tests : tests unitaires JUnit, tests d'intégration Hurl et tests end-to-end Cypress.
  - Déploiement de pipelines CI/CD GitLab, conteneurisation Docker et orchestration Kubernetes.

### Market Control : Ingénieur Logiciel
- Période : Mai 2023 à Août 2023 (4 mois)
- Localisation : Barcelone, Catalogne, Espagne
- Réalisations :
  - Migration d'un système de suivi commercial PHP vers une application web moderne et responsive en OpenUI5.
  - Réduction de 40% du temps de chargement des pages.
  - Tests automatisés avec Opa5 (couverture de 87%).
  - Pipelines CI/CD avec GitHub Actions, conteneurisation Docker et déploiement SAP BTP avec bases SAP HANA et MariaDB.

### CDG33 : Développeur et Chef de Projet
- Période : Avril 2022 à Juin 2022 (3 mois)
- Localisation : Bordeaux, France
- Réalisations :
  - Conception et développement d'une application web de planification d'envois SMS (+1000 messages hebdomadaires) en PHP Symfony, MySQL et Doctrine ORM.
  - Modélisation logicielle UML et Merise.
  - Réalisation d'un démonstrateur de chatbot pour le site public du CDG33.

## Écosystème Personnel & Infrastructure Autonome

- Serveur Cloud : VPS Oracle Cloud hébergé en France et sécurisé par Cloudflare.
- Orchestration : Dokploy PaaS, Traefik Reverse Proxy avec certificats TLS automatiques.
- Hermes Agent : Démon d'agent IA autonome avec dashboard web (https://hermes.julesroyet.dev) et API REST (https://hermes-api.julesroyet.dev).
- Omniroute : Passerelle de routage d'IA avec cache sémantique Redis et bascule multi-modèles (https://omniroute.julesroyet.dev).
- Harness OpenCode : Plugin de persistance de session, compresseur de tokens RTK écrit en Rust, hooks d'ingénierie déterministe.

## Formations & Certifications

- ENSEIRB-MATMECA : Diplôme d'ingénieur en Informatique et Réseaux (2022 à 2025)
- IUT de Bayonne et du Pays Basque : DUT Informatique (2020 à 2022)
- AZ-900 : Microsoft Azure Fundamentals (2025)
- Infrastructure Automation with Terraform : HashiCorp (2025)
- AWS Cloud Technical Essentials : Amazon Web Services (2025)
- TOEIC : Score C1 / Full Professional (2024 à 2026)
`;

export async function GET(): Promise<NextResponse> {
  return new NextResponse(LLMS_FULL_TEXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
