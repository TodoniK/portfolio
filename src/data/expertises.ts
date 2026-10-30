export const EXPERTISES = {
  "cloud-devops": {
    title: { fr: "Architecture Cloud et DevOps", en: "Cloud architecture and DevOps", es: "Arquitectura cloud y DevOps" },
    summary: {
      fr: "Jules Royet est architecte Cloud et DevOps chez Orange. Son travail porte sur les migrations vers Azure et le cloud privé, les architectures conteneurisées et l’automatisation des déploiements. Basé à Nice, il associe conception d’architecture et expérience du développement logiciel.",
      en: "Jules Royet is a Cloud & DevOps Architect at Orange. His work covers migrations to Azure and private cloud, container-based architectures and deployment automation. Based in Nice, he combines architecture design with hands-on software engineering experience.",
      es: "Jules Royet es arquitecto cloud y DevOps en Orange. Su trabajo abarca las migraciones a Azure y a la nube privada, las arquitecturas basadas en contenedores y la automatización de despliegues. Con base en Niza, combina el diseño de arquitectura con la experiencia en desarrollo de software.",
    },
    sections: [
      { fr: "Concevoir une migration vers Azure", en: "Designing an Azure migration", es: "Diseñar una migración a Azure", body: {
        fr: "Une migration commence par les dépendances de l’application, ses données et ses contraintes d’exploitation. Chez Orange, je participe à la définition des architectures cibles avec Azure Container Apps, AKS et WAF v2, ainsi qu’à la rédaction des dossiers d’architecture technique. Le choix d’un service doit répondre à un besoin précis : isolation réseau, montée en charge, maintenance ou continuité de service.",
        en: "A migration starts with an application’s dependencies, data and operational requirements. At Orange, I help define target architectures using Azure Container Apps, AKS and WAF v2, and document technical architecture decisions. A service should address a specific need: network isolation, scaling, maintenance or service continuity.",
        es: "Una migración empieza por las dependencias de la aplicación, sus datos y sus requisitos de operación. En Orange, participo en la definición de las arquitecturas objetivo con Azure Container Apps, AKS y WAF v2, así como en la redacción de los documentos de arquitectura técnica. La elección de un servicio debe responder a una necesidad concreta: aislamiento de red, escalado, mantenimiento o continuidad del servicio.",
      } },
      { fr: "Relier infrastructure et livraison logicielle", en: "Connecting infrastructure and software delivery", es: "Conectar infraestructura y entrega de software", body: {
        fr: "Mon expérience de développement sur la boutique Orange relie les choix d’infrastructure à leurs conséquences pour les équipes produit. GitLab CI/CD, Docker et Kubernetes font partie de ce parcours. Sur mon infrastructure personnelle, j’exploite des VPS Oracle Cloud avec Dokploy et Traefik. Ces deux contextes permettent de comparer les besoins d’une plateforme d’entreprise avec ceux d’un environnement auto-hébergé.",
        en: "My software engineering experience on the Orange online store connects infrastructure decisions to their effects on product teams. GitLab CI/CD, Docker and Kubernetes are part of that background. On my personal infrastructure, I operate Oracle Cloud VPS instances with Dokploy and Traefik. These contexts offer different perspectives on enterprise platforms and self-hosted environments.",
        es: "Mi experiencia de desarrollo en la tienda online de Orange conecta las decisiones de infraestructura con sus consecuencias para los equipos de producto. GitLab CI/CD, Docker y Kubernetes forman parte de esa trayectoria. En mi infraestructura personal, gestiono VPS de Oracle Cloud con Dokploy y Traefik. Estos dos contextos permiten comparar las necesidades de una plataforma empresarial con las de un entorno autoalojado.",
      } },
      { fr: "Automatiser avec des décisions explicites", en: "Automating with explicit decisions", es: "Automatizar con decisiones explícitas", body: {
        fr: "M2C Flows illustre mon travail sur l’outillage de migration assisté par l’IA. L’objectif est de faciliter la préparation et la documentation des migrations, tout en conservant une validation humaine des décisions d’architecture. Les études de cas détaillent le contexte, mon rôle et les choix techniques, avec les limites de publication propres aux projets professionnels.",
        en: "M2C Flows illustrates my work on AI-assisted migration tooling. The goal is to support migration preparation and documentation while retaining human review of architecture decisions. The case studies explain the context, my role and technical choices within the publication limits of professional projects.",
        es: "M2C Flows ilustra mi trabajo en herramientas de migración asistidas por IA. El objetivo es facilitar la preparación y la documentación de las migraciones, manteniendo una validación humana de las decisiones de arquitectura. Los casos de estudio detallan el contexto, mi papel y las decisiones técnicas, dentro de los límites de publicación propios de los proyectos profesionales.",
      } },
    ],
    projects: ["m2c-flows", "automatisms", "hermes", "iplocator"],
    questions: [
      { fr: "Azure Container Apps ou AKS ?", en: "Azure Container Apps or AKS?", es: "¿Azure Container Apps o AKS?", answer: {
        fr: "Azure Container Apps convient aux applications conteneurisées qui peuvent s’appuyer sur une plateforme managée. AKS donne davantage de contrôle sur Kubernetes, au prix d’une exploitation plus exigeante. La décision dépend notamment des contraintes réseau, des workloads et de l’équipe qui maintiendra le système.",
        en: "Azure Container Apps suits containerized applications that can rely on a managed platform. AKS offers more control over Kubernetes, with greater operational responsibility. The choice depends on networking requirements, workloads and the team that will maintain the system.",
        es: "Azure Container Apps se adapta a las aplicaciones en contenedores que pueden apoyarse en una plataforma gestionada. AKS ofrece más control sobre Kubernetes, a cambio de una operación más exigente. La decisión depende sobre todo de los requisitos de red, de los workloads y del equipo que mantendrá el sistema.",
      } },
      { fr: "Quels éléments préparer pour un échange technique ?", en: "What should you prepare for a technical discussion?", es: "¿Qué conviene preparar para una conversación técnica?", answer: {
        fr: "Le contexte de l’application, l’hébergement actuel, les dépendances, les contraintes de sécurité et l’objectif de migration permettent un premier échange utile. Les modalités d’une mission ou d’une opportunité professionnelle se discutent directement.",
        en: "Application context, current hosting, dependencies, security requirements and migration goals help make an initial discussion useful. Assignment terms or employment opportunities can be discussed directly.",
        es: "El contexto de la aplicación, el alojamiento actual, las dependencias, los requisitos de seguridad y el objetivo de la migración permiten una primera conversación útil. Las condiciones de una misión o de una oportunidad profesional se tratan directamente.",
      } },
    ],
  },
  "developpement-logiciel": {
    title: { fr: "Développement logiciel et applications web", en: "Software engineering and web applications", es: "Desarrollo de software y aplicaciones web" },
    summary: {
      fr: "Jules Royet est ingénieur logiciel diplômé de l’ENSEIRB-MATMECA. Son parcours comprend le backend Java, Spring Boot et Kotlin, les interfaces TypeScript et des applications web développées chez Orange, Market Control et CDG33. Ses projets relient expérience utilisateur, API et exploitation.",
      en: "Jules Royet is a software engineer and ENSEIRB-MATMECA graduate. His background includes Java, Spring Boot and Kotlin backends, TypeScript interfaces and web applications built at Orange, Market Control and CDG33. His projects connect user experience, APIs and operations.",
      es: "Jules Royet es ingeniero de software titulado por ENSEIRB-MATMECA. Su trayectoria incluye backend con Java, Spring Boot y Kotlin, interfaces en TypeScript y aplicaciones web desarrolladas en Orange, Market Control y CDG33. Sus proyectos conectan experiencia de usuario, API y operación.",
    },
    sections: [
      { fr: "Du besoin métier à l’application", en: "From business needs to an application", es: "De la necesidad de negocio a la aplicación", body: {
        fr: "Une application utile commence par un parcours clair et des règles métier explicites. Chez CDG33, j’ai travaillé sur une application Symfony d’envoi planifié de SMS avec une console d’administration. Chez Market Control, à Barcelone, j’ai participé à la modernisation d’outils commerciaux vers des interfaces web OpenUI5. Ces expériences m’ont appris à composer avec un existant et des utilisateurs réels.",
        en: "A useful application starts with a clear user journey and explicit business rules. At CDG33, I worked on a Symfony application for scheduled SMS delivery with an administration console. At Market Control in Barcelona, I helped modernize commercial tools into OpenUI5 web interfaces. These experiences involved existing systems and real users.",
        es: "Una aplicación útil empieza por un recorrido de usuario claro y unas reglas de negocio explícitas. En CDG33, trabajé en una aplicación Symfony de envío programado de SMS con una consola de administración. En Market Control, en Barcelona, participé en la modernización de herramientas comerciales hacia interfaces web OpenUI5. Estas experiencias me enseñaron a trabajar con sistemas existentes y usuarios reales.",
      } },
      { fr: "Backend, frontend et tests", en: "Backend, frontend and testing", es: "Backend, frontend y tests", body: {
        fr: "Pendant mon apprentissage chez Orange, j’ai développé des fonctionnalités avec Spring Boot, Kotlin, Svelte et MongoDB. Les tests avec JUnit, Hurl et Cypress et les pipelines GitLab CI/CD faisaient partie de la livraison. Sur mes projets personnels, j’utilise aussi React, Next.js, TypeScript et PostgreSQL. Le choix de stack dépend du projet et de sa maintenance, plutôt que d’une technologie unique appliquée partout.",
        en: "During my apprenticeship at Orange, I developed features with Spring Boot, Kotlin, Svelte and MongoDB. Testing with JUnit, Hurl and Cypress and GitLab CI/CD pipelines was part of delivery. My personal projects also use React, Next.js, TypeScript and PostgreSQL. Stack selection depends on the project and its maintenance needs rather than applying one technology everywhere.",
        es: "Durante mi formación dual en Orange, desarrollé funcionalidades con Spring Boot, Kotlin, Svelte y MongoDB. Los tests con JUnit, Hurl y Cypress y los pipelines de GitLab CI/CD formaban parte de la entrega. En mis proyectos personales, también uso React, Next.js, TypeScript y PostgreSQL. La elección del stack depende del proyecto y de su mantenimiento, en lugar de aplicar una única tecnología en todas partes.",
      } },
      { fr: "Des réalisations consultables", en: "Projects you can explore", es: "Proyectos que se pueden consultar", body: {
        fr: "Shopeen, Stakeirb et Mijotons présentent différents contextes de développement d’applications. Chaque étude de cas décrit le problème, l’architecture et mon rôle. Les liens de code ou de démonstration sont indiqués lorsqu’ils sont publics. Mon parcours entre Bordeaux, Bayonne, Barcelone et Nice donne aussi le contexte de mes expériences, sans réduire les projets à une liste de technologies.",
        en: "Shopeen, Stakeirb and Mijotons cover different application development contexts. Each case study explains the problem, architecture and my role. Code and demo links are included where they are public. My background across Bordeaux, Bayonne, Barcelona and Nice provides context for that experience beyond a list of technologies.",
        es: "Shopeen, Stakeirb y Mijotons presentan distintos contextos de desarrollo de aplicaciones. Cada caso de estudio describe el problema, la arquitectura y mi papel. Los enlaces al código o a la demo se indican cuando son públicos. Mi trayectoria entre Burdeos, Bayona, Barcelona y Niza también da contexto a mis experiencias, sin reducir los proyectos a una lista de tecnologías.",
      } },
    ],
    projects: ["shopeen", "stakeirb", "mijotons", "iplocator", "portfolio"],
    questions: [
      { fr: "Quelles technologies backend et frontend ?", en: "Which backend and frontend technologies?", es: "¿Qué tecnologías de backend y frontend?", answer: {
        fr: "Mon expérience professionnelle inclut Java, Spring Boot, Kotlin, Svelte, Symfony et OpenUI5. Mes réalisations personnelles utilisent également TypeScript, React et Next.js. Les études de cas précisent les technologies utilisées sur chaque projet.",
        en: "My professional experience includes Java, Spring Boot, Kotlin, Svelte, Symfony and OpenUI5. Personal projects also use TypeScript, React and Next.js. Each case study identifies its actual stack.",
        es: "Mi experiencia profesional incluye Java, Spring Boot, Kotlin, Svelte, Symfony y OpenUI5. Mis proyectos personales también usan TypeScript, React y Next.js. Los casos de estudio detallan las tecnologías utilizadas en cada proyecto.",
      } },
      { fr: "Comment présenter une demande de développement ?", en: "How should you describe a development request?", es: "¿Cómo presentar una solicitud de desarrollo?", answer: {
        fr: "Précise les utilisateurs concernés, le problème à résoudre, l’existant et les contraintes de calendrier. Je suis ouvert aux échanges sur des opportunités salariées et des projets freelance ; le périmètre et la disponibilité sont à confirmer ensemble.",
        en: "Describe the users, the problem to solve, existing systems and timing constraints. I am open to discussing employment opportunities and freelance projects; scope and availability should be confirmed together.",
        es: "Indica los usuarios afectados, el problema que hay que resolver, lo que ya existe y las restricciones de plazos. Estoy abierto a hablar de oportunidades como asalariado y de proyectos freelance; el alcance y la disponibilidad se confirman juntos.",
      } },
    ],
  },
  "systemes-ia": {
    title: { fr: "Agents IA et automatisation des outils développeur", en: "AI agents and developer workflow automation", es: "Agentes de IA y automatización de herramientas para desarrolladores" },
    summary: {
      fr: "Jules Royet conçoit et exploite des systèmes agentiques autour d’Hermes, OpenCode et du routage de modèles. Son approche relie intégration logicielle, infrastructure d’exécution et contrôle des coûts. Ses études de cas décrivent des déploiements et des outils, avec leurs choix techniques et leurs limites.",
      en: "Jules Royet builds and operates agentic systems using Hermes, OpenCode and model routing. His approach connects software integration, runtime infrastructure and cost control. His case studies describe deployments and tools, including technical decisions and limitations.",
      es: "Jules Royet diseña y opera sistemas agénticos basados en Hermes, OpenCode y el enrutamiento de modelos. Su enfoque conecta la integración de software, la infraestructura de ejecución y el control de costes. Sus casos de estudio describen despliegues y herramientas, con sus decisiones técnicas y sus límites.",
    },
    sections: [
      { fr: "Donner un environnement d’exécution aux agents", en: "Giving agents a runtime environment", es: "Dar a los agentes un entorno de ejecución", body: {
        fr: "Un agent utile doit accéder aux bons outils et conserver le contexte nécessaire à sa tâche. Mon déploiement d’Hermes sur une infrastructure auto-hébergée couvre le runtime, la mémoire et l’intégration des outils. Les contraintes d’exploitation restent centrales : disponibilité, permissions, secrets et capacité à examiner ce qui a été exécuté.",
        en: "A useful agent needs access to appropriate tools and enough context for its task. My self-hosted Hermes deployment covers the runtime, memory and tool integration. Operational requirements remain central: availability, permissions, secrets and the ability to inspect what ran.",
        es: "Un agente útil debe acceder a las herramientas adecuadas y conservar el contexto necesario para su tarea. Mi despliegue de Hermes en una infraestructura autoalojada abarca el runtime, la memoria y la integración de herramientas. Los requisitos de operación siguen siendo centrales: disponibilidad, permisos, secretos y capacidad de revisar lo que se ha ejecutado.",
      } },
      { fr: "Choisir et router les modèles", en: "Choosing and routing models", es: "Elegir y enrutar los modelos", body: {
        fr: "Omniroute et mon expérience avec LiteLLM portent sur l’accès aux modèles et leur intégration dans les applications. Le routage doit tenir compte de la qualité attendue, de la latence et du budget. L’optimisation des tokens complète ce travail : elle vise à réduire le contexte inutile sans retirer les informations nécessaires à une tâche fiable.",
        en: "Omniroute and my experience with LiteLLM focus on model access and application integration. Routing needs to consider expected quality, latency and budget. Token optimization complements this work by reducing unnecessary context without removing information required to complete a task reliably.",
        es: "Omniroute y mi experiencia con LiteLLM se centran en el acceso a los modelos y su integración en las aplicaciones. El enrutamiento debe tener en cuenta la calidad esperada, la latencia y el presupuesto. La optimización de tokens completa este trabajo: busca reducir el contexto innecesario sin eliminar la información que una tarea fiable necesita.",
      } },
      { fr: "Intégrer l’IA dans un workflow existant", en: "Integrating AI into an existing workflow", es: "Integrar la IA en un workflow existente", body: {
        fr: "Le projet OpenCode Harness concerne l’environnement de travail des agents de développement. M2C Flows applique l’assistance IA à la préparation de migrations cloud. Dans les deux cas, le point de départ est une tâche identifiée et un résultat vérifiable. Les décisions engageantes et la validation du code restent sous contrôle humain. Les pages projets détaillent ce qui a été construit plutôt que de promettre une autonomie sans limites.",
        en: "OpenCode Harness focuses on the working environment of coding agents. M2C Flows applies AI assistance to cloud migration preparation. Both start with an identified task and a verifiable result. Consequential decisions and code approval remain under human control. The project pages explain what was built rather than promising unlimited autonomy.",
        es: "El proyecto OpenCode Harness se ocupa del entorno de trabajo de los agentes de desarrollo. M2C Flows aplica la asistencia de IA a la preparación de migraciones cloud. En ambos casos, el punto de partida es una tarea identificada y un resultado verificable. Las decisiones importantes y la validación del código siguen bajo control humano. Las páginas de proyecto detallan lo que se ha construido en lugar de prometer una autonomía sin límites.",
      } },
    ],
    projects: ["hermes", "omniroute", "opencode-harness", "m2c-flows"],
    questions: [
      { fr: "Quelle différence entre un chatbot et un agent ?", en: "What is the difference between a chatbot and an agent?", es: "¿Qué diferencia hay entre un chatbot y un agente?", answer: {
        fr: "Un chatbot produit principalement des réponses dans une conversation. Un agent peut aussi appeler des outils et enchaîner des actions pour atteindre un objectif. Cette capacité nécessite de définir ses permissions, ses critères de réussite et les étapes qui exigent une validation humaine.",
        en: "A chatbot primarily produces conversational responses. An agent can also call tools and sequence actions toward a goal. That ability requires explicit permissions, success criteria and steps that need human approval.",
        es: "Un chatbot produce principalmente respuestas dentro de una conversación. Un agente también puede llamar a herramientas y encadenar acciones para alcanzar un objetivo. Esta capacidad exige definir sus permisos, sus criterios de éxito y los pasos que requieren una validación humana.",
      } },
      { fr: "Quels exemples peut-on consulter ?", en: "Which examples can you explore?", es: "¿Qué ejemplos se pueden consultar?", answer: {
        fr: "Les études de cas Hermes, Omniroute et OpenCode Harness présentent respectivement un runtime d’agent autonome, le routage de modèles et l’outillage d’agents de développement. Les liens publics et les contraintes de confidentialité sont précisés sur chaque page.",
        en: "The Hermes, Omniroute and OpenCode Harness case studies cover an autonomous agent runtime, model routing and coding-agent tooling respectively. Each page identifies public links and any confidentiality constraints.",
        es: "Los casos de estudio Hermes, Omniroute y OpenCode Harness presentan, respectivamente, un runtime de agente autónomo, el enrutamiento de modelos y las herramientas para agentes de desarrollo. Cada página indica los enlaces públicos y las restricciones de confidencialidad.",
      } },
    ],
  },
} as const;

export type ExpertiseSlug = keyof typeof EXPERTISES;
