export type ProjectArticleContent = {
  id: string;
  role: { en: string; fr: string };
  timeline: { en: string; fr: string };
  clientOrContext: { en: string; fr: string };
  infrastructure: { en: string; fr: string };
  headline: { en: string; fr: string };
  summary: { en: string; fr: string };
  problemTitle: { en: string; fr: string };
  problemBody: { en: string; fr: string };
  architectureTitle: { en: string; fr: string };
  architectureBody: { en: string; fr: string };
  challengesTitle: { en: string; fr: string };
  challenges: Array<{ en: string; fr: string }>;
  metricsTitle: { en: string; fr: string };
  metrics: Array<{ label: { en: string; fr: string }; value: string }>;
};

export const PROJECT_ARTICLES: Record<string, ProjectArticleContent> = {
  hermes: {
    id: "hermes",
    role: { en: "Autonomous Systems Architect", fr: "Architecte Systèmes Autonomes" },
    timeline: { en: "2026", fr: "2026" },
    clientOrContext: { en: "Personal Cloud Infrastructure", fr: "Infrastructure Cloud Personnelle" },
    infrastructure: { en: "Oracle Cloud VPS • Dokploy • Traefik • Docker", fr: "VPS Oracle Cloud • Dokploy • Traefik • Docker" },
    headline: {
      en: "Engineering a Self-Hosted Autonomous Agent Runtime on Oracle Cloud",
      fr: "Conception d'un Démon d'Agent IA Autonome Auto-hébergé sur Oracle Cloud",
    },
    summary: {
      en: "Deployment of an autonomous background AI agent capable of orchestrating multi-step engineering tasks, environment self-healing, and persistent context management through SQLite.",
      fr: "Déploiement d'un agent IA autonome en tâche de fond capable d'orchestrer des tâches d'ingénierie complexes, de s'auto-corriger et de maintenir un contexte persistant via SQLite.",
    },
    problemTitle: {
      en: "The Challenge: Reliable, Always-On Agent Execution Without Vendor Lock-in",
      fr: "La Problématique : Une Exécution Agentique Permanente et Fiable Sans Dépendance Propriétaire",
    },
    problemBody: {
      en: "Standard cloud AI platforms charge steep premiums for long-running workflows and restrict access to low-level shell commands and local file systems. The goal was to build a dedicated, self-hosted execution environment running continuously on an Oracle Cloud instance, governed by Traefik reverse-proxy and orchestrated with Dokploy.",
      fr: "Les plateformes d'IA propriétaires imposent des coûts élevés pour les exécutions longues et restreignent l'accès aux commandes shell système et au système de fichiers. L'objectif était de construire un environnement d'exécution autonome dédié, tournant en continu sur une instance Oracle Cloud, sécurisé par Traefik et orchestré avec Dokploy.",
    },
    architectureTitle: {
      en: "Target Architecture & Tool Registry",
      fr: "Architecture Cible & Registre d'Outils",
    },
    architectureBody: {
      en: "Hermes operates with an asynchronous execution loop connected to an isolated Docker engine. When a task is accepted, subagents are spawned with scoped tool permissions: Docker container control, shell commands, file read/write, and Dokploy API endpoints. All state mutations and execution trees are committed to an encrypted SQLite database.",
      fr: "Hermes fonctionne selon une boucle d'exécution asynchrone connectée à un moteur Docker isolé. Lorsqu'une tâche est acceptée, des sous-agents sont instanciés avec des permissions d'outils strictes : contrôle des conteneurs Docker, commandes shell, lectures/écritures et appels API Dokploy. Toutes les mutations d'état et arborescences d'exécution sont enregistrées dans une base SQLite chiffrée.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis Techniques Clés",
    },
    challenges: [
      {
        en: "Preventing infinite reasoning loops by implementing budget-aware halting heuristics and tool call throttles.",
        fr: "Prévention des boucles de raisonnement infinies grâce à des heuristiques d'arrêt basées sur le budget de tokens et la limitation du rythme d'appels d'outils.",
      },
      {
        en: "Preserving session memory across daemon reboots without bloating prompt context window.",
        fr: "Préservation de la mémoire de session à travers les redémarrages du démon sans saturer la fenêtre de contexte des prompts.",
      },
      {
        en: "Hardening reverse-proxy ingress with Cloudflare mTLS and Dokploy token authentication.",
        fr: "Sécurisation des accès entrants avec Cloudflare mTLS et authentification par jetons Dokploy.",
      },
    ],
    metricsTitle: { en: "Operational Metrics", fr: "Métriques Opérationnelles" },
    metrics: [
      { label: { en: "Uptime", fr: "Disponibilité" }, value: "99.98%" },
      { label: { en: "Daily tool calls", fr: "Appels d'outils / jour" }, value: "1,800+" },
      { label: { en: "Context retrieval latency", fr: "Latence lecture contexte" }, value: "< 4ms" },
      { label: { en: "Active subagents", fr: "Sous-agents parallèles" }, value: "4 concurrent" },
    ],
  },
  omniroute: {
    id: "omniroute",
    role: { en: "Cloud & Network Engineer", fr: "Ingénieur Cloud & Réseau" },
    timeline: { en: "2026", fr: "2026" },
    clientOrContext: { en: "High-Performance Edge Architecture", fr: "Architecture Edge Haute Performance" },
    infrastructure: { en: "Node.js • Redis • Cloudflare Workers • Traefik", fr: "Node.js • Redis • Cloudflare Workers • Traefik" },
    headline: {
      en: "Omniroute: Low-Latency Multi-Model AI Gateway with Semantic Caching",
      fr: "Omniroute : Passerelle d'IA Multi-Modèles à Faible Latence avec Cache Sémantique",
    },
    summary: {
      en: "Designed a sub-15ms AI model proxy normalizing OpenAI and Anthropic requests with real-time health checks, Redis semantic caching, and dynamic token routing.",
      fr: "Conception d'une passerelle d'inférence sous 15ms normalisant les requêtes OpenAI et Anthropic avec supervision temps réel, cache sémantique Redis et routage dynamique.",
    },
    problemTitle: {
      en: "The Challenge: Eliminating Provider Outages and Redundant LLM Invocations",
      fr: "La Problématique : Éliminer les Pannes Fournisseurs et les Invocations Redondantes",
    },
    problemBody: {
      en: "Applications relying directly on upstream LLM APIs face frequent latency spikes, rate limits, and breaking schema differences. Omniroute was designed as a unified ingress layer that normalizes schemas, caches identical or semantically similar prompts in Redis, and automatically falls back to secondary models if latency exceeds thresholds.",
      fr: "Les applications connectées directement aux APIs d'IA subissent des pics de latence, des dépassements de quotas et des divergences de schémas. Omniroute a été conçu comme une couche d'entrée unifiée qui normalise les payloads, met en cache les prompts identiques ou sémantiquement proches dans Redis et bascule automatiquement sur un modèle secondaire en cas de dépassement de seuil.",
    },
    architectureTitle: {
      en: "Streaming Edge Architecture",
      fr: "Architecture Streaming Edge",
    },
    architectureBody: {
      en: "Incoming requests arrive via Cloudflare Edge with SSL termination and rate-limiting. A Node.js streaming proxy parses token streams chunk by chunk with zero buffer allocation, calculating real-time TTFT (Time to First Token) and storing normalized vector hashes in Redis.",
      fr: "Les requêtes arrivent via le réseau Cloudflare avec terminaison SSL et limitation de débit. Un proxy de streaming Node.js analyse les flux de tokens morceau par morceau sans allocation de tampon intermédiaire, mesurant en temps réel le TTFT (Time to First Token) et indexant les hashs vectoriels dans Redis.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis Techniques Clés",
    },
    challenges: [
      {
        en: "Maintaining Server-Sent Events (SSE) stream integrity while calculating token consumption in-flight.",
        fr: "Maintien de l'intégrité du streaming SSE (Server-Sent Events) tout en calculant la consommation de tokens au fil de l'eau.",
      },
      {
        en: "Semantic cache invalidation strategies based on temperature and query randomness.",
        fr: "Stratégies d'invalidation du cache sémantique selon la température et l'aléa des requêtes.",
      },
    ],
    metricsTitle: { en: "Performance Highlights", fr: "Performances Clés" },
    metrics: [
      { label: { en: "Proxy overhead", fr: "Surcoût de routage" }, value: "< 14ms" },
      { label: { en: "Cache hit ratio", fr: "Taux de succès cache" }, value: "38.4%" },
      { label: { en: "Failover latency", fr: "Bascule automatique" }, value: "< 180ms" },
      { label: { en: "Throughput", fr: "Débit supporté" }, value: "1,200 req/min" },
    ],
  },
  "m2c-flows": {
    id: "m2c-flows",
    role: { en: "Cloud Architect", fr: "Architecte Cloud" },
    timeline: { en: "2025 to 2026", fr: "2025 à 2026" },
    clientOrContext: { en: "Orange DSI • Internal Enterprise Migration", fr: "Orange DSI • Migration SI Entreprise" },
    infrastructure: { en: "Azure Container Apps • Private Endpoints • GitLab CI", fr: "Azure Container Apps • Private Endpoints • GitLab CI" },
    headline: {
      en: "M2C Flows: Interactive Dependency Graph & Cloud Migration Simulator",
      fr: "M2C Flows : Cartographie Interactive et Simulateur de Migration vers Azure",
    },
    summary: {
      en: "Built a stateless digital twin mapping complex enterprise IT dependencies, simulating cloud migration strategies to Azure, and analyzing network latency risks between on-premise datacenters and cloud regions.",
      fr: "Création d'un jumeau numérique stateless cartographiant les dépendances complexes du SI, simulant les scénarios de migration vers Azure et mesurant les impacts réseau inter-datacenters.",
    },
    problemTitle: {
      en: "The Challenge: De-risking Multi-Tier Application Migration",
      fr: "La Problématique : Sécuriser la Migration d'Applications Multi-Niveaux",
    },
    problemBody: {
      en: "Enterprise applications frequently communicate with dozens of legacy backends across physical datacenters. Migrating a single frontend or API to Azure Container Apps without accounting for inter-tier latency can degrade response times from 5ms to 80ms+. M2C Flows allows architects to visualize and simulate these topological shifts before modifying infrastructure.",
      fr: "Les applications d'entreprise échangent en continu avec des dizaines de serveurs historiques répartis dans différents datacenters. Migrer une API vers Azure sans anticiper la latence inter-niveaux peut dégrader les temps de réponse de 5ms à plus de 80ms. M2C Flows permet aux architectes de visualiser et simuler ces impacts avant tout déploiement.",
    },
    architectureTitle: {
      en: "Client-Side Graph Simulation Engine",
      fr: "Moteur de Simulation Graphique Côté Client",
    },
    architectureBody: {
      en: "To comply with strict enterprise data protection guidelines, M2C Flows runs entirely in the browser using zero telemetry. Network graphs, database topologies, and latency matrices are rendered using SVG and canvas layers, with instant scenario export for Technical Architecture Dossiers (DAT).",
      fr: "Pour respecter les normes strictes de protection des données d'Orange, M2C Flows s'exécute intégralement dans le navigateur sans télémétrie externe. Les graphes de réseau, topologies de base de données et matrices de latence sont calculés via des couches SVG et canvas, avec export instantané pour les dossiers d'architecture technique (DAT).",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis Techniques Clés",
    },
    challenges: [
      {
        en: "Rendering massive graphs with 500+ interconnected microservices without UI thread freeze.",
        fr: "Rendu fluide de graphes de plus de 500 microservices interconnectés sans blocage du thread principal.",
      },
      {
        en: "Accurately modeling Azure ExpressRoute and VPN Gateway latency hops.",
        fr: "Modélisation fidèle des sauts de latence Azure ExpressRoute et des passerelles VPN.",
      },
    ],
    metricsTitle: { en: "Enterprise Impact", fr: "Impact Entreprise" },
    metrics: [
      { label: { en: "Simulated applications", fr: "Applications modélisées" }, value: "45+" },
      { label: { en: "Planning time saved", fr: "Temps d'étude gagné" }, value: "- 60%" },
      { label: { en: "Latency regressions detected", fr: "Goulots d'étranglement évités" }, value: "12 identified" },
      { label: { en: "Architecture data privacy", fr: "Confidentialité données" }, value: "100% in-browser" },
    ],
  },
  "opencode-harness": {
    id: "opencode-harness",
    role: { en: "Tooling & Systems Engineer", fr: "Ingénieur Outillage & Systèmes" },
    timeline: { en: "2025 to 2026", fr: "2025 à 2026" },
    clientOrContext: { en: "Autonomous Engineering Productivity", fr: "Productivité Ingénierie Autonome" },
    infrastructure: { en: "Rust • TypeScript • OpenCode • Claude Code", fr: "Rust • TypeScript • OpenCode • Claude Code" },
    headline: {
      en: "Agentic Engineering Runtime: Autonomous Coding Harness with RTK & MCP",
      fr: "Harness d'Ingénierie Agentique : Runtime Autonome avec RTK et Orchestration MCP",
    },
    summary: {
      en: "Engineered a high-efficiency development harness integrating Rust-based RTK token compression, structured session memory checkpoints, and specialized MCP servers for automated coding workflows.",
      fr: "Développement d'un environnement de travail haute performance intégrant le compresseur de tokens RTK en Rust, la sauvegarde de mémoire de session et des serveurs MCP sur mesure.",
    },
    problemTitle: {
      en: "The Challenge: Context Window Fatigue and Agent Drift",
      fr: "La Problématique : Saturation du Contexte et Dérive des Modèles",
    },
    problemBody: {
      en: "During prolonged coding tasks, agent context windows fill rapidly with verbose git diffs, directory trees, and compilation logs, resulting in degraded reasoning and exorbitant token costs. This project provides a compression filter written in Rust that compacts shell outputs before LLM ingestion, while persisting architectural decisions in a local session ledger.",
      fr: "Lors de tâches de développement longues, le contexte de l'agent sature rapidement de diffs git volumineux, d'arborescences et de logs de compilation, entraînant une perte de précision et une surconsommation de tokens. Ce projet apporte un filtre de compression en Rust qui condense les sorties terminal avant injection dans l'IA, tout en consignant les décisions d'architecture dans un registre local.",
    },
    architectureTitle: {
      en: "Plugin Architecture & Intercept Loops",
      fr: "Architecture de Plugins & Boucles d'Interception",
    },
    architectureBody: {
      en: "The harness intercepts standard CLI commands, routes git operations through `rtk git`, and enriches agent queries with contextual documentation from specialized skills without injecting entire codebases into prompts.",
      fr: "Le harness intercepte les commandes CLI courantes, route les opérations git vers `rtk git`, et injecte des fragments de documentation ciblés via des skills spécialisés sans charger inutilement l'intégralité du dépôt dans le prompt.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis Techniques Clés",
    },
    challenges: [
      {
        en: "Preserving crucial error messages while stripping 70%+ of redundant shell noise.",
        fr: "Préservation des messages d'erreur critiques tout en éliminant plus de 70% du bruit terminal superflu.",
      },
      {
        en: "Building a rock-solid session checkpointing system with rollback capabilities.",
        fr: "Conception d'un mécanisme fiable de points de contrôle de session avec reprise après interruption.",
      },
    ],
    metricsTitle: { en: "Efficiency Gains", fr: "Gains d'Efficacité" },
    metrics: [
      { label: { en: "Token consumption", fr: "Réduction des tokens" }, value: "- 65%" },
      { label: { en: "Task completion rate", fr: "Taux de réussite des tâches" }, value: "94%" },
      { label: { en: "CLI intercept latency", fr: "Latence d'interception" }, value: "< 2ms" },
      { label: { en: "Memory recall speed", fr: "Recherche mémoire" }, value: "Instant" },
    ],
  },
  shopeen: {
    id: "shopeen",
    role: { en: "Full Stack Engineer (Apprenticeship)", fr: "Ingénieur Full Stack (Apprentissage)" },
    timeline: { en: "2022 to 2025", fr: "2022 à 2025" },
    clientOrContext: { en: "Orange Online Store Team", fr: "Équipe Boutique en Ligne Orange" },
    infrastructure: { en: "Spring Boot • Kotlin • Svelte • MongoDB • Kubernetes", fr: "Spring Boot • Kotlin • Svelte • MongoDB • Kubernetes" },
    headline: {
      en: "Enterprise Carbon Footprint Calculator for Telecom E-Commerce",
      fr: "Calculateur d'Empreinte Carbone pour l'Infrastructure E-Commerce Télécom",
    },
    summary: {
      en: "Developed an internal platform evaluating the greenhouse gas emissions and electrical consumption of server racks, microservices, and network hardware powering the Orange web store.",
      fr: "Développement d'une plateforme interne évaluant les émissions de gaz à effet de serre et la consommation électrique des serveurs, microservices et équipements réseau de la boutique Orange.",
    },
    problemTitle: {
      en: "The Challenge: Quantifying Microservice Environmental Impact",
      fr: "La Problématique : Quantifier l'Impact Écologique d'une Architecture Microservices",
    },
    problemBody: {
      en: "Evaluating the environmental footprint of an e-commerce platform serving 600,000+ yearly visitors requires factoring in CPU utilization, memory allocation, storage lifecycles, and datacenter PUE (Power Usage Effectiveness). Shopeen provided a standardized calculator adhering to INR standards.",
      fr: "Évaluer l'empreinte environnementale d'une boutique servant plus de 600 000 visiteurs par an nécessite d'agréger utilisation CPU, allocation mémoire, cycles de vie des disques et PUE des datacenters. Shopeen a fourni un calculateur standardisé conforme aux normes de l'Institut du Numérique Responsable.",
    },
    architectureTitle: {
      en: "Reactive Full-Stack Architecture",
      fr: "Architecture Réactive Full-Stack",
    },
    architectureBody: {
      en: "Built with a Spring Boot and Kotlin reactive backend, paired with Svelte on the frontend for minimal client-side JavaScript execution overhead. Data pipelines ingest hardware telemetry into MongoDB with automated aggregation jobs.",
      fr: "Conçu avec un backend réactif Spring Boot et Kotlin, couplé à Svelte sur le frontend pour minimiser l'exécution JavaScript côté client. Les pipelines ingèrent la télémétrie matérielle dans MongoDB avec des traitements d'agrégation automatisés.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis Techniques Clés",
    },
    challenges: [
      {
        en: "Aligning algorithmic models with French ADEME carbon emission emission factors.",
        fr: "Harmonisation des modèles de calcul avec la base de données facteurs d'émission de l'ADEME.",
      },
      {
        en: "High test coverage (85%+) with JUnit, Hurl, and Cypress in GitLab CI.",
        fr: "Couverture de tests élevée (> 85%) avec JUnit, Hurl et Cypress dans GitLab CI.",
      },
    ],
    metricsTitle: { en: "Key Results", fr: "Résultats Clés" },
    metrics: [
      { label: { en: "Yearly visitors analyzed", fr: "Visiteurs annuels analysés" }, value: "600,000+" },
      { label: { en: "Test coverage", fr: "Couverture de tests" }, value: "87%" },
      { label: { en: "Bundle size", fr: "Poids du bundle frontend" }, value: "< 45 KB" },
      { label: { en: "Compliance", fr: "Conformité" }, value: "INR & Green IT" },
    ],
  },
  stakeirb: {
    id: "stakeirb",
    role: { en: "Lead Backend & Real-Time Architect", fr: "Développeur Backend & Architecte Temps Réel" },
    timeline: { en: "2023", fr: "2023" },
    clientOrContext: { en: "ENSEIRB-MATMECA Academic Engineering Project", fr: "Projet d'Ingénierie ENSEIRB-MATMECA" },
    infrastructure: { en: "Node.js • Express • Socket.io • SQLite • Vue.js", fr: "Node.js • Express • Socket.io • SQLite • Vue.js" },
    headline: {
      en: "Stak'eirb: High-Frequency Real-Time Multiplayer Gaming Platform",
      fr: "Stak'eirb : Plateforme de Jeux Multijoueur Temps Réel Haute Fréquence",
    },
    summary: {
      en: "Architected a full-stack real-time gaming simulator featuring bidirectional WebSocket event broadcasting, ACID transaction isolation, and provably fair cryptographic randomness.",
      fr: "Architecture d'un simulateur de jeux en ligne avec diffusion bidirectionnelle WebSocket, isolation des transactions ACID et équité cryptographique démontrable.",
    },
    problemTitle: {
      en: "The Challenge: State Synchronization and Concurrency Under Load",
      fr: "La Problématique : Synchronisation d'État et Concurrence en Charge",
    },
    problemBody: {
      en: "Multiplayer wagering platforms must eliminate race conditions such as double-spending virtual credits while maintaining millisecond-level responsiveness for simultaneous users across game rooms.",
      fr: "Les plateformes multijoueur doivent éliminer tout risque de course critique comme la double dépense de jetons, tout en garantissant une réactivité de l'ordre de la milliseconde pour les utilisateurs connectés simultanément dans différentes salles.",
    },
    architectureTitle: {
      en: "WebSocket Room State Machine",
      fr: "Machine d'État WebSocket par Salles",
    },
    architectureBody: {
      en: "Socket.io rooms handle real-time chat, bets, and multipliers. The Express backend enforces atomic database transactions in SQLite with immediate rollback on validation failure, preventing desynchronized client balances.",
      fr: "Les salons Socket.io gèrent le chat, les mises et les multiplicateurs en temps réel. Le serveur Express garantit des transactions atomiques dans SQLite avec annulation immédiate en cas d'erreur de validation, empêchant toute désynchronisation de solde.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis Techniques Clés",
    },
    challenges: [
      {
        en: "Mitigating race conditions when hundreds of WebSocket actions arrive in the same tick.",
        fr: "Élimination des situations de concurrence lorsque des centaines d'actions WebSocket arrivent sur le même intervalle d'horloge.",
      },
      {
        en: "Implementing seed-based provably fair RNG verification algorithms.",
        fr: "Mise en place d'un algorithme de génération pseudo-aléatoire vérifiable par graine cryptographique.",
      },
    ],
    metricsTitle: { en: "Platform Performance", fr: "Performances Plateforme" },
    metrics: [
      { label: { en: "Socket latency", fr: "Latence WebSocket" }, value: "< 20ms" },
      { label: { en: "Transaction rollback rate", fr: "Taux d'erreur transaction" }, value: "0% in testing" },
      { label: { en: "Concurrent players", fr: "Joueurs simultanés" }, value: "100+ simulated" },
      { label: { en: "Security score", fr: "Score sécurité" }, value: "A+ OWASP" },
    ],
  },
  iplocator: {
    id: "iplocator",
    role: { en: "API & Backend Engineer", fr: "Ingénieur API & Backend" },
    timeline: { en: "2023", fr: "2023" },
    clientOrContext: { en: "Networking Specialization Project", fr: "Projet Spécialité Réseau & Sécurité" },
    infrastructure: { en: "Node.js • Express • MongoDB • Leaflet • Swagger", fr: "Node.js • Express • MongoDB • Leaflet • Swagger" },
    headline: {
      en: "IPLocator: Real-Time Geographic & ASN Network Intelligence Service",
      fr: "IPLocator : Service de Géolocalisation et Renseignement Réseau ASN en Temps Réel",
    },
    summary: {
      en: "Created a high-throughput IP intelligence API and interactive mapping dashboard resolving geographic coordinates, ISP prefixes, and Autonomous System Numbers (ASN).",
      fr: "Création d'une API de renseignement IP et d'un tableau de bord cartographique résolvant coordonnées géographiques, préfixes FAI et numéros d'Autonomous System (ASN).",
    },
    problemTitle: {
      en: "The Challenge: Fast Multi-Source IP Lookups with Fallbacks",
      fr: "La Problématique : Résolution Multi-Sources Rapide avec Stratégie de Secours",
    },
    problemBody: {
      en: "External geolocation APIs often apply strict rate limits and suffer from regional blind spots. The platform addresses this by combining local MaxMind GeoIP lookups with upstream API fallbacks, caching responses in MongoDB to minimize latency.",
      fr: "Les APIs de géolocalisation externes imposent des limites d'appels strictes et présentent des imprécisions régionales. La plateforme combine des recherches locales MaxMind GeoIP avec des replis en ligne, mettant les réponses en cache dans MongoDB pour réduire la latence.",
    },
    architectureTitle: {
      en: "Tiered Cache & Map Integration",
      fr: "Cache Étagé & Cartographie Interactive",
    },
    architectureBody: {
      en: "An Express.js REST API documented with OpenAPI/Swagger serves requests. Frontend client queries render on an interactive Leaflet vector map with reverse DNS resolution and ISP telemetry.",
      fr: "Une API REST Express.js documentée via OpenAPI et Swagger traite les requêtes. Le frontend affiche les résultats sur une carte interactive Leaflet avec résolution DNS inverse et données de routage.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis Techniques Clés",
    },
    challenges: [
      {
        en: "Structuring MongoDB compound indexes for ultra-fast subnet lookups.",
        fr: "Création d'index composés dans MongoDB pour des recherches de sous-réseaux instantanées.",
      },
      {
        en: "Generating live interactive maps without blocking client performance.",
        fr: "Génération de marqueurs cartographiques interactifs sans ralentissement du navigateur.",
      },
    ],
    metricsTitle: { en: "Key Metrics", fr: "Métriques Clés" },
    metrics: [
      { label: { en: "Average response time", fr: "Temps de réponse moyen" }, value: "18ms" },
      { label: { en: "Cache hit response", fr: "Réponse sur cache" }, value: "2ms" },
      { label: { en: "OpenAPI compliant", fr: "Conformité OpenAPI" }, value: "100%" },
      { label: { en: "Global coverage", fr: "Couverture mondiale" }, value: "IPv4 & IPv6" },
    ],
  },
  automatisms: {
    id: "automatisms",
    role: { en: "Developer & Project Manager", fr: "Développeur & Chef de Projet" },
    timeline: { en: "2022", fr: "2022" },
    clientOrContext: { en: "Centre de Gestion de la Fonction Publique Territoriale (CDG33)", fr: "Centre de Gestion de la Fonction Publique Territoriale (CDG33)" },
    infrastructure: { en: "Symfony • PHP • MySQL • Apache • Linux", fr: "Symfony • PHP • MySQL • Apache • Linux" },
    headline: {
      en: "AutomatiSMS: Mission-Critical Broadcast Scheduling & Administration Console",
      fr: "AutomatiSMS : Console d'Administration et Diffusion Programmée de SMS pour le CDG33",
    },
    summary: {
      en: "Designed, delivered, and deployed an administrative web platform handling scheduled SMS dispatches, recipient filtering, and communication audits for territorial public services.",
      fr: "Conception, développement et mise en production d'une plateforme web gérant les envois programmés de SMS, le ciblage des destinataires et l'audit pour le service public territorial.",
    },
    problemTitle: {
      en: "The Challenge: Automating Public Sector Urgent Communications",
      fr: "La Problématique : Automatiser les Communications d'Urgence du Secteur Public",
    },
    problemBody: {
      en: "The CDG33 required a centralized tool to notify thousands of municipal agents regarding urgent announcements, recruitment contests, and regulatory deadlines, replacing manual and fragmented email workflows.",
      fr: "Le CDG33 avait besoin d'un outil centralisé pour notifier des milliers d'agents communaux d'annonces urgentes, de concours administratifs et d'échéances réglementaires, en remplacement de processus manuels fragmentés.",
    },
    architectureTitle: {
      en: "Enterprise MVC Architecture with Queues",
      fr: "Architecture MVC d'Entreprise avec Files d'Attente",
    },
    architectureBody: {
      en: "Built on Symfony with Doctrine ORM and MySQL. Scheduled SMS jobs are staged in background queues processed by cron daemons with SMS provider API failover, complete audit logs, and delivery rate tracking.",
      fr: "Développé avec Symfony, Doctrine ORM et MySQL. Les envois programmés sont placés dans des files d'attente traitées par des tâches cron, avec bascule vers une passerelle SMS de secours et traçabilité complète des statuts de remise.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis Techniques Clés",
    },
    challenges: [
      {
        en: "Managing strict GDPR compliance and recipient consent records.",
        fr: "Respect scrupuleux du RGPD et gestion stricte des consentements des destinataires.",
      },
      {
        en: "Delivering an intuitive administration UI for non-technical civil servants.",
        fr: "Conception d'une interface d'administration claire pour des agents non spécialistes du numérique.",
      },
    ],
    metricsTitle: { en: "Impact at CDG33", fr: "Impact au CDG33" },
    metrics: [
      { label: { en: "Weekly broadcasts", fr: "Envois hebdomadaires" }, value: "1,000+ SMS" },
      { label: { en: "Delivery success rate", fr: "Taux de distribution" }, value: "99.4%" },
      { label: { en: "Deployment environment", fr: "Environnement de prod" }, value: "Linux On-Prem" },
      { label: { en: "Project cycle", fr: "Méthode de gestion" }, value: "Cycle en V" },
    ],
  },
  mijotons: {
    id: "mijotons",
    role: { en: "Android & Mobile Engineer", fr: "Ingénieur Mobile Android" },
    timeline: { en: "2021 to 2022", fr: "2021 à 2022" },
    clientOrContext: { en: "IUT de Bayonne Academic Capstone Project", fr: "Projet de Fin d'Études IUT de Bayonne" },
    infrastructure: { en: "Android SDK • Java • SQLite • OpenStreetMap • Gradle", fr: "Android SDK • Java • SQLite • OpenStreetMap • Gradle" },
    headline: {
      en: "Mijotons: Native Android Recipe Assistant with Supermarket Geolocation",
      fr: "Mijotons : Assistant Mobile Android pour Listes de Courses et Recettes Anti-Gaspillage",
    },
    summary: {
      en: "Engineered a native Android application combining offline grocery checklist management, nearby supermarket routing using OpenStreetMap Overpass API, and dynamic recipe suggestions.",
      fr: "Développement d'une application Android native combinant gestion de listes de courses hors-ligne, géolocalisation des commerces avec OpenStreetMap et suggestions de recettes.",
    },
    problemTitle: {
      en: "The Challenge: Combating Food Waste Through Smart Shopping",
      fr: "La Problématique : Lutter Contre le Gaspillage Alimentaire par des Courses Intelligentes",
    },
    problemBody: {
      en: "Shoppers often buy ingredients without a clear meal plan, leading to household food spoilage. Mijotons bridges the gap by suggesting recipes tailored specifically to the items currently in the user's cart or pantry.",
      fr: "Les consommateurs achètent fréquemment des produits sans planification claire, entraînant un gaspillage domestique important. Mijotons répond à ce problème en proposant des recettes adaptées aux ingrédients présents dans le panier ou le réfrigérateur.",
    },
    architectureTitle: {
      en: "Native Mobile Architecture",
      fr: "Architecture Mobile Native",
    },
    architectureBody: {
      en: "Developed in Java with the Android SDK. Features a local SQLite database for instant offline access and asynchronous HTTP queries to the OpenStreetMap Overpass API for real-time supermarket coordinates.",
      fr: "Développé en Java avec le SDK Android natif. L'application intègre une base de données locale SQLite pour un usage fluide hors-ligne et interroge l'API Overpass d'OpenStreetMap pour localiser les commerces de proximité.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis Techniques Clés",
    },
    challenges: [
      {
        en: "Optimizing battery consumption during GPS location queries.",
        fr: "Optimisation de la consommation de batterie lors des requêtes de géolocalisation GPS.",
      },
      {
        en: "Designing a responsive UI supporting varied Android screen densities.",
        fr: "Conception d'une interface adaptative prenant en charge les multiples résolutions d'écrans Android.",
      },
    ],
    metricsTitle: { en: "App Performance", fr: "Performances Application" },
    metrics: [
      { label: { en: "Offline availability", fr: "Fonctionnement hors-ligne" }, value: "100%" },
      { label: { en: "Cold launch time", fr: "Temps de lancement à froid" }, value: "< 0.8s" },
      { label: { en: "Platform", fr: "Plateforme" }, value: "Android 8.0+" },
      { label: { en: "Map engine", fr: "Moteur de carte" }, value: "OpenStreetMap" },
    ],
  },
  portfolio: {
    id: "portfolio",
    role: { en: "Design Engineer & Creator", fr: "Design Engineer & Créateur" },
    timeline: { en: "2026", fr: "2026" },
    clientOrContext: { en: "Personal Brand & Engineering Showcase", fr: "Marque Personnelle & Vitrine Technique" },
    infrastructure: { en: "Next.js 16 • React 19 • Tailwind CSS v4 • Cloudflare", fr: "Next.js 16 • React 19 • Tailwind CSS v4 • Cloudflare" },
    headline: {
      en: "Crafting an Immersive, High-Performance Developer Portfolio with Next.js 16",
      fr: "Conception d'un Portfolio Développeur Immersif Haute Performance avec Next.js 16",
    },
    summary: {
      en: "Architected a state-of-the-art personal engineering portfolio showcasing cloud architectures, autonomous AI agents, interactive 2D physics sandboxes, and bilingual internationalization.",
      fr: "Architecture d'un portfolio d'ingénierie moderne mettant en valeur architectures cloud, agents d'IA autonomes, bac à sable physique 2D et internationalisation bilingue instantanée.",
    },
    problemTitle: {
      en: "The Challenge: Elevating Beyond Generic AI Developer Portfolios",
      fr: "La Problématique : Dépasser les Modèles de Portfolios Génériques",
    },
    problemBody: {
      en: "Most developer portfolios rely on predictable templates with purple gradients and low information density. The goal was to build a distinctive, tactile experience with WebGL shaders, Matter.js physics interactions, and accessible craftsmanship conforming to the strictest performance and SEO standards.",
      fr: "La majorité des portfolios reposent sur des modèles prévisibles à dégradés violets et faible densité d'information. L'objectif était de concevoir une expérience tactile et singulière avec shaders WebGL, physique interactive Matter.js et rigueur d'accessibilité respectant les standards les plus exigeants.",
    },
    architectureTitle: {
      en: "Modern Next.js 16 App Router Stack",
      fr: "Stack Next.js 16 App Router de Pointe",
    },
    architectureBody: {
      en: "Built on Next.js 16 and React 19 with Tailwind CSS v4. Features OGL WebGL shaders with automatic fallbacks for reduced-motion, spring-physics drag interactions, and zero layout shift on view transitions.",
      fr: "Développé avec Next.js 16 et React 19 sous Tailwind CSS v4. Le site intègre des shaders WebGL avec repli accessible pour `prefers-reduced-motion`, un bac à sable d'outils interactif avec Matter.js et zéro décalage de mise en page lors des transitions.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis Techniques Clés",
    },
    challenges: [
      {
        en: "Guaranteeing 60fps physics simulation on low-power mobile devices.",
        fr: "Garantie d'une simulation physique à 60fps sur appareils mobiles économes en énergie.",
      },
      {
        en: "Strict zero-runtime bilingual switching without hydration flicker.",
        fr: "Bascule bilingue instantanée sans scintillement d'hydratation ni rechargement de page.",
      },
    ],
    metricsTitle: { en: "Quality & Performance Audit", fr: "Audit Qualité & Performances" },
    metrics: [
      { label: { en: "Lighthouse Performance", fr: "Score Performance" }, value: "100 / 100" },
      { label: { en: "Accessibility", fr: "Accessibilité" }, value: "100 / 100" },
      { label: { en: "Cumulative Layout Shift", fr: "Décalage de mise en page" }, value: "0.000" },
      { label: { en: "SEO & AEO Readiness", fr: "Préparation SEO & IA" }, value: "llms.txt + JSON-LD" },
    ],
  },
};
