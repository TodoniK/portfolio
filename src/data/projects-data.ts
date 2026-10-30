export type ProjectArticleContent = {
  id: string;
  role: { en: string; fr: string; es: string };
  timeline: { en: string; fr: string; es: string };
  clientOrContext: { en: string; fr: string; es: string };
  infrastructure: { en: string; fr: string; es: string };
  headline: { en: string; fr: string; es: string };
  summary: { en: string; fr: string; es: string };
  problemTitle: { en: string; fr: string; es: string };
  problemBody: { en: string; fr: string; es: string };
  architectureTitle: { en: string; fr: string; es: string };
  architectureBody: { en: string; fr: string; es: string };
  challengesTitle: { en: string; fr: string; es: string };
  challenges: Array<{ en: string; fr: string; es: string }>;
  metricsTitle: { en: string; fr: string; es: string };
  metrics: Array<{ label: { en: string; fr: string; es: string }; value: string }>;
};

export const PROJECT_ARTICLES: Record<string, ProjectArticleContent> = {
  hermes: {
    id: "hermes",
    role: { en: "Autonomous Systems Architect", fr: "Architecte systèmes autonomes", es: "Arquitecto de sistemas autónomos" },
    timeline: { en: "2026", fr: "2026", es: "2026" },
    clientOrContext: { en: "Personal Cloud Infrastructure", fr: "Infrastructure cloud personnelle", es: "Infraestructura cloud personal" },
    infrastructure: { en: "Oracle Cloud VPS • Dokploy • Traefik • Docker", fr: "VPS Oracle Cloud • Dokploy • Traefik • Docker", es: "VPS Oracle Cloud • Dokploy • Traefik • Docker" },
    headline: {
      en: "Engineering a Self-Hosted Autonomous Agent Runtime on Oracle Cloud",
      fr: "Conception d'un démon d'agent IA autonome auto-hébergé sur Oracle Cloud.",
      es: "Diseño de un daemon de agente de IA autónomo autoalojado en Oracle Cloud.",
    },
    summary: {
      en: "Deployment of an autonomous background AI agent capable of orchestrating multi-step engineering tasks, environment self-healing, and persistent context management through SQLite.",
      fr: "Déploiement d'un agent IA autonome en tâche de fond capable d'orchestrer des tâches d'ingénierie complexes, de s'auto-corriger et de maintenir un contexte persistant via SQLite.",
      es: "Despliegue de un agente de IA autónomo en segundo plano capaz de orquestar tareas de ingeniería complejas, autocorregirse y mantener un contexto persistente mediante SQLite.",
    },
    problemTitle: {
      en: "The Challenge: Reliable, Always-On Agent Execution Without Vendor Lock-in",
      fr: "La problématique : une exécution agentique permanente et fiable sans dépendance propriétaire.",
      es: "El reto: una ejecución agéntica permanente y fiable sin dependencia de un proveedor.",
    },
    problemBody: {
      en: "Standard cloud AI platforms charge steep premiums for long-running workflows and restrict access to low-level shell commands and local file systems. The goal was to build a dedicated, self-hosted execution environment running continuously on an Oracle Cloud instance, governed by Traefik reverse-proxy and orchestrated with Dokploy.",
      fr: "Les plateformes d'IA propriétaires imposent des coûts élevés pour les exécutions longues et restreignent l'accès aux commandes shell système et au système de fichiers. L'objectif était de construire un environnement d'exécution autonome dédié, tournant en continu sur une instance Oracle Cloud, sécurisé par Traefik et orchestré avec Dokploy.",
      es: "Las plataformas de IA propietarias imponen costes elevados para las ejecuciones largas y restringen el acceso a los comandos shell del sistema y al sistema de archivos. El objetivo era construir un entorno de ejecución autónomo dedicado, funcionando de forma continua en una instancia de Oracle Cloud, protegido por Traefik y orquestado con Dokploy.",
    },
    architectureTitle: {
      en: "Target Architecture & Tool Registry",
      fr: "Architecture cible et registre d'outils.",
      es: "Arquitectura objetivo y registro de herramientas.",
    },
    architectureBody: {
      en: "Hermes operates with an asynchronous execution loop connected to an isolated Docker engine. When a task is accepted, subagents are spawned with scoped tool permissions: Docker container control, shell commands, file read/write, and Dokploy API endpoints. All state mutations and execution trees are committed to an encrypted SQLite database.",
      fr: "Hermes fonctionne selon une boucle d'exécution asynchrone connectée à un moteur Docker isolé. Lorsqu'une tâche est acceptée, des sous-agents sont instanciés avec des permissions d'outils strictes : contrôle des conteneurs Docker, commandes shell, lectures/écritures et appels API Dokploy. Toutes les mutations d'état et arborescences d'exécution sont enregistrées dans une base SQLite chiffrée.",
      es: "Hermes funciona con un bucle de ejecución asíncrono conectado a un motor Docker aislado. Cuando se acepta una tarea, se instancian subagentes con permisos de herramientas estrictos: control de contenedores Docker, comandos shell, lecturas/escrituras y llamadas a la API de Dokploy. Todas las mutaciones de estado y los árboles de ejecución se registran en una base de datos SQLite cifrada.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis techniques clés.",
      es: "Retos técnicos clave.",
    },
    challenges: [
      {
        en: "Preventing infinite reasoning loops by implementing budget-aware halting heuristics and tool call throttles.",
        fr: "Prévention des boucles de raisonnement infinies grâce à des heuristiques d'arrêt basées sur le budget de tokens et la limitation du rythme d'appels d'outils.",
        es: "Prevención de bucles de razonamiento infinitos mediante heurísticas de parada basadas en el presupuesto de tokens y la limitación del ritmo de llamadas a herramientas.",
      },
      {
        en: "Preserving session memory across daemon reboots without bloating prompt context window.",
        fr: "Préservation de la mémoire de session à travers les redémarrages du démon sans saturer la fenêtre de contexte des prompts.",
        es: "Conservación de la memoria de sesión entre reinicios del daemon sin saturar la ventana de contexto de los prompts.",
      },
      {
        en: "Hardening reverse-proxy ingress with Cloudflare mTLS and Dokploy token authentication.",
        fr: "Sécurisation des accès entrants avec Cloudflare mTLS et authentification par jetons Dokploy.",
        es: "Protección del tráfico entrante con Cloudflare mTLS y autenticación por tokens de Dokploy.",
      },
    ],
    metricsTitle: { en: "Operational Metrics", fr: "Métriques opérationnelles.", es: "Métricas operativas." },
    metrics: [
      { label: { en: "Uptime", fr: "Disponibilité", es: "Disponibilidad" }, value: "99.98%" },
      { label: { en: "Daily tool calls", fr: "Appels d'outils / jour", es: "Llamadas a herramientas / día" }, value: "1,800+" },
      { label: { en: "Context retrieval latency", fr: "Latence lecture contexte", es: "Latencia de lectura de contexto" }, value: "< 4ms" },
      { label: { en: "Active subagents", fr: "Sous-agents parallèles", es: "Subagentes en paralelo" }, value: "4 concurrent" },
    ],
  },
  omniroute: {
    id: "omniroute",
    role: { en: "Cloud & Network Engineer", fr: "Ingénieur cloud et réseau", es: "Ingeniero cloud y de redes" },
    timeline: { en: "2026", fr: "2026", es: "2026" },
    clientOrContext: { en: "High-Performance Edge Architecture", fr: "Architecture edge haute performance", es: "Arquitectura edge de alto rendimiento" },
    infrastructure: { en: "Node.js • Redis • Cloudflare Workers • Traefik", fr: "Node.js • Redis • Cloudflare Workers • Traefik", es: "Node.js • Redis • Cloudflare Workers • Traefik" },
    headline: {
      en: "Omniroute: Low-Latency Multi-Model AI Gateway with Semantic Caching",
      fr: "Omniroute : passerelle d'IA multi-modèles à faible latence avec cache sémantique.",
      es: "Omniroute: pasarela de IA multimodelo de baja latencia con caché semántica.",
    },
    summary: {
      en: "Designed a sub-15ms AI model proxy normalizing OpenAI and Anthropic requests with real-time health checks, Redis semantic caching, and dynamic token routing.",
      fr: "Conception d'une passerelle d'inférence sous 15ms normalisant les requêtes OpenAI et Anthropic avec supervision temps réel, cache sémantique Redis et routage dynamique.",
      es: "Diseño de una pasarela de inferencia por debajo de 15ms que normaliza las peticiones de OpenAI y Anthropic con supervisión en tiempo real, caché semántica en Redis y enrutamiento dinámico.",
    },
    problemTitle: {
      en: "The Challenge: Eliminating Provider Outages and Redundant LLM Invocations",
      fr: "La problématique : éliminer les pannes de fournisseurs et les requêtes redondantes.",
      es: "El reto: eliminar las caídas de proveedores y las peticiones redundantes.",
    },
    problemBody: {
      en: "Applications relying directly on upstream LLM APIs face frequent latency spikes, rate limits, and breaking schema differences. Omniroute was designed as a unified ingress layer that normalizes schemas, caches identical or semantically similar prompts in Redis, and automatically falls back to secondary models if latency exceeds thresholds.",
      fr: "Les applications connectées directement aux APIs d'IA subissent des pics de latence, des dépassements de quotas et des divergences de schémas. Omniroute a été conçu comme une couche d'entrée unifiée qui normalise les payloads, met en cache les prompts identiques ou sémantiquement proches dans Redis et bascule automatiquement sur un modèle secondaire en cas de dépassement de seuil.",
      es: "Las aplicaciones conectadas directamente a las APIs de IA sufren picos de latencia, superación de cuotas y divergencias de esquemas. Omniroute se diseñó como una capa de entrada unificada que normaliza los payloads, guarda en caché en Redis los prompts idénticos o semánticamente similares y cambia automáticamente a un modelo secundario cuando se supera un umbral.",
    },
    architectureTitle: {
      en: "Streaming Edge Architecture",
      fr: "Architecture streaming edge.",
      es: "Arquitectura streaming edge.",
    },
    architectureBody: {
      en: "Incoming requests arrive via Cloudflare Edge with SSL termination and rate-limiting. A Node.js streaming proxy parses token streams chunk by chunk with zero buffer allocation, calculating real-time TTFT (Time to First Token) and storing normalized vector hashes in Redis.",
      fr: "Les requêtes arrivent via le réseau Cloudflare avec terminaison SSL et limitation de débit. Un proxy de streaming Node.js analyse les flux de tokens morceau par morceau sans allocation de tampon intermédiaire, mesurant en temps réel le TTFT (Time to First Token) et indexant les hashs vectoriels dans Redis.",
      es: "Las peticiones llegan a través de la red de Cloudflare con terminación SSL y limitación de tasa. Un proxy de streaming en Node.js analiza los flujos de tokens fragmento a fragmento sin asignar búferes intermedios, mide en tiempo real el TTFT (Time to First Token) e indexa los hashes vectoriales en Redis.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis techniques clés.",
      es: "Retos técnicos clave.",
    },
    challenges: [
      {
        en: "Maintaining Server-Sent Events (SSE) stream integrity while calculating token consumption in-flight.",
        fr: "Maintien de l'intégrité du streaming SSE (Server-Sent Events) tout en calculant la consommation de tokens au fil de l'eau.",
        es: "Mantenimiento de la integridad del streaming SSE (Server-Sent Events) mientras se calcula el consumo de tokens sobre la marcha.",
      },
      {
        en: "Semantic cache invalidation strategies based on temperature and query randomness.",
        fr: "Stratégies d'invalidation du cache sémantique selon la température et l'aléa des requêtes.",
        es: "Estrategias de invalidación de la caché semántica según la temperatura y la aleatoriedad de las peticiones.",
      },
    ],
    metricsTitle: { en: "Performance Highlights", fr: "Performances clés.", es: "Rendimiento clave." },
    metrics: [
      { label: { en: "Proxy overhead", fr: "Surcoût de routage", es: "Sobrecoste de enrutamiento" }, value: "< 14ms" },
      { label: { en: "Cache hit ratio", fr: "Taux de succès cache", es: "Tasa de aciertos de caché" }, value: "38.4%" },
      { label: { en: "Failover latency", fr: "Bascule automatique", es: "Conmutación automática" }, value: "< 180ms" },
      { label: { en: "Throughput", fr: "Débit supporté", es: "Caudal soportado" }, value: "1,200 req/min" },
    ],
  },
  "m2c-flows": {
    id: "m2c-flows",
    role: { en: "Cloud Architect", fr: "Architecte cloud", es: "Arquitecto cloud" },
    timeline: { en: "2025 to 2026", fr: "2025 à 2026", es: "2025 a 2026" },
    clientOrContext: { en: "Orange DSI • Internal Enterprise Migration", fr: "Orange DSI • Migration SI d'entreprise", es: "Orange DSI • Migración de SI empresarial" },
    infrastructure: { en: "Azure Container Apps • Private Endpoints • GitLab CI", fr: "Azure Container Apps • Private Endpoints • GitLab CI", es: "Azure Container Apps • Private Endpoints • GitLab CI" },
    headline: {
      en: "M2C Flows: Interactive Dependency Graph & Cloud Migration Simulator",
      fr: "M2C Flows : cartographie interactive et simulateur de migration vers Azure.",
      es: "M2C Flows: cartografía interactiva y simulador de migración a Azure.",
    },
    summary: {
      en: "Built a stateless digital twin mapping complex enterprise IT dependencies, simulating cloud migration strategies to Azure, and analyzing network latency risks between on-premise datacenters and cloud regions.",
      fr: "Création d'un jumeau numérique stateless cartographiant les dépendances complexes du SI, simulant les scénarios de migration vers Azure et mesurant les impacts réseau inter-datacenters.",
      es: "Creación de un gemelo digital stateless que cartografía las dependencias complejas del SI, simula los escenarios de migración a Azure y mide el impacto de red entre centros de datos.",
    },
    problemTitle: {
      en: "The Challenge: De-risking Multi-Tier Application Migration",
      fr: "La problématique : sécuriser la migration d'applications multi-niveaux.",
      es: "El reto: asegurar la migración de aplicaciones multinivel.",
    },
    problemBody: {
      en: "Enterprise applications frequently communicate with dozens of legacy backends across physical datacenters. Migrating a single frontend or API to Azure Container Apps without accounting for inter-tier latency can degrade response times from 5ms to 80ms+. M2C Flows allows architects to visualize and simulate these topological shifts before modifying infrastructure.",
      fr: "Les applications d'entreprise échangent en continu avec des dizaines de serveurs historiques répartis dans différents datacenters. Migrer une API vers Azure sans anticiper la latence inter-niveaux peut dégrader les temps de réponse de 5ms à plus de 80ms. M2C Flows permet aux architectes de visualiser et simuler ces impacts avant tout déploiement.",
      es: "Las aplicaciones empresariales se comunican de forma continua con decenas de servidores heredados repartidos en distintos centros de datos. Migrar una API a Azure sin anticipar la latencia entre niveles puede degradar los tiempos de respuesta de 5ms a más de 80ms. M2C Flows permite a los arquitectos visualizar y simular estos impactos antes de cualquier despliegue.",
    },
    architectureTitle: {
      en: "Client-Side Graph Simulation Engine",
      fr: "Moteur de simulation graphique côté client.",
      es: "Motor de simulación gráfica en el lado del cliente.",
    },
    architectureBody: {
      en: "To comply with strict enterprise data protection guidelines, M2C Flows runs entirely in the browser using zero telemetry. Network graphs, database topologies, and latency matrices are rendered using SVG and canvas layers, with instant scenario export for Technical Architecture Dossiers (DAT).",
      fr: "Pour respecter les normes strictes de protection des données d'Orange, M2C Flows s'exécute intégralement dans le navigateur sans télémétrie externe. Les graphes de réseau, topologies de base de données et matrices de latence sont calculés via des couches SVG et canvas, avec export instantané pour les dossiers d'architecture technique (DAT).",
      es: "Para cumplir las estrictas normas de protección de datos de Orange, M2C Flows se ejecuta íntegramente en el navegador sin telemetría externa. Los grafos de red, las topologías de bases de datos y las matrices de latencia se calculan mediante capas SVG y canvas, con exportación instantánea para los dosieres de arquitectura técnica (DAT).",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis techniques clés.",
      es: "Retos técnicos clave.",
    },
    challenges: [
      {
        en: "Rendering massive graphs with 500+ interconnected microservices without UI thread freeze.",
        fr: "Rendu fluide de graphes de plus de 500 microservices interconnectés sans blocage du thread principal.",
        es: "Renderizado fluido de grafos de más de 500 microservicios interconectados sin bloquear el hilo principal.",
      },
      {
        en: "Accurately modeling Azure ExpressRoute and VPN Gateway latency hops.",
        fr: "Modélisation fidèle des sauts de latence Azure ExpressRoute et des passerelles VPN.",
        es: "Modelado fiel de los saltos de latencia de Azure ExpressRoute y de las pasarelas VPN.",
      },
    ],
    metricsTitle: { en: "Enterprise Impact", fr: "Impact en entreprise.", es: "Impacto en la empresa." },
    metrics: [
      { label: { en: "Simulated applications", fr: "Applications modélisées", es: "Aplicaciones modeladas" }, value: "45+" },
      { label: { en: "Planning time saved", fr: "Temps d'étude gagné", es: "Tiempo de estudio ahorrado" }, value: "- 60%" },
      { label: { en: "Latency regressions detected", fr: "Goulots d'étranglement évités", es: "Cuellos de botella evitados" }, value: "12 identified" },
      { label: { en: "Architecture data privacy", fr: "Confidentialité données", es: "Confidencialidad de los datos" }, value: "100% in-browser" },
    ],
  },
  "opencode-harness": {
    id: "opencode-harness",
    role: { en: "Tooling & Systems Engineer", fr: "Ingénieur outillage et systèmes", es: "Ingeniero de herramientas y sistemas" },
    timeline: { en: "2025 to 2026", fr: "2025 à 2026", es: "2025 a 2026" },
    clientOrContext: { en: "Autonomous Engineering Productivity", fr: "Productivité en ingénierie autonome", es: "Productividad en ingeniería autónoma" },
    infrastructure: { en: "Rust • TypeScript • OpenCode • Claude Code", fr: "Rust • TypeScript • OpenCode • Claude Code", es: "Rust • TypeScript • OpenCode • Claude Code" },
    headline: {
      en: "Agentic Engineering Runtime: Autonomous Coding Harness with RTK & MCP",
      fr: "Harness d'ingénierie agentique : runtime autonome avec RTK et orchestration MCP.",
      es: "Harness de ingeniería agéntica: runtime autónomo con RTK y orquestación MCP.",
    },
    summary: {
      en: "Engineered a high-efficiency development harness integrating Rust-based RTK token compression, structured session memory checkpoints, and specialized MCP servers for automated coding workflows.",
      fr: "Développement d'un environnement de travail haute performance intégrant le compresseur de tokens RTK en Rust, la sauvegarde de mémoire de session et des serveurs MCP sur mesure.",
      es: "Desarrollo de un entorno de trabajo de alto rendimiento que integra el compresor de tokens RTK en Rust, el guardado de la memoria de sesión y servidores MCP a medida.",
    },
    problemTitle: {
      en: "The Challenge: Context Window Fatigue and Agent Drift",
      fr: "La problématique : saturation du contexte et dérive des modèles.",
      es: "El reto: saturación del contexto y deriva de los modelos.",
    },
    problemBody: {
      en: "During prolonged coding tasks, agent context windows fill rapidly with verbose git diffs, directory trees, and compilation logs, resulting in degraded reasoning and exorbitant token costs. This project provides a compression filter written in Rust that compacts shell outputs before LLM ingestion, while persisting architectural decisions in a local session ledger.",
      fr: "Lors de tâches de développement longues, le contexte de l'agent sature rapidement de diffs git volumineux, d'arborescences et de logs de compilation, entraînant une perte de précision et une surconsommation de tokens. Ce projet apporte un filtre de compression en Rust qui condense les sorties terminal avant injection dans l'IA, tout en consignant les décisions d'architecture dans un registre local.",
      es: "En las tareas de desarrollo largas, el contexto del agente se satura rápidamente de diffs de git voluminosos, árboles de directorios y logs de compilación, lo que provoca una pérdida de precisión y un consumo excesivo de tokens. Este proyecto aporta un filtro de compresión en Rust que condensa las salidas del terminal antes de enviarlas a la IA, y deja constancia de las decisiones de arquitectura en un registro local.",
    },
    architectureTitle: {
      en: "Plugin Architecture & Intercept Loops",
      fr: "Architecture de plugins et boucles d'interception.",
      es: "Arquitectura de plugins y bucles de interceptación.",
    },
    architectureBody: {
      en: "The harness intercepts standard CLI commands, routes git operations through `rtk git`, and enriches agent queries with contextual documentation from specialized skills without injecting entire codebases into prompts.",
      fr: "Le harness intercepte les commandes CLI courantes, route les opérations git vers `rtk git`, et injecte des fragments de documentation ciblés via des skills spécialisés sans charger inutilement l'intégralité du dépôt dans le prompt.",
      es: "El harness intercepta los comandos CLI habituales, redirige las operaciones git a `rtk git` e inyecta fragmentos de documentación específicos mediante skills especializados, sin cargar innecesariamente todo el repositorio en el prompt.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis techniques clés.",
      es: "Retos técnicos clave.",
    },
    challenges: [
      {
        en: "Preserving crucial error messages while stripping 70%+ of redundant shell noise.",
        fr: "Préservation des messages d'erreur critiques tout en éliminant plus de 70% du bruit terminal superflu.",
        es: "Conservación de los mensajes de error críticos eliminando más del 70% del ruido superfluo del terminal.",
      },
      {
        en: "Building a rock-solid session checkpointing system with rollback capabilities.",
        fr: "Conception d'un mécanisme fiable de points de contrôle de session avec reprise après interruption.",
        es: "Diseño de un mecanismo fiable de puntos de control de sesión con reanudación tras una interrupción.",
      },
    ],
    metricsTitle: { en: "Efficiency Gains", fr: "Gains d'efficacité.", es: "Mejoras de eficiencia." },
    metrics: [
      { label: { en: "Token consumption", fr: "Réduction des tokens", es: "Reducción de tokens" }, value: "- 65%" },
      { label: { en: "Task completion rate", fr: "Taux de réussite des tâches", es: "Tasa de éxito de las tareas" }, value: "94%" },
      { label: { en: "CLI intercept latency", fr: "Latence d'interception", es: "Latencia de interceptación" }, value: "< 2ms" },
      { label: { en: "Memory recall speed", fr: "Recherche mémoire", es: "Búsqueda en memoria" }, value: "Instant" },
    ],
  },
  shopeen: {
    id: "shopeen",
    role: { en: "Full Stack Engineer (Apprenticeship)", fr: "Ingénieur full stack en apprentissage", es: "Ingeniero full stack en formación dual" },
    timeline: { en: "2022 to 2025", fr: "2022 à 2025", es: "2022 a 2025" },
    clientOrContext: { en: "Orange Online Store Team", fr: "Équipe boutique en ligne Orange", es: "Equipo de la tienda online de Orange" },
    infrastructure: { en: "Spring Boot • Kotlin • Svelte • MongoDB • Kubernetes", fr: "Spring Boot • Kotlin • Svelte • MongoDB • Kubernetes", es: "Spring Boot • Kotlin • Svelte • MongoDB • Kubernetes" },
    headline: {
      en: "Enterprise Carbon Footprint Calculator for Telecom E-Commerce",
      fr: "Calculateur d'empreinte carbone pour l'infrastructure e-commerce d'Orange.",
      es: "Calculadora de huella de carbono para la infraestructura de e-commerce de Orange.",
    },
    summary: {
      en: "Developed an internal platform evaluating the greenhouse gas emissions and electrical consumption of server racks, microservices, and network hardware powering the Orange web store.",
      fr: "Développement d'une plateforme interne évaluant les émissions de gaz à effet de serre et la consommation électrique des serveurs, microservices et équipements réseau de la boutique Orange.",
      es: "Desarrollo de una plataforma interna que evalúa las emisiones de gases de efecto invernadero y el consumo eléctrico de los servidores, microservicios y equipos de red de la tienda de Orange.",
    },
    problemTitle: {
      en: "The Challenge: Quantifying Microservice Environmental Impact",
      fr: "La problématique : quantifier l'impact écologique d'une architecture microservices.",
      es: "El reto: cuantificar el impacto ecológico de una arquitectura de microservicios.",
    },
    problemBody: {
      en: "Evaluating the environmental footprint of an e-commerce platform serving 600,000+ yearly visitors requires factoring in CPU utilization, memory allocation, storage lifecycles, and datacenter PUE (Power Usage Effectiveness). Shopeen provided a standardized calculator adhering to INR standards.",
      fr: "Évaluer l'empreinte environnementale d'une boutique servant plus de 600 000 visiteurs par an nécessite d'agréger utilisation CPU, allocation mémoire, cycles de vie des disques et PUE des datacenters. Shopeen a fourni un calculateur standardisé conforme aux normes de l'Institut du Numérique Responsable.",
      es: "Evaluar la huella ambiental de una tienda con más de 600 000 visitantes al año exige agregar el uso de CPU, la asignación de memoria, los ciclos de vida de los discos y el PUE de los centros de datos. Shopeen proporcionó una calculadora estandarizada conforme a las normas del Institut du Numérique Responsable.",
    },
    architectureTitle: {
      en: "Reactive Full-Stack Architecture",
      fr: "Architecture réactive full-stack.",
      es: "Arquitectura reactiva full-stack.",
    },
    architectureBody: {
      en: "Built with a Spring Boot and Kotlin reactive backend, paired with Svelte on the frontend for minimal client-side JavaScript execution overhead. Data pipelines ingest hardware telemetry into MongoDB with automated aggregation jobs.",
      fr: "Conçu avec un backend réactif Spring Boot et Kotlin, couplé à Svelte sur le frontend pour minimiser l'exécution JavaScript côté client. Les pipelines ingèrent la télémétrie matérielle dans MongoDB avec des traitements d'agrégation automatisés.",
      es: "Diseñado con un backend reactivo en Spring Boot y Kotlin, combinado con Svelte en el frontend para minimizar la ejecución de JavaScript en el lado del cliente. Los pipelines ingieren la telemetría del hardware en MongoDB con procesos de agregación automatizados.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis techniques clés.",
      es: "Retos técnicos clave.",
    },
    challenges: [
      {
        en: "Aligning algorithmic models with French ADEME carbon emission factors.",
        fr: "Harmonisation des modèles de calcul avec la base de données facteurs d'émission de l'ADEME.",
        es: "Armonización de los modelos de cálculo con la base de datos de factores de emisión de la ADEME.",
      },
      {
        en: "High test coverage (85%+) with JUnit, Hurl, and Cypress in GitLab CI.",
        fr: "Couverture de tests élevée (> 85%) avec JUnit, Hurl et Cypress dans GitLab CI.",
        es: "Alta cobertura de tests (> 85%) con JUnit, Hurl y Cypress en GitLab CI.",
      },
    ],
    metricsTitle: { en: "Key Results", fr: "Résultats clés.", es: "Resultados clave." },
    metrics: [
      { label: { en: "Yearly visitors analyzed", fr: "Visiteurs annuels analysés", es: "Visitantes anuales analizados" }, value: "600,000+" },
      { label: { en: "Test coverage", fr: "Couverture de tests", es: "Cobertura de tests" }, value: "87%" },
      { label: { en: "Bundle size", fr: "Poids du bundle frontend", es: "Peso del bundle frontend" }, value: "< 45 KB" },
      { label: { en: "Compliance", fr: "Conformité", es: "Conformidad" }, value: "INR & Green IT" },
    ],
  },
  stakeirb: {
    id: "stakeirb",
    role: { en: "Lead Backend & Real-Time Architect", fr: "Développeur backend et architecte temps réel", es: "Desarrollador backend y arquitecto de tiempo real" },
    timeline: { en: "2023", fr: "2023", es: "2023" },
    clientOrContext: { en: "ENSEIRB-MATMECA Academic Engineering Project", fr: "Projet d'ingénierie ENSEIRB-MATMECA", es: "Proyecto de ingeniería ENSEIRB-MATMECA" },
    infrastructure: { en: "Node.js • Express • Socket.io • SQLite • Vue.js", fr: "Node.js • Express • Socket.io • SQLite • Vue.js", es: "Node.js • Express • Socket.io • SQLite • Vue.js" },
    headline: {
      en: "Stak'eirb: High-Frequency Real-Time Multiplayer Gaming Platform",
      fr: "Stak'eirb : plateforme de jeux multijoueur en temps réel et haute fréquence.",
      es: "Stak'eirb: plataforma de juegos multijugador en tiempo real y alta frecuencia.",
    },
    summary: {
      en: "Architected a full-stack real-time gaming simulator featuring bidirectional WebSocket event broadcasting, ACID transaction isolation, and provably fair cryptographic randomness.",
      fr: "Architecture d'un simulateur de jeux en ligne avec diffusion bidirectionnelle WebSocket, isolation des transactions ACID et équité cryptographique démontrable.",
      es: "Arquitectura de un simulador de juegos online con difusión bidireccional por WebSocket, aislamiento de transacciones ACID y equidad criptográfica demostrable.",
    },
    problemTitle: {
      en: "The Challenge: State Synchronization and Concurrency Under Load",
      fr: "La problématique : synchronisation d'état et concurrence sous charge.",
      es: "El reto: sincronización de estado y concurrencia bajo carga.",
    },
    problemBody: {
      en: "Multiplayer wagering platforms must eliminate race conditions such as double-spending virtual credits while maintaining millisecond-level responsiveness for simultaneous users across game rooms.",
      fr: "Les plateformes multijoueur doivent éliminer tout risque de course critique comme la double dépense de jetons, tout en garantissant une réactivité de l'ordre de la milliseconde pour les utilisateurs connectés simultanément dans différentes salles.",
      es: "Las plataformas multijugador deben eliminar cualquier riesgo de condición de carrera, como el doble gasto de fichas, y garantizar a la vez una capacidad de respuesta del orden del milisegundo para los usuarios conectados simultáneamente en distintas salas.",
    },
    architectureTitle: {
      en: "WebSocket Room State Machine",
      fr: "Machine d'état WebSocket par salons.",
      es: "Máquina de estados WebSocket por salas.",
    },
    architectureBody: {
      en: "Socket.io rooms handle real-time chat, bets, and multipliers. The Express backend enforces atomic database transactions in SQLite with immediate rollback on validation failure, preventing desynchronized client balances.",
      fr: "Les salons Socket.io gèrent le chat, les mises et les multiplicateurs en temps réel. Le serveur Express garantit des transactions atomiques dans SQLite avec annulation immédiate en cas d'erreur de validation, empêchant toute désynchronisation de solde.",
      es: "Las salas de Socket.io gestionan el chat, las apuestas y los multiplicadores en tiempo real. El servidor Express garantiza transacciones atómicas en SQLite con reversión inmediata ante un error de validación, lo que impide cualquier desincronización de saldo.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis techniques clés.",
      es: "Retos técnicos clave.",
    },
    challenges: [
      {
        en: "Mitigating race conditions when hundreds of WebSocket actions arrive in the same tick.",
        fr: "Élimination des situations de concurrence lorsque des centaines d'actions WebSocket arrivent sur le même intervalle d'horloge.",
        es: "Eliminación de las condiciones de carrera cuando cientos de acciones WebSocket llegan en el mismo intervalo de reloj.",
      },
      {
        en: "Implementing seed-based provably fair RNG verification algorithms.",
        fr: "Mise en place d'un algorithme de génération pseudo-aléatoire vérifiable par graine cryptographique.",
        es: "Implementación de un algoritmo de generación pseudoaleatoria verificable mediante semilla criptográfica.",
      },
    ],
    metricsTitle: { en: "Platform Performance", fr: "Performances de la plateforme.", es: "Rendimiento de la plataforma." },
    metrics: [
      { label: { en: "Socket latency", fr: "Latence WebSocket", es: "Latencia WebSocket" }, value: "< 20ms" },
      { label: { en: "Transaction rollback rate", fr: "Taux d'erreur transaction", es: "Tasa de error en transacciones" }, value: "0% in testing" },
      { label: { en: "Concurrent players", fr: "Joueurs simultanés", es: "Jugadores simultáneos" }, value: "100+ simulated" },
      { label: { en: "Security score", fr: "Score sécurité", es: "Puntuación de seguridad" }, value: "A+ OWASP" },
    ],
  },
  iplocator: {
    id: "iplocator",
    role: { en: "API & Backend Engineer", fr: "Ingénieur API et backend", es: "Ingeniero de API y backend" },
    timeline: { en: "2023", fr: "2023", es: "2023" },
    clientOrContext: { en: "Networking Specialization Project", fr: "Projet de spécialité réseau et sécurité", es: "Proyecto de especialidad en redes y seguridad" },
    infrastructure: { en: "Node.js • Express • MongoDB • Leaflet • Swagger", fr: "Node.js • Express • MongoDB • Leaflet • Swagger", es: "Node.js • Express • MongoDB • Leaflet • Swagger" },
    headline: {
      en: "IPLocator: Real-Time Geographic & ASN Network Intelligence Service",
      fr: "IPLocator : service de géolocalisation et renseignement réseau ASN en temps réel.",
      es: "IPLocator: servicio de geolocalización e inteligencia de red ASN en tiempo real.",
    },
    summary: {
      en: "Created a high-throughput IP intelligence API and interactive mapping dashboard resolving geographic coordinates, ISP prefixes, and Autonomous System Numbers (ASN).",
      fr: "Création d'une API de renseignement IP et d'un tableau de bord cartographique résolvant coordonnées géographiques, préfixes FAI et numéros d'Autonomous System (ASN).",
      es: "Creación de una API de inteligencia IP y de un panel cartográfico que resuelve coordenadas geográficas, prefijos de ISP y números de Autonomous System (ASN).",
    },
    problemTitle: {
      en: "The Challenge: Fast Multi-Source IP Lookups with Fallbacks",
      fr: "La problématique : résolution multi-sources rapide avec stratégie de secours.",
      es: "El reto: resolución multifuente rápida con estrategia de respaldo.",
    },
    problemBody: {
      en: "External geolocation APIs often apply strict rate limits and suffer from regional blind spots. The platform addresses this by combining local MaxMind GeoIP lookups with upstream API fallbacks, caching responses in MongoDB to minimize latency.",
      fr: "Les APIs de géolocalisation externes imposent des limites d'appels strictes et présentent des imprécisions régionales. La plateforme combine des recherches locales MaxMind GeoIP avec des replis en ligne, mettant les réponses en cache dans MongoDB pour réduire la latence.",
      es: "Las APIs de geolocalización externas imponen límites de llamadas estrictos y presentan imprecisiones regionales. La plataforma combina búsquedas locales en MaxMind GeoIP con respaldos en línea y guarda las respuestas en caché en MongoDB para reducir la latencia.",
    },
    architectureTitle: {
      en: "Tiered Cache & Map Integration",
      fr: "Cache étagé et cartographie interactive.",
      es: "Caché escalonada y cartografía interactiva.",
    },
    architectureBody: {
      en: "An Express.js REST API documented with OpenAPI/Swagger serves requests. Frontend client queries render on an interactive Leaflet vector map with reverse DNS resolution and ISP telemetry.",
      fr: "Une API REST Express.js documentée via OpenAPI et Swagger traite les requêtes. Le frontend affiche les résultats sur une carte interactive Leaflet avec résolution DNS inverse et données de routage.",
      es: "Una API REST en Express.js documentada con OpenAPI y Swagger procesa las peticiones. El frontend muestra los resultados en un mapa interactivo Leaflet con resolución DNS inversa y datos de enrutamiento.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis techniques clés.",
      es: "Retos técnicos clave.",
    },
    challenges: [
      {
        en: "Structuring MongoDB compound indexes for ultra-fast subnet lookups.",
        fr: "Création d'index composés dans MongoDB pour des recherches de sous-réseaux instantanées.",
        es: "Creación de índices compuestos en MongoDB para búsquedas de subredes instantáneas.",
      },
      {
        en: "Generating live interactive maps without blocking client performance.",
        fr: "Génération de marqueurs cartographiques interactifs sans ralentissement du navigateur.",
        es: "Generación de marcadores cartográficos interactivos sin ralentizar el navegador.",
      },
    ],
    metricsTitle: { en: "Key Metrics", fr: "Métriques clés.", es: "Métricas clave." },
    metrics: [
      { label: { en: "Average response time", fr: "Temps de réponse moyen", es: "Tiempo de respuesta medio" }, value: "18ms" },
      { label: { en: "Cache hit response", fr: "Réponse sur cache", es: "Respuesta desde caché" }, value: "2ms" },
      { label: { en: "OpenAPI compliant", fr: "Conformité OpenAPI", es: "Conformidad OpenAPI" }, value: "100%" },
      { label: { en: "Global coverage", fr: "Couverture mondiale", es: "Cobertura mundial" }, value: "IPv4 & IPv6" },
    ],
  },
  automatisms: {
    id: "automatisms",
    role: { en: "Developer & Project Manager", fr: "Développeur et chef de projet", es: "Desarrollador y jefe de proyecto" },
    timeline: { en: "2022", fr: "2022", es: "2022" },
    clientOrContext: { en: "Centre de Gestion de la Fonction Publique Territoriale (CDG33)", fr: "Centre de gestion de la fonction publique territoriale (CDG33)", es: "Centre de gestion de la fonction publique territoriale (CDG33)" },
    infrastructure: { en: "Symfony • PHP • MySQL • Apache • Linux", fr: "Symfony • PHP • MySQL • Apache • Linux", es: "Symfony • PHP • MySQL • Apache • Linux" },
    headline: {
      en: "AutomatiSMS: Mission-Critical Broadcast Scheduling & Administration Console",
      fr: "AutomatiSMS : console d'administration et diffusion programmée de SMS pour le CDG33.",
      es: "AutomatiSMS: consola de administración y envío programado de SMS para el CDG33.",
    },
    summary: {
      en: "Designed, delivered, and deployed an administrative web platform handling scheduled SMS dispatches, recipient filtering, and communication audits for territorial public services.",
      fr: "Conception, développement et mise en production d'une plateforme web gérant les envois programmés de SMS, le ciblage des destinataires et l'audit pour le service public territorial.",
      es: "Diseño, desarrollo y puesta en producción de una plataforma web que gestiona los envíos programados de SMS, la segmentación de destinatarios y la auditoría para el servicio público territorial.",
    },
    problemTitle: {
      en: "The Challenge: Automating Public Sector Urgent Communications",
      fr: "La problématique : automatiser les communications d'urgence du secteur public.",
      es: "El reto: automatizar las comunicaciones urgentes del sector público.",
    },
    problemBody: {
      en: "The CDG33 required a centralized tool to notify thousands of municipal agents regarding urgent announcements, recruitment contests, and regulatory deadlines, replacing manual and fragmented email workflows.",
      fr: "Le CDG33 avait besoin d'un outil centralisé pour notifier des milliers d'agents communaux d'annonces urgentes, de concours administratifs et d'échéances réglementaires, en remplacement de processus manuels fragmentés.",
      es: "El CDG33 necesitaba una herramienta centralizada para notificar a miles de empleados municipales anuncios urgentes, oposiciones y plazos normativos, en sustitución de procesos manuales fragmentados.",
    },
    architectureTitle: {
      en: "Enterprise MVC Architecture with Queues",
      fr: "Architecture MVC d'entreprise avec files d'attente.",
      es: "Arquitectura MVC empresarial con colas.",
    },
    architectureBody: {
      en: "Built on Symfony with Doctrine ORM and MySQL. Scheduled SMS jobs are staged in background queues processed by cron daemons with SMS provider API failover, complete audit logs, and delivery rate tracking.",
      fr: "Développé avec Symfony, Doctrine ORM et MySQL. Les envois programmés sont placés dans des files d'attente traitées par des tâches cron, avec bascule vers une passerelle SMS de secours et traçabilité complète des statuts de remise.",
      es: "Desarrollado con Symfony, Doctrine ORM y MySQL. Los envíos programados se colocan en colas procesadas por tareas cron, con conmutación a una pasarela SMS de respaldo y trazabilidad completa de los estados de entrega.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis techniques clés.",
      es: "Retos técnicos clave.",
    },
    challenges: [
      {
        en: "Managing strict GDPR compliance and recipient consent records.",
        fr: "Respect scrupuleux du RGPD et gestion stricte des consentements des destinataires.",
        es: "Cumplimiento escrupuloso del RGPD y gestión estricta de los consentimientos de los destinatarios.",
      },
      {
        en: "Delivering an intuitive administration UI for non-technical civil servants.",
        fr: "Conception d'une interface d'administration claire pour des agents non spécialistes du numérique.",
        es: "Diseño de una interfaz de administración clara para empleados públicos no especialistas en tecnología.",
      },
    ],
    metricsTitle: { en: "Impact at CDG33", fr: "Impact au CDG33.", es: "Impacto en el CDG33." },
    metrics: [
      { label: { en: "Weekly broadcasts", fr: "Envois hebdomadaires", es: "Envíos semanales" }, value: "1,000+ SMS" },
      { label: { en: "Delivery success rate", fr: "Taux de distribution", es: "Tasa de entrega" }, value: "99.4%" },
      { label: { en: "Deployment environment", fr: "Environnement de prod", es: "Entorno de producción" }, value: "Linux On-Prem" },
      { label: { en: "Project cycle", fr: "Méthode de gestion", es: "Método de gestión" }, value: "Cycle en V" },
    ],
  },
  mijotons: {
    id: "mijotons",
    role: { en: "Android & Mobile Engineer", fr: "Ingénieur mobile Android", es: "Ingeniero móvil Android" },
    timeline: { en: "2021 to 2022", fr: "2021 à 2022", es: "2021 a 2022" },
    clientOrContext: { en: "IUT de Bayonne Academic Capstone Project", fr: "Projet de fin d'études IUT de Bayonne", es: "Proyecto de fin de estudios en el IUT de Bayonne" },
    infrastructure: { en: "Android SDK • Java • SQLite • OpenStreetMap • Gradle", fr: "Android SDK • Java • SQLite • OpenStreetMap • Gradle", es: "Android SDK • Java • SQLite • OpenStreetMap • Gradle" },
    headline: {
      en: "Mijotons: Native Android Recipe Assistant with Supermarket Geolocation",
      fr: "Mijotons : assistant mobile Android pour listes de courses et recettes anti-gaspillage.",
      es: "Mijotons: asistente móvil Android para listas de la compra y recetas contra el desperdicio.",
    },
    summary: {
      en: "Engineered a native Android application combining offline grocery checklist management, nearby supermarket routing using OpenStreetMap Overpass API, and dynamic recipe suggestions.",
      fr: "Développement d'une application Android native combinant gestion de listes de courses hors-ligne, géolocalisation des commerces avec OpenStreetMap et suggestions de recettes.",
      es: "Desarrollo de una aplicación Android nativa que combina la gestión de listas de la compra sin conexión, la geolocalización de comercios con OpenStreetMap y sugerencias de recetas.",
    },
    problemTitle: {
      en: "The Challenge: Combating Food Waste Through Smart Shopping",
      fr: "La problématique : lutter contre le gaspillage alimentaire par des courses intelligentes.",
      es: "El reto: luchar contra el desperdicio alimentario con una compra inteligente.",
    },
    problemBody: {
      en: "Shoppers often buy ingredients without a clear meal plan, leading to household food spoilage. Mijotons bridges the gap by suggesting recipes tailored specifically to the items currently in the user's cart or pantry.",
      fr: "Les consommateurs achètent fréquemment des produits sans planification claire, entraînant un gaspillage domestique important. Mijotons répond à ce problème en proposant des recettes adaptées aux ingrédients présents dans le panier ou le réfrigérateur.",
      es: "Los consumidores compran a menudo productos sin una planificación clara, lo que provoca un desperdicio doméstico importante. Mijotons responde a este problema proponiendo recetas adaptadas a los ingredientes que hay en la cesta o en la nevera.",
    },
    architectureTitle: {
      en: "Native Mobile Architecture",
      fr: "Architecture mobile native.",
      es: "Arquitectura móvil nativa.",
    },
    architectureBody: {
      en: "Developed in Java with the Android SDK. Features a local SQLite database for instant offline access and asynchronous HTTP queries to the OpenStreetMap Overpass API for real-time supermarket coordinates.",
      fr: "Développé en Java avec le SDK Android natif. L'application intègre une base de données locale SQLite pour un usage fluide hors-ligne et interroge l'API Overpass d'OpenStreetMap pour localiser les commerces de proximité.",
      es: "Desarrollada en Java con el SDK nativo de Android. La aplicación integra una base de datos local SQLite para un uso fluido sin conexión y consulta la API Overpass de OpenStreetMap para localizar los comercios cercanos.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis techniques clés.",
      es: "Retos técnicos clave.",
    },
    challenges: [
      {
        en: "Optimizing battery consumption during GPS location queries.",
        fr: "Optimisation de la consommation de batterie lors des requêtes de géolocalisation GPS.",
        es: "Optimización del consumo de batería durante las consultas de geolocalización GPS.",
      },
      {
        en: "Designing a responsive UI supporting varied Android screen densities.",
        fr: "Conception d'une interface adaptative prenant en charge les multiples résolutions d'écrans Android.",
        es: "Diseño de una interfaz adaptativa compatible con las múltiples resoluciones de pantalla de Android.",
      },
    ],
    metricsTitle: { en: "App Performance", fr: "Performances de l'application.", es: "Rendimiento de la aplicación." },
    metrics: [
      { label: { en: "Offline availability", fr: "Fonctionnement hors-ligne", es: "Funcionamiento sin conexión" }, value: "100%" },
      { label: { en: "Cold launch time", fr: "Temps de lancement à froid", es: "Tiempo de arranque en frío" }, value: "< 0.8s" },
      { label: { en: "Platform", fr: "Plateforme", es: "Plataforma" }, value: "Android 8.0+" },
      { label: { en: "Map engine", fr: "Moteur de carte", es: "Motor de mapas" }, value: "OpenStreetMap" },
    ],
  },
  portfolio: {
    id: "portfolio",
    role: { en: "Design Engineer & Creator", fr: "Ingénieur design et créateur", es: "Ingeniero de diseño y creador" },
    timeline: { en: "2026", fr: "2026", es: "2026" },
    clientOrContext: { en: "Personal Brand & Engineering Showcase", fr: "Marque personnelle et vitrine technique", es: "Marca personal y escaparate técnico" },
    infrastructure: { en: "Astro 7 • TypeScript • GSAP • Cloudflare Workers", fr: "Astro 7 • TypeScript • GSAP • Cloudflare Workers", es: "Astro 7 • TypeScript • GSAP • Cloudflare Workers" },
    headline: {
      en: "A fast, accessible static portfolio on Astro and Cloudflare Workers",
      fr: "Un portfolio statique rapide et accessible sur Astro et Cloudflare Workers.",
      es: "Un portfolio estático rápido y accesible con Astro y Cloudflare Workers.",
    },
    summary: {
      en: "Rebuilt the portfolio as a static Astro site served by Cloudflare Workers: trilingual routes, structured data for search and AI engines, and motion effects that never block the content.",
      fr: "Refonte du portfolio en site Astro statique servi par Cloudflare Workers : routes trilingues, données structurées pour les moteurs de recherche et d'IA, et effets de mouvement qui ne bloquent jamais le contenu.",
      es: "Rediseño del portfolio como sitio Astro estático servido por Cloudflare Workers: rutas trilingües, datos estructurados para los motores de búsqueda y de IA, y efectos de movimiento que nunca bloquean el contenido.",
    },
    problemTitle: {
      en: "The Challenge: Motion Without the Performance Cost",
      fr: "La problématique : du mouvement sans coût de performance.",
      es: "El reto: movimiento sin coste de rendimiento.",
    },
    problemBody: {
      en: "The previous Next.js version scored 59 on mobile performance with a 4.9 s Largest Contentful Paint. The goal was to keep animated, tactile details while loading fast on mid-range phones, meeting WCAG 2.2 AA and staying easy to cite for search and AI engines.",
      fr: "La version Next.js précédente obtenait 59 en performance mobile, avec un Largest Contentful Paint de 4,9 s. L'objectif était de garder des détails animés et tactiles tout en chargeant vite sur un téléphone milieu de gamme, en respectant WCAG 2.2 AA et en restant facile à citer pour les moteurs de recherche et d'IA.",
      es: "La versión anterior en Next.js obtenía 59 en rendimiento móvil, con un Largest Contentful Paint de 4,9 s. El objetivo era conservar detalles animados y táctiles cargando rápido en un móvil de gama media, cumpliendo WCAG 2.2 AA y siendo fácil de citar para los motores de búsqueda y de IA.",
    },
    architectureTitle: {
      en: "Static Astro, No Client Framework",
      fr: "Astro statique, sans framework côté client.",
      es: "Astro estático, sin framework en el lado del cliente.",
    },
    architectureBody: {
      en: "Pages are pre-rendered by Astro and served as static assets by Cloudflare Workers, with strict security headers and a hash-based Content Security Policy. React Bits components (Aurora, RotatingText, SpotlightCard, Magnet) are ported to vanilla TypeScript, so no React runtime ships. GSAP and the WebGL background load only after the page is ready and are skipped under reduced motion.",
      fr: "Les pages sont pré-rendues par Astro et servies comme fichiers statiques par Cloudflare Workers, avec des en-têtes de sécurité stricts et une Content Security Policy à base d'empreintes. Les composants React Bits (Aurora, RotatingText, SpotlightCard, Magnet) sont portés en TypeScript natif, aucun runtime React n'est livré. GSAP et le fond WebGL ne se chargent qu'une fois la page prête, et sont ignorés en mouvement réduit.",
      es: "Astro prerrenderiza las páginas y Cloudflare Workers las sirve como archivos estáticos, con cabeceras de seguridad estrictas y una Content Security Policy basada en hashes. Los componentes de React Bits (Aurora, RotatingText, SpotlightCard, Magnet) están portados a TypeScript nativo, así que no se envía ningún runtime de React. GSAP y el fondo WebGL solo se cargan cuando la página está lista y se omiten con movimiento reducido.",
    },
    challengesTitle: {
      en: "Key Engineering Challenges",
      fr: "Défis techniques clés.",
      es: "Retos técnicos clave.",
    },
    challenges: [
      {
        en: "Keeping a WebGL background off the critical path: loaded after the page, rendered below screen resolution and paused off-screen.",
        fr: "Garder un fond WebGL hors du chemin critique : chargé après la page, rendu sous la résolution de l'écran et mis en pause hors champ.",
        es: "Mantener un fondo WebGL fuera de la ruta crítica: cargado después de la página, renderizado por debajo de la resolución de la pantalla y en pausa fuera de la vista.",
      },
      {
        en: "Trilingual parity with hreflang, JSON-LD, sitemap and llms.txt generated from a single content source.",
        fr: "Parité trilingue avec hreflang, JSON-LD, sitemap et llms.txt générés depuis une seule source de contenu.",
        es: "Paridad trilingüe con hreflang, JSON-LD, sitemap y llms.txt generados desde una única fuente de contenido.",
      },
    ],
    metricsTitle: { en: "Quality & Performance Audit", fr: "Audit qualité et performances.", es: "Auditoría de calidad y rendimiento." },
    metrics: [
      { label: { en: "Lighthouse mobile performance", fr: "Performance Lighthouse mobile", es: "Rendimiento Lighthouse móvil" }, value: "98+ / 100" },
      { label: { en: "Lighthouse accessibility", fr: "Accessibilité Lighthouse", es: "Accesibilidad Lighthouse" }, value: "100 / 100" },
      { label: { en: "Cumulative Layout Shift", fr: "Décalage de mise en page", es: "Desplazamiento del diseño" }, value: "0" },
      { label: { en: "SEO & AEO Readiness", fr: "Préparation SEO & IA", es: "Preparación SEO e IA" }, value: "llms.txt + JSON-LD" },
    ],
  },
};
