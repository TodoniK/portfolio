export type Locale = "en" | "fr";

export type Translations = {
  nav: {
    home: string;
    projects: string;
    about: string;
    themeDark: string;
    themeLight: string;
    langSwitch: string;
  };
  hero: {
    greeting: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    viewWork: string;
    contact: string;
    portraitAlt: string;
  };
  projects: {
    badge: string;
    headline: string;
    description: string;
    pageTitle: string;
    pageDescription: string;
    viewMore: string;
    viewCode: string;
    viewLive: string;
    confidential: string;
    items: Array<{
      id: string;
      tag: string;
      title: string;
      description: string;
      meta: string;
      stack?: string[];
      image: string;
      imageAlt: string;
      imageRatio: number;
      previewUrl: string;
      githubUrl: string;
      confidential: boolean;
    }>;
  };
  about: {
    pageTitle: string;
    bioTitle: string;
    bioP1: string;
    bioP2: string;
    bioP3: string;
    experienceTitle: string;
    showMore: string;
    showLess: string;
    educationTitle: string;
    certificationsTitle: string;
    skillsTitle: string;
    stackTitle: string;
    stackHint: string;
    resetStack: string;
    experiences: Array<{
      company: string;
      role: string;
      period: string;
      logo: string;
      description: string;
      url?: string;
    }>;
    educations: Array<{
      school: string;
      degree: string;
      period: string;
      city: string;
      logo: string;
      url?: string;
    }>;
    certifications: Array<{
      name: string;
      issuer: string;
      year: string;
      url?: string;
    }>;
    skills: string[];
  };
  contact: {
    headline: string;
    description: string;
    buttonIdle: string;
    buttonCopy: string;
    buttonCopied: string;
    seeProjects: string;
    downloadResume: string;
    builtWith: string;
    rights: string;
  };
};

