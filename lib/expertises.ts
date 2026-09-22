export const EXPERTISES = {
  "cloud-devops": {
    title: { fr: "Architecture Cloud et DevOps", en: "Cloud architecture and DevOps" },
    summary: {
      fr: "Jules Royet est architecte Cloud et DevOps chez Orange. Son travail porte sur les migrations vers Azure et le cloud privé, les architectures conteneurisées et l’automatisation des déploiements. Basé à Bordeaux, avec une mission à Nice, il associe conception d’architecture et expérience du développement logiciel.",
      en: "Jules Royet is a Cloud & DevOps Architect at Orange. His work covers migrations to Azure and private cloud, container-based architectures and deployment automation. Based in Bordeaux, with an assignment in Nice, he combines architecture design with hands-on software engineering experience.",
    },
    sections: [
      { fr: "Concevoir une migration vers Azure", en: "Designing an Azure migration", body: {
        fr: "Une migration commence par les dépendances de l’application, ses données et ses contraintes d’exploitation. Chez Orange, je participe à la définition des architectures cibles avec Azure Container Apps, AKS et WAF v2, ainsi qu’à la rédaction des dossiers d’architecture technique. Le choix d’un service doit répondre à un besoin précis : isolation réseau, montée en charge, maintenance ou continuité de service.",
        en: "A migration starts with an application’s dependencies, data and operational requirements. At Orange, I help define target architectures using Azure Container Apps, AKS and WAF v2, and document technical architecture decisions. A service should address a specific need: network isolation, scaling, maintenance or service continuity.",
      } },
      { fr: "Relier infrastructure et livraison logicielle", en: "Connecting infrastructure and software delivery", body: {
        fr: "Mon expérience de développement sur la boutique Orange relie les choix d’infrastructure à leurs conséquences pour les équipes produit. GitLab CI/CD, Docker et Kubernetes font partie de ce parcours. Sur mon infrastructure personnelle, j’exploite des VPS Oracle Cloud avec Dokploy et Traefik. Ces deux contextes permettent de comparer les besoins d’une plateforme d’entreprise avec ceux d’un environnement auto-hébergé.",
        en: "My software engineering experience on the Orange online store connects infrastructure decisions to their effects on product teams. GitLab CI/CD, Docker and Kubernetes are part of that background. On my personal infrastructure, I operate Oracle Cloud VPS instances with Dokploy and Traefik. These contexts offer different perspectives on enterprise platforms and self-hosted environments.",
      } },
      { fr: "Automatiser avec des décisions explicites", en: "Automating with explicit decisions", body: {
        fr: "M2C Flows illustre mon travail sur l’outillage de migration assisté par l’IA. L’objectif est de faciliter la préparation et la documentation des migrations, tout en conservant une validation humaine des décisions d’architecture. Les études de cas détaillent le contexte, mon rôle et les choix techniques, avec les limites de publication propres aux projets professionnels.",
        en: "M2C Flows illustrates my work on AI-assisted migration tooling. The goal is to support migration preparation and documentation while retaining human review of architecture decisions. The case studies explain the context, my role and technical choices within the publication limits of professional projects.",
      } },
    ],
    projects: ["m2c-flows", "automatisms", "hermes"],
    questions: [
      { fr: "Azure Container Apps ou AKS ?", en: "Azure Container Apps or AKS?", answer: {
        fr: "Azure Container Apps convient aux applications conteneurisées qui peuvent s’appuyer sur une plateforme managée. AKS donne davantage de contrôle sur Kubernetes, au prix d’une exploitation plus exigeante. La décision dépend notamment des contraintes réseau, des workloads et de l’équipe qui maintiendra le système.",
        en: "Azure Container Apps suits containerized applications that can rely on a managed platform. AKS offers more control over Kubernetes, with greater operational responsibility. The choice depends on networking requirements, workloads and the team that will maintain the system.",
      } },
      { fr: "Quels éléments préparer pour un échange technique ?", en: "What should you prepare for a technical discussion?", answer: {
        fr: "Le contexte de l’application, l’hébergement actuel, les dépendances, les contraintes de sécurité et l’objectif de migration permettent un premier échange utile. Les modalités d’une mission ou d’une opportunité professionnelle se discutent directement.",
        en: "Application context, current hosting, dependencies, security requirements and migration goals help make an initial discussion useful. Assignment terms or employment opportunities can be discussed directly.",
      } },
    ],
  },
  "developpement-logiciel": {
    title: { fr: "Développement logiciel et applications web", en: "Software engineering and web applications" },
    summary: {
      fr: "Jules Royet est ingénieur logiciel diplômé de l’ENSEIRB-MATMECA. Son parcours comprend le backend Java, Spring Boot et Kotlin, les interfaces TypeScript et des applications web développées chez Orange, Market Control et CDG33. Ses projets relient expérience utilisateur, API et exploitation.",
      en: "Jules Royet is a software engineer and ENSEIRB-MATMECA graduate. His background includes Java, Spring Boot and Kotlin backends, TypeScript interfaces and web applications built at Orange, Market Control and CDG33. His projects connect user experience, APIs and operations.",
    },
    sections: [
      { fr: "Du besoin métier à l’application", en: "From business needs to an application", body: {
        fr: "Une application utile commence par un parcours clair et des règles métier explicites. Chez CDG33, j’ai travaillé sur une application Symfony d’envoi planifié de SMS avec une console d’administration. Chez Market Control, à Barcelone, j’ai participé à la modernisation d’outils commerciaux vers des interfaces web OpenUI5. Ces expériences m’ont appris à composer avec un existant et des utilisateurs réels.",
        en: "A useful application starts with a clear user journey and explicit business rules. At CDG33, I worked on a Symfony application for scheduled SMS delivery with an administration console. At Market Control in Barcelona, I helped modernize commercial tools into OpenUI5 web interfaces. These experiences involved existing systems and real users.",
      } },
      { fr: "Backend, frontend et tests", en: "Backend, frontend and testing", body: {
        fr: "Pendant mon apprentissage chez Orange, j’ai développé des fonctionnalités avec Spring Boot, Kotlin, Svelte et MongoDB. Les tests avec JUnit, Hurl et Cypress et les pipelines GitLab CI/CD faisaient partie de la livraison. Sur mes projets personnels, j’utilise aussi React, Next.js, TypeScript et PostgreSQL. Le choix de stack dépend du projet et de sa maintenance, plutôt que d’une technologie unique appliquée partout.",
        en: "During my apprenticeship at Orange, I developed features with Spring Boot, Kotlin, Svelte and MongoDB. Testing with JUnit, Hurl and Cypress and GitLab CI/CD pipelines was part of delivery. My personal projects also use React, Next.js, TypeScript and PostgreSQL. Stack selection depends on the project and its maintenance needs rather than applying one technology everywhere.",
      } },
      { fr: "Des réalisations consultables", en: "Projects you can explore", body: {
        fr: "Shopeen, Stakeirb et Mijotons présentent différents contextes de développement d’applications. Chaque étude de cas décrit le problème, l’architecture et mon rôle. Les liens de code ou de démonstration sont indiqués lorsqu’ils sont publics. Mon parcours entre Bordeaux, Bayonne, Barcelone et Nice donne aussi le contexte de mes expériences, sans réduire les projets à une liste de technologies.",
        en: "Shopeen, Stakeirb and Mijotons cover different application development contexts. Each case study explains the problem, architecture and my role. Code and demo links are included where they are public. My background across Bordeaux, Bayonne, Barcelona and Nice provides context for that experience beyond a list of technologies.",
      } },
    ],
    projects: ["shopeen", "stakeirb", "mijotons"],
    questions: [
      { fr: "Quelles technologies backend et frontend ?", en: "Which backend and frontend technologies?", answer: {
        fr: "Mon expérience professionnelle inclut Java, Spring Boot, Kotlin, Svelte, Symfony et OpenUI5. Mes réalisations personnelles utilisent également TypeScript, React et Next.js. Les études de cas précisent les technologies utilisées sur chaque projet.",
        en: "My professional experience includes Java, Spring Boot, Kotlin, Svelte, Symfony and OpenUI5. Personal projects also use TypeScript, React and Next.js. Each case study identifies its actual stack.",
      } },
      { fr: "Comment présenter une demande de développement ?", en: "How should you describe a development request?", answer: {
        fr: "Précise les utilisateurs concernés, le problème à résoudre, l’existant et les contraintes de calendrier. Je suis ouvert aux échanges sur des opportunités salariées et des projets freelance ; le périmètre et la disponibilité sont à confirmer ensemble.",
        en: "Describe the users, the problem to solve, existing systems and timing constraints. I am open to discussing employment opportunities and freelance projects; scope and availability should be confirmed together.",
      } },
    ],
  },
  "systemes-ia": {
    title: { fr: "Agents IA et automatisation des outils développeur", en: "AI agents and developer workflow automation" },
    summary: {
      fr: "Jules Royet conçoit et exploite des systèmes agentiques autour d’Hermes, OpenCode et du routage de modèles. Son approche relie intégration logicielle, infrastructure d’exécution et contrôle des coûts. Ses études de cas décrivent des déploiements et des outils, avec leurs choix techniques et leurs limites.",
      en: "Jules Royet builds and operates agentic systems using Hermes, OpenCode and model routing. His approach connects software integration, runtime infrastructure and cost control. His case studies describe deployments and tools, including technical decisions and limitations.",
    },
    sections: [
      { fr: "Donner un environnement d’exécution aux agents", en: "Giving agents a runtime environment", body: {
        fr: "Un agent utile doit accéder aux bons outils et conserver le contexte nécessaire à sa tâche. Mon déploiement d’Hermes sur une infrastructure auto-hébergée couvre le runtime, la mémoire et l’intégration des outils. Les contraintes d’exploitation restent centrales : disponibilité, permissions, secrets et capacité à examiner ce qui a été exécuté.",
        en: "A useful agent needs access to appropriate tools and enough context for its task. My self-hosted Hermes deployment covers the runtime, memory and tool integration. Operational requirements remain central: availability, permissions, secrets and the ability to inspect what ran.",
      } },
      { fr: "Choisir et router les modèles", en: "Choosing and routing models", body: {
        fr: "Omniroute et mon expérience avec LiteLLM portent sur l’accès aux modèles et leur intégration dans les applications. Le routage doit tenir compte de la qualité attendue, de la latence et du budget. L’optimisation des tokens complète ce travail : elle vise à réduire le contexte inutile sans retirer les informations nécessaires à une tâche fiable.",
        en: "Omniroute and my experience with LiteLLM focus on model access and application integration. Routing needs to consider expected quality, latency and budget. Token optimization complements this work by reducing unnecessary context without removing information required to complete a task reliably.",
      } },
      { fr: "Intégrer l’IA dans un workflow existant", en: "Integrating AI into an existing workflow", body: {
        fr: "Le projet OpenCode Harness concerne l’environnement de travail des agents de développement. M2C Flows applique l’assistance IA à la préparation de migrations cloud. Dans les deux cas, le point de départ est une tâche identifiée et un résultat vérifiable. Les décisions engageantes et la validation du code restent sous contrôle humain. Les pages projets détaillent ce qui a été construit plutôt que de promettre une autonomie sans limites.",
        en: "OpenCode Harness focuses on the working environment of coding agents. M2C Flows applies AI assistance to cloud migration preparation. Both start with an identified task and a verifiable result. Consequential decisions and code approval remain under human control. The project pages explain what was built rather than promising unlimited autonomy.",
      } },
    ],
    projects: ["hermes", "omniroute", "opencode-harness", "m2c-flows"],
    questions: [
      { fr: "Quelle différence entre un chatbot et un agent ?", en: "What is the difference between a chatbot and an agent?", answer: {
        fr: "Un chatbot produit principalement des réponses dans une conversation. Un agent peut aussi appeler des outils et enchaîner des actions pour atteindre un objectif. Cette capacité nécessite de définir ses permissions, ses critères de réussite et les étapes qui exigent une validation humaine.",
        en: "A chatbot primarily produces conversational responses. An agent can also call tools and sequence actions toward a goal. That ability requires explicit permissions, success criteria and steps that need human approval.",
      } },
      { fr: "Quels exemples peut-on consulter ?", en: "Which examples can you explore?", answer: {
        fr: "Les études de cas Hermes, Omniroute et OpenCode Harness présentent respectivement un runtime d’agent autonome, le routage de modèles et l’outillage d’agents de développement. Les liens publics et les contraintes de confidentialité sont précisés sur chaque page.",
        en: "The Hermes, Omniroute and OpenCode Harness case studies cover an autonomous agent runtime, model routing and coding-agent tooling respectively. Each page identifies public links and any confidentiality constraints.",
      } },
    ],
  },
} as const;

export type ExpertiseSlug = keyof typeof EXPERTISES;