export const DICTIONARY: Record<Locale, Translations> = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      themeDark: "Switch to dark theme",
      themeLight: "Switch to light theme",
      langSwitch: "Passer en français",
    },
    hero: {
      greeting: "Hey, I'm Jules",
      titleLine1: "Cloud & DevOps Architect",
      titleLine2: "and AI Systems Engineer",
      description:
        "Designing resilient cloud platforms, autonomous agent runtimes, automated CI/CD pipelines, and high-performance digital systems.",
      viewWork: "View My Work",
      contact: "Contact",
      portraitAlt: "Jules portrait",
    },
    projects: {
      badge: "Projects",
      headline: "My projects",
      description:
        "From cloud infrastructure and autonomous AI agent architectures to full stack software, a selection of work shipped to production.",
      pageTitle: "My recent work",
      pageDescription:
        "Cloud platforms, autonomous agent runtimes, automated pipelines, and full stack systems shipped with precision.",
      viewMore: "View all projects",
      viewCode: "Source code",
      viewLive: "Live preview",
      confidential: "Confidential",
      items: [
        {
          id: "hermes",
          tag: "AUTONOMOUS AI",
          title: "Hermes Autonomous Agent Daemon",
          description:
            "Self-hosted autonomous AI agent runtime deployed on Oracle Cloud with web dashboard, SQLite persistence, tool registries, and automated execution loops.",
          meta: "Oracle Cloud, Dokploy, Traefik, Docker and Hermes Agent",
          stack: ["Hermes Agent", "Oracle Cloud", "Dokploy", "Docker", "Traefik"],
          image: "/assets/projects/hermes.svg",
          imageAlt: "Hermes Agent Dashboard",
          imageRatio: 16 / 9,
          previewUrl: "https://hermes.julesroyet.dev",
          githubUrl: "",
          confidential: false,
        },
        {
          id: "omniroute",
          tag: "AI GATEWAY",
          title: "Omniroute Intelligent AI Model Router",
          description:
            "High-performance AI model gateway with sub-15ms routing, Redis semantic caching, latency-aware failover, and OpenAI and Anthropic protocol translation.",
          meta: "Node.js, Redis, Traefik, Dokploy and Cloudflare",
          stack: ["Node.js", "Redis", "Cloudflare", "Traefik", "Dokploy"],
          image: "/assets/projects/omniroute.svg",
          imageAlt: "Omniroute Gateway Architecture",
          imageRatio: 16 / 9,
          previewUrl: "https://omniroute.julesroyet.dev",
          githubUrl: "",
          confidential: false,
        },
        {
          id: "m2c-flows",
          tag: "ORANGE M2C",
          title: "M2C Flows : SI Digital Twin",
          description:
            "Stateless web platform mapping multi-tier IT dependencies, simulating cloud migrations to Azure and measuring inter-datacenter latency impacts for Orange DSI.",
          meta: "Orange DSI, Azure, GitLab Pages and On-Premise",
          stack: ["Azure", "GitLab", "TypeScript", "Docker"],
          image: "/assets/projects/m2c-flows.svg",
          imageAlt: "M2C Flows Digital Twin",
          imageRatio: 16 / 9,
          previewUrl: "",
          githubUrl: "",
          confidential: true,
        },
        {
          id: "opencode-harness",
          tag: "DEVELOPER TOOLS",
          title: "Agentic Engineering Runtime & Harness",
          description:
            "Custom local runtime for OpenCode and Claude Code featuring Rust-based RTK token compression, persistent session memory, and MCP orchestration.",
          meta: "TypeScript, Rust, RTK, OpenCode and Claude Code",
          stack: ["TypeScript", "Rust", "OpenCode", "Claude Code"],
          image: "/assets/projects/opencode-harness.svg",
          imageAlt: "Agentic Engineering Harness",
          imageRatio: 16 / 9,
          previewUrl: "",
          githubUrl: "",
          confidential: false,
        },
        {
          id: "shopeen",
          tag: "ORANGE",
          title: "Enterprise Carbon Footprint Calculator",
          description:
            "Confidential internal platform estimating the environmental impact and CO2 production of Orange online retail IT infrastructure.",
          meta: "Orange, Spring Boot, Kotlin, Svelte and MongoDB",
          stack: ["Spring Boot", "Kotlin", "Svelte", "MongoDB", "Kubernetes"],
          image: "/assets/projects/shopeen.webp",
          imageAlt: "Shopeen ecological footprint calculator",
          imageRatio: 1922 / 950,
          previewUrl: "",
          githubUrl: "",
          confidential: true,
        },
        {
          id: "stakeirb",
          tag: "ENSEIRB",
          title: "Real-Time Gaming & Casino Platform",
          description:
            "Full stack web application simulating an online casino with multiplayer WebSocket synchronization and interactive gaming logic.",
          meta: "School Project, Vue.js, Node.js, Socket.io, Express and SQLite",
          stack: ["Node.js", "Vue.js", "Socket.io", "SQLite", "Express.js"],
          image: "/assets/projects/stakeirb.webp",
          imageAlt: "Stak'eirb gaming platform screenshot",
          imageRatio: 780 / 585,
          previewUrl: "https://stakeirb.julesroyet.dev",
          githubUrl: "https://github.com/TodoniK/stakeirb",
          confidential: false,
        },
        {
          id: "iplocator",
          tag: "NETWORKING",
          title: "IP Geolocation & Network Intelligence",
          description:
            "Real-time IP lookup application providing geographic pinpointing, ISP analysis, and interactive map integration.",
          meta: "Vue.js, Express, MongoDB and OpenAPI Swagger",
          stack: ["Node.js", "MongoDB", "Vue.js", "Express.js", "Docker"],
          image: "/assets/projects/iplocator.webp",
          imageAlt: "IP Locator web interface",
          imageRatio: 3022 / 1646,
          previewUrl: "https://iplocator.julesroyet.dev",
          githubUrl: "https://github.com/TodoniK/ip-locator",
          confidential: false,
        },
        {
          id: "automatisms",
          tag: "CDG33",
          title: "SMS Campaign Automation Backoffice",
          description:
            "Administrative web platform designed for scheduled SMS broadcasts, campaign dispatching, and automated contact management.",
          meta: "CDG33, Symfony, PHP, MySQL and Apache",
          stack: ["Symfony", "PHP", "MySQL", "Linux", "Docker"],
          image: "/assets/projects/automatisms.webp",
          imageAlt: "AutomatiSMS management console",
          imageRatio: 2188 / 1156,
          previewUrl: "",
          githubUrl: "",
          confidential: true,
        },
        {
          id: "mijotons",
          tag: "MOBILE",
          title: "Mijotons Smart Grocery & Recipe App",
          description:
            "Native Android application managing grocery lists, supermarket geolocation with OpenStreetMap, and anti-waste recipe suggestions.",
          meta: "Android Studio, Java, MySQL and OpenStreetMap",
          stack: ["Android", "Java", "MySQL", "Linux"],
          image: "/assets/projects/mijotons.webp",
          imageAlt: "Mijotons mobile application",
          imageRatio: 4164 / 2736,
          previewUrl: "https://todonik.github.io/mijotons-website/",
          githubUrl: "https://github.com/TodoniK/mijotons-dev",
          confidential: false,
        },
        {
          id: "portfolio",
          tag: "PORTFOLIO",
          title: "Personal Portfolio & Interactive Showcase",
          description:
            "Modern developer portfolio built with Next.js 16, OGL shaders, Matter.js physics sandbox, and bilingual internationalization.",
          meta: "Next.js 16, React 19, Tailwind CSS v4 and TypeScript",
          stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Cloudflare"],
          image: "/assets/projects/portfolio.webp",
          imageAlt: "Jules Royet Portfolio showcase",
          imageRatio: 3024 / 1288,
          previewUrl: "https://julesroyet.dev",
          githubUrl: "https://github.com/TodoniK/portfolio",
          confidential: false,
        },
      ],
    },
    about: {
      pageTitle: "About",
      bioTitle: "Hello, I'm Jules Royet.",
      bioP1:
        "Cloud & DevOps Architect and Software Engineer graduated from ENSEIRB-MATMECA. I design resilient cloud platforms, automated CI/CD pipelines, and agentic AI systems. With over 3 years of hands-on experience, I connect system architecture, developer tooling, and reliable production engineering.",
      bioP2:
        "Currently working at Orange as a Cloud & DevOps Architect, I guide application migrations toward Azure and Orange private cloud infrastructures. I define target architectures with Azure Container Apps, AKS, and WAF v2, while automating workflows with custom AI agents and digital twin tooling. I also practice defensive cybersecurity on Root-Me and build autonomous AI platforms.",
      bioP3:
        "Outside enterprise systems, I run my own cloud infrastructure on Oracle Cloud with Dokploy and Traefik, deploy autonomous agents like Hermes, optimize token consumption with custom Rust tools, and experiment with creative frontend technologies.",
      experienceTitle: "Experience",
      showMore: "Show {count} more",
      showLess: "Show less",
      educationTitle: "Education",
      certificationsTitle: "Certifications",
      skillsTitle: "Areas of expertise",
      stackTitle: "Stack & Tools",
      stackHint: "Interactive physics sandbox: drag and play with tools",
      resetStack: "Reset stack",
      experiences: [
        {
          company: "Orange",
          role: "Cloud & DevOps Architect",
          period: "Sept. 2025 to Present",
          logo: "/assets/companies/logo-orange.webp",
          url: "https://www.orange.com",
          description:
            "Guiding application migrations to Azure and Orange private cloud. Target architecture design with ACA, AKS, WAF v2, VNet and Private Endpoints. Technical architecture dossiers (DAT), FinOps governance, and AI automation tooling including M2C Flows and Claude Code with Obsidian memory.",
        },
        {
          company: "Orange",
          role: "Software Engineer (Apprenticeship)",
          period: "Sept. 2022 to Aug. 2025",
          logo: "/assets/companies/logo-orange.webp",
          url: "https://www.orange.com",
          description:
            "Full stack development on the Orange online store serving over 600,000 yearly visitors with Spring Boot, Kotlin, Svelte and MongoDB. Integrated GPT-4o and LiteLLM pipelines cutting product publishing time by 75%. Automated testing with JUnit, Hurl, Cypress and GitLab CI/CD on Kubernetes.",
        },
        {
          company: "Market Control",
          role: "Software Engineer Intern",
          period: "May 2023 to Aug. 2023",
          logo: "/assets/companies/logo-market-control.webp",
          url: "https://www.market-control.com",
          description:
            "Modernized legacy commercial tracking systems into responsive OpenUI5 web platforms in Barcelona. Achieved 40% page load reduction, 87% test coverage with Opa5, Docker containerization, and SAP BTP cloud deployments.",
        },
        {
          company: "CDG33",
          role: "Developer & Project Manager",
          period: "Apr. 2022 to Jun. 2022",
          logo: "/assets/companies/logo-cdg33.webp",
          url: "https://www.cdg33.fr",
          description:
            "Delivered a Symfony web application for scheduled SMS dispatching with administrative console (1,000+ weekly messages) and conducted an AI chatbot proof of concept.",
        },
      ],
      educations: [
        {
          school: "ENSEIRB-MATMECA",
          degree: "Master of Science in Computer Science & Networks",
          period: "2022 to 2025",
          city: "Bordeaux, France",
          logo: "/assets/schools/logo-enseirb-matmeca.webp",
          url: "https://enseirb-matmeca.bordeaux-inp.fr",
        },
        {
          school: "IUT de Bayonne (UPPA)",
          degree: "Bachelor of Technology in Computer Science (DUT)",
          period: "2020 to 2022",
          city: "Bayonne, France",
          logo: "/assets/schools/logo-iut-bayonne.webp",
          url: "https://www.iutbayonne.univ-pau.fr",
        },
      ],
      certifications: [
        {
          name: "AZ-900: Microsoft Azure Fundamentals",
          issuer: "Microsoft",
          year: "2025",
          url: "https://learn.microsoft.com/credentials/certifications/azure-fundamentals/",
        },
        {
          name: "Infrastructure Automation with Terraform",
          issuer: "HashiCorp",
          year: "2025",
          url: "https://www.hashicorp.com/certification/terraform-associate",
        },
        {
          name: "AWS Cloud Technical Essentials",
          issuer: "Amazon Web Services",
          year: "2025",
          url: "https://aws.amazon.com/training/",
        },
        {
          name: "TOEIC: C1 Level (Full Professional)",
          issuer: "ETS Global",
          year: "2024 to 2026",
          url: "https://www.etsglobal.org/fr/fr/programme/toeic-tests",
        },
      ],
      skills: [
        "Cloud Architecture (Azure, GCP, OCI)",
        "Autonomous AI Agents (Hermes, OpenCode)",
        "AI Gateways & Model Routing (Omniroute, LiteLLM)",
        "Docker & Kubernetes (ACA, AKS)",
        "Infrastructure as Code (Terraform)",
        "CI/CD & DevSecOps (GitLab, GitHub Actions)",
        "Backend (Java, Spring Boot, Kotlin, Node.js)",
        "Frontend (TypeScript, React, Next.js, Svelte)",
        "Databases (Cosmos DB, MongoDB, PostgreSQL)",
        "Cybersecurity & CTF (Root-Me, DevSecOps)",
        "Linux & Shell Scripting",
        "Green IT & Eco-Design",
      ],
    },
    contact: {
      headline: "Let's connect",
      description:
        "Always open to discussing cloud architecture challenges, autonomous AI systems, DevOps practices, or innovative engineering. Reach out anytime.",
      buttonIdle: "Contact",
      buttonCopy: "Copy {email}",
      buttonCopied: "Email copied",
      seeProjects: "See projects",
      downloadResume: "Download Resume",
      builtWith: "2026 © Jules Royet, Built with Next.js",
      rights: "Cloud & DevOps Architect",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      projects: "Projets",
      about: "À propos",
      themeDark: "Activer le mode sombre",
      themeLight: "Activer le mode clair",
      langSwitch: "Switch to English",
    },
    hero: {
      greeting: "Salut, moi c'est Jules",
      titleLine1: "Architecte Cloud & DevOps",
      titleLine2: "et Ingénieur Systèmes IA",
      description:
        "Conception d'architectures cloud résilientes, de runtimes d'agents autonomes, de pipelines CI/CD et de systèmes logiciels performants.",
      viewWork: "Découvrir mes projets",
      contact: "Me contacter",
      portraitAlt: "Portrait de Jules",
    },
    projects: {
      badge: "Projets",
      headline: "Mes projets",
      description:
        "Des infrastructures cloud aux agents d'IA autonomes et applications logicielles, une sélection de systèmes mis en production.",
      pageTitle: "Mes réalisations",
      pageDescription:
        "Architectures cloud, plateformes d'IA agentiques, chaînes d'intégration continue et applications développées avec rigueur.",
      viewMore: "Voir tous les projets",
      viewCode: "Code source",
      viewLive: "Démo en direct",
      confidential: "Confidentiel",
      items: [
        {
          id: "hermes",
          tag: "IA AUTONOME",
          title: "Démon d'Agent Autonome Hermes",
          description:
            "Plateforme d'agent IA autonome auto-hébergée sur Oracle Cloud avec dashboard web, persistance SQLite, registre d'outils et boucles d'exécution planifiées.",
          meta: "Oracle Cloud, Dokploy, Traefik, Docker et Hermes Agent",
          stack: ["Hermes Agent", "Oracle Cloud", "Dokploy", "Docker", "Traefik"],
          image: "/assets/projects/hermes.svg",
          imageAlt: "Dashboard Agent Hermes",
          imageRatio: 16 / 9,
          previewUrl: "https://hermes.julesroyet.dev",
          githubUrl: "",
          confidential: false,
        },
        {
          id: "omniroute",
          tag: "PASSERELLE IA",
          title: "Passerelle de Routage d'IA Omniroute",
          description:
            "Passerelle d'inférence de modèles d'IA haute performance avec routage sous 15ms, cache sémantique Redis, bascule dynamique et compatibilité OpenAI et Anthropic.",
          meta: "Node.js, Redis, Traefik, Dokploy et Cloudflare",
          stack: ["Node.js", "Redis", "Cloudflare", "Traefik", "Dokploy"],
          image: "/assets/projects/omniroute.svg",
          imageAlt: "Architecture Passerelle Omniroute",
          imageRatio: 16 / 9,
          previewUrl: "https://omniroute.julesroyet.dev",
          githubUrl: "",
          confidential: false,
        },
        {
          id: "m2c-flows",
          tag: "ORANGE M2C",
          title: "M2C Flows : Jumeau Numérique SI",
          description:
            "Application web stateless cartographiant les dépendances multi-couches du SI, simulant les migrations vers Azure et analysant les impacts de latence pour la DSI Orange.",
          meta: "Orange DSI, Azure, GitLab Pages et On-Premise",
          stack: ["Azure", "GitLab", "TypeScript", "Docker"],
          image: "/assets/projects/m2c-flows.svg",
          imageAlt: "Jumeau Numérique M2C Flows",
          imageRatio: 16 / 9,
          previewUrl: "",
          githubUrl: "",
          confidential: true,
        },
        {
          id: "opencode-harness",
          tag: "OUTILLAGE DEV",
          title: "Harness d'Ingénierie Agentique OpenCode",
          description:
            "Environnement d'exécution local pour OpenCode et Claude Code avec compresseur de tokens RTK en Rust, mémoire de session persistante et MCPs Dokploy et Cloudflare.",
          meta: "TypeScript, Rust, RTK, OpenCode et Claude Code",
          stack: ["TypeScript", "Rust", "OpenCode", "Claude Code"],
          image: "/assets/projects/opencode-harness.svg",
          imageAlt: "Harness d'Ingénierie Agentique",
          imageRatio: 16 / 9,
          previewUrl: "",
          githubUrl: "",
          confidential: false,
        },
        {
          id: "shopeen",
          tag: "ORANGE",
          title: "Calculateur d'empreinte carbone SI",
          description:
            "Application interne confidentielle estimant l'impact écologique et les émissions de CO2 de l'infrastructure e-commerce d'Orange.",
          meta: "Orange, Spring Boot, Kotlin, Svelte et MongoDB",
          stack: ["Spring Boot", "Kotlin", "Svelte", "MongoDB", "Kubernetes"],
          image: "/assets/projects/shopeen.webp",
          imageAlt: "Calculateur d'empreinte écologique Shopeen",
          imageRatio: 1922 / 950,
          previewUrl: "",
          githubUrl: "",
          confidential: true,
        },
        {
          id: "stakeirb",
          tag: "ENSEIRB",
          title: "Plateforme de jeux et casino temps réel",
          description:
            "Application web répliquant un casino en ligne avec gestion multijoueur via WebSockets et jeux interactifs synchronisés.",
          meta: "Projet d'école, Vue.js, Node.js, Socket.io, Express et SQLite",
          stack: ["Node.js", "Vue.js", "Socket.io", "SQLite", "Express.js"],
          image: "/assets/projects/stakeirb.webp",
          imageAlt: "Capture d'écran plateforme Stak'eirb",
          imageRatio: 780 / 585,
          previewUrl: "https://stakeirb.julesroyet.dev",
          githubUrl: "https://github.com/TodoniK/stakeirb",
          confidential: false,
        },
        {
          id: "iplocator",
          tag: "RÉSEAU",
          title: "Géolocalisation et analyse réseau IP",
          description:
            "Service d'analyse d'adresses IP fournissant les coordonnées géographiques, l'identification FAI et une carte interactive.",
          meta: "Vue.js, Express, MongoDB et OpenAPI Swagger",
          stack: ["Node.js", "MongoDB", "Vue.js", "Express.js", "Docker"],
          image: "/assets/projects/iplocator.webp",
          imageAlt: "Interface web IP Locator",
          imageRatio: 3022 / 1646,
          previewUrl: "https://iplocator.julesroyet.dev",
          githubUrl: "https://github.com/TodoniK/ip-locator",
          confidential: false,
        },
        {
          id: "automatisms",
          tag: "CDG33",
          title: "Backoffice de diffusion de campagnes SMS",
          description:
            "Application web d'administration pour la planification et l'envoi programmé de plus de 1000 SMS hebdomadaires.",
          meta: "CDG33, Symfony, PHP, MySQL et Apache",
          stack: ["Symfony", "PHP", "MySQL", "Linux", "Docker"],
          image: "/assets/projects/automatisms.webp",
          imageAlt: "Console de gestion AutomatiSMS",
          imageRatio: 2188 / 1156,
          previewUrl: "",
          githubUrl: "",
          confidential: true,
        },
        {
          id: "mijotons",
          tag: "MOBILE",
          title: "Application mobile Mijotons et Recettes",
          description:
            "Application Android native pour la gestion de listes de courses, repérage de magasins via OpenStreetMap et suggestions culinaires.",
          meta: "Android Studio, Java, MySQL et OpenStreetMap",
          stack: ["Android", "Java", "MySQL", "Linux"],
          image: "/assets/projects/mijotons.webp",
          imageAlt: "Application mobile Mijotons",
          imageRatio: 4164 / 2736,
          previewUrl: "https://todonik.github.io/mijotons-website/",
          githubUrl: "https://github.com/TodoniK/mijotons-dev",
          confidential: false,
        },
        {
          id: "portfolio",
          tag: "PORTFOLIO",
          title: "Portfolio personnel et vitrine interactive",
          description:
            "Portfolio moderne conçu avec Next.js 16, shaders OGL, bac à sable physique Matter.js et bascule bilingue instantanée.",
          meta: "Next.js 16, React 19, Tailwind CSS v4 et TypeScript",
          stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Cloudflare"],
          image: "/assets/projects/portfolio.webp",
          imageAlt: "Vitrine du portfolio de Jules Royet",
          imageRatio: 3024 / 1288,
          previewUrl: "https://julesroyet.dev",
          githubUrl: "https://github.com/TodoniK/portfolio",
          confidential: false,
        },
      ],
    },
    about: {
      pageTitle: "À propos",
      bioTitle: "Bonjour, je suis Jules Royet.",
      bioP1:
        "Architecte Cloud & DevOps et Ingénieur Logiciel diplômé de l'ENSEIRB-MATMECA. Je conçois des plateformes cloud résilientes, des pipelines d'intégration continue automatisés et des runtimes d'IA agentiques. Avec plus de 3 ans d'expérience pratique, j'assure la liaison entre architecture système, outillage développeur et fiabilité opérationnelle.",
      bioP2:
        "Actuellement chez Orange en tant qu'Architecte Cloud & DevOps, j'accompagne la migration des applications du SI vers Azure et les infrastructures de cloud privé Orange. Je définis les architectures cibles (Azure Container Apps, AKS, WAF v2), les dossiers techniques DAT et l'outillage de migration assisté par l'IA. Je m'investis également dans la cybersécurité défensive sur Root-Me et le pilotage de systèmes agentiques.",
      bioP3:
        "En parallèle des projets d'entreprise, j'administre ma propre infrastructure cloud sur VPS Oracle avec Dokploy et Traefik, déploie des agents autonomes comme Hermes, optimise la consommation de tokens par des outils écrits en Rust et conçois des interfaces frontend créatives.",
      experienceTitle: "Expérience",
      showMore: "Afficher {count} de plus",
      showLess: "Réduire",
      educationTitle: "Formation",
      certificationsTitle: "Certifications",
      skillsTitle: "Domaines d'expertise",
      stackTitle: "Stack & Outils",
      stackHint: "Bac à sable physique interactif : déplacez et jouez avec les outils",
      resetStack: "Réinitialiser la stack",
      experiences: [
        {
          company: "Orange",
          role: "Architecte Cloud & DevOps",
          period: "Sept. 2025 à aujourd'hui",
          logo: "/assets/companies/logo-orange.webp",
          url: "https://www.orange.com",
          description:
            "Accompagnement des migrations applicatives vers Azure et le cloud privé Orange. Définition de l'architecture cible avec ACA, AKS, WAF v2, VNet et Private Endpoints. Consolidation des DAT, préparation des comités FinOps et développement d'outils d'automatisation IA comme M2C Flows et Claude Code avec mémoire Obsidian.",
        },
        {
          company: "Orange",
          role: "Ingénieur Logiciel (Apprentissage)",
          period: "Sept. 2022 à Août 2025",
          logo: "/assets/companies/logo-orange.webp",
          url: "https://www.orange.com",
          description:
            "Développement full stack sur la boutique en ligne Orange (plus de 600 000 visiteurs par an) en Spring Boot, Kotlin, Svelte et MongoDB. Intégration de pipelines d'IA générative (GPT-4o, LiteLLM) réduisant de 75% le temps de publication des fiches produits. Tests automatisés JUnit, Hurl, Cypress et déploiement CI/CD GitLab sur Kubernetes.",
        },
        {
          company: "Market Control",
          role: "Ingénieur Logiciel Stagiaire",
          period: "Mai 2023 à Août 2023",
          logo: "/assets/companies/logo-market-control.webp",
          url: "https://www.market-control.com",
          description:
            "Modernisation d'un système commercial legacy PHP vers OpenUI5 et SAP BTP à Barcelone. Réduction de 40% des temps de chargement, couverture de tests automatisés Opa5 à 87%, conteneurisation Docker et intégration continue avec GitHub Actions.",
        },
        {
          company: "CDG33",
          role: "Développeur et Chef de Projet",
          period: "Avr. 2022 à Juin 2022",
          logo: "/assets/companies/logo-cdg33.webp",
          url: "https://www.cdg33.fr",
          description:
            "Conception et livraison d'une application web Symfony d'envois programmés de SMS avec console d'administration (+1000 messages hebdomadaires) et réalisation d'un démonstrateur de chatbot d'assistance.",
        },
      ],
      educations: [
        {
          school: "ENSEIRB-MATMECA",
          degree: "Diplôme d'Ingénieur Informatique et Réseaux",
          period: "2022 à 2025",
          city: "Bordeaux, France",
          logo: "/assets/schools/logo-enseirb-matmeca.webp",
          url: "https://enseirb-matmeca.bordeaux-inp.fr",
        },
        {
          school: "IUT de Bayonne (UPPA)",
          degree: "DUT Informatique",
          period: "2020 à 2022",
          city: "Bayonne, France",
          logo: "/assets/schools/logo-iut-bayonne.webp",
          url: "https://www.iutbayonne.univ-pau.fr",
        },
      ],
      certifications: [
        {
          name: "AZ-900: Microsoft Azure Fundamentals",
          issuer: "Microsoft",
          year: "2025",
          url: "https://learn.microsoft.com/credentials/certifications/azure-fundamentals/",
        },
        {
          name: "Infrastructure Automation with Terraform",
          issuer: "HashiCorp",
          year: "2025",
          url: "https://www.hashicorp.com/certification/terraform-associate",
        },
        {
          name: "AWS Cloud Technical Essentials",
          issuer: "Amazon Web Services",
          year: "2025",
          url: "https://aws.amazon.com/training/",
        },
        {
          name: "TOEIC : Score C1 (Anglais courant)",
          issuer: "ETS Global",
          year: "2024 à 2026",
          url: "https://www.etsglobal.org/fr/fr/programme/toeic-tests",
        },
      ],
      skills: [
        "Architecture Cloud (Azure, GCP, OCI)",
        "Agents IA Autonomes (Hermes, OpenCode)",
        "Passerelles & Routage IA (Omniroute, LiteLLM)",
        "Docker & Kubernetes (ACA, AKS)",
        "Infrastructure as Code (Terraform)",
        "CI/CD & DevSecOps (GitLab, GitHub Actions)",
        "Backend (Java, Spring Boot, Kotlin, Node.js)",
        "Frontend (TypeScript, React, Next.js, Svelte)",
        "Bases de Données (Cosmos DB, MongoDB, PostgreSQL)",
        "Cybersécurité & CTF (Root-Me, DevSecOps)",
        "Linux & Scripts Shell",
        "Green IT & Écoconception",
      ],
    },
    contact: {
      headline: "Prenons contact",
      description:
        "Toujours ouvert aux échanges sur l'architecture cloud, les agents d'IA autonomes, les pratiques DevOps ou de nouvelles opportunités d'ingénierie. N'hésitez pas.",
      buttonIdle: "Me contacter",
      buttonCopy: "Copier {email}",
      buttonCopied: "Email copié",
      seeProjects: "Voir les projets",
      downloadResume: "Télécharger mon CV",
      builtWith: "2026 © Jules Royet, Conçu avec Next.js",
      rights: "Architecte Cloud & DevOps",
    },
  },
};
