export type Locale = "en" | "fr" | "es";

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
            "Trilingual static portfolio built with Astro and TypeScript on Cloudflare Workers, with React Bits effects ported to vanilla code and no client framework.",
          meta: "Astro 7, TypeScript, GSAP and Cloudflare Workers",
          stack: ["Astro", "TypeScript", "GSAP", "Cloudflare Workers", "Playwright"],
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
          issuer: "Online course, Orange training",
          year: "2025",
        },
        {
          name: "AWS Cloud Technical Essentials",
          issuer: "Amazon Web Services",
          year: "2025",
          url: "https://aws.amazon.com/training/",
        },
        {
          name: "TOEIC: 940/990 (Full Professional)",
          issuer: "ETS Global",
          year: "2024",
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
      titleLine1: "Architecte cloud et DevOps",
      titleLine2: "et ingénieur systèmes IA",
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
          tag: "IA autonome",
          title: "Démon d'agent autonome Hermes",
          description:
            "Plateforme d'agent IA autonome auto-hébergée sur Oracle Cloud avec tableau de bord web, persistance SQLite, registre d'outils et boucles d'exécution planifiées.",
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
          tag: "Passerelle IA",
          title: "Passerelle de routage d'IA Omniroute",
          description:
            "Passerelle d'inférence de modèles d'IA haute performance avec routage sous 15 ms, cache sémantique Redis, bascule dynamique et compatibilité OpenAI et Anthropic.",
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
          tag: "Orange M2C",
          title: "M2C Flows : jumeau numérique SI",
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
          tag: "Outillage dev",
          title: "Harness d'ingénierie agentique OpenCode",
          description:
            "Environnement d'exécution local pour OpenCode et Claude Code avec compresseur de jetons RTK en Rust, mémoire de session persistante et MCPs Dokploy et Cloudflare.",
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
          tag: "Orange",
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
          title: "Plateforme de jeux et casino en temps réel",
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
          tag: "Réseau",
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
          tag: "Mobile",
          title: "Application mobile Mijotons et recettes",
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
          tag: "Portfolio",
          title: "Portfolio personnel et vitrine interactive",
          description:
            "Portfolio statique trilingue construit avec Astro et TypeScript sur Cloudflare Workers, effets React Bits portés en code natif, sans framework côté client.",
          meta: "Astro 7, TypeScript, GSAP et Cloudflare Workers",
          stack: ["Astro", "TypeScript", "GSAP", "Cloudflare Workers", "Playwright"],
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
        "Architecte cloud et DevOps et ingénieur logiciel diplômé de l'ENSEIRB-MATMECA. Je conçois des plateformes cloud résilientes, des pipelines d'intégration continue automatisés et des runtimes d'IA agentiques. Avec plus de 3 ans d'expérience pratique, j'assure la liaison entre architecture système, outillage développeur et fiabilité opérationnelle.",
      bioP2:
        "Actuellement chez Orange en tant qu'architecte cloud et DevOps, j'accompagne la migration des applications du SI vers Azure et les infrastructures de cloud privé Orange. Je définis les architectures cibles (Azure Container Apps, AKS, WAF v2), les dossiers techniques DAT et l'outillage de migration assisté par l'IA. Je m'investis également dans la cybersécurité défensive sur Root-Me et le pilotage de systèmes agentiques.",
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
          role: "Architecte cloud et DevOps",
          period: "Sept. 2025 à aujourd'hui",
          logo: "/assets/companies/logo-orange.webp",
          url: "https://www.orange.com",
          description:
            "Accompagnement des migrations applicatives vers Azure et le cloud privé Orange. Définition de l'architecture cible avec ACA, AKS, WAF v2, VNet et Private Endpoints. Consolidation des DAT, préparation des comités FinOps et développement d'outils d'automatisation IA comme M2C Flows et Claude Code avec mémoire Obsidian.",
        },
        {
          company: "Orange",
          role: "Ingénieur logiciel en apprentissage",
          period: "Sept. 2022 à Août 2025",
          logo: "/assets/companies/logo-orange.webp",
          url: "https://www.orange.com",
          description:
            "Développement full stack sur la boutique en ligne Orange (plus de 600 000 visiteurs par an) en Spring Boot, Kotlin, Svelte et MongoDB. Intégration de pipelines d'IA générative (GPT-4o, LiteLLM) réduisant de 75% le temps de publication des fiches produits. Tests automatisés JUnit, Hurl, Cypress et déploiement CI/CD GitLab sur Kubernetes.",
        },
        {
          company: "Market Control",
          role: "Ingénieur logiciel stagiaire",
          period: "Mai 2023 à Août 2023",
          logo: "/assets/companies/logo-market-control.webp",
          url: "https://www.market-control.com",
          description:
            "Modernisation d'un système commercial legacy PHP vers OpenUI5 et SAP BTP à Barcelone. Réduction de 40% des temps de chargement, couverture de tests automatisés Opa5 à 87%, conteneurisation Docker et intégration continue avec GitHub Actions.",
        },
        {
          company: "CDG33",
          role: "Développeur et chef de projet",
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
          degree: "Diplôme d'ingénieur informatique et réseaux",
          period: "2022 à 2025",
          city: "Bordeaux, France",
          logo: "/assets/schools/logo-enseirb-matmeca.webp",
          url: "https://enseirb-matmeca.bordeaux-inp.fr",
        },
        {
          school: "IUT de Bayonne (UPPA)",
          degree: "DUT informatique",
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
          issuer: "Formation en ligne, Orange",
          year: "2025",
        },
        {
          name: "AWS Cloud Technical Essentials",
          issuer: "Amazon Web Services",
          year: "2025",
          url: "https://aws.amazon.com/training/",
        },
        {
          name: "TOEIC : 940/990 (anglais courant)",
          issuer: "ETS Global",
          year: "2024",
          url: "https://www.etsglobal.org/fr/fr/programme/toeic-tests",
        },
      ],
      skills: [
        "Architecture cloud (Azure, GCP, OCI)",
        "Agents IA autonomes (Hermes, OpenCode)",
        "Passerelles et routage IA (Omniroute, LiteLLM)",
        "Docker et Kubernetes (ACA, AKS)",
        "Infrastructure as code (Terraform)",
        "CI/CD et DevSecOps (GitLab, GitHub Actions)",
        "Backend (Java, Spring Boot, Kotlin, Node.js)",
        "Frontend (TypeScript, React, Next.js, Svelte)",
        "Bases de données (Cosmos DB, MongoDB, PostgreSQL)",
        "Cybersécurité et CTF (Root-Me, DevSecOps)",
        "Linux et scripts shell",
        "Green IT et écoconception",
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
      rights: "Architecte cloud et DevOps",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      projects: "Proyectos",
      about: "Sobre mí",
      themeDark: "Activar el modo oscuro",
      themeLight: "Activar el modo claro",
      langSwitch: "Cambiar de idioma",
    },
    hero: {
      greeting: "Hola, soy Jules",
      titleLine1: "Arquitecto cloud y DevOps",
      titleLine2: "e ingeniero de sistemas de IA",
      description:
        "Diseño de arquitecturas cloud resilientes, runtimes de agentes autónomos, pipelines CI/CD y sistemas de software de alto rendimiento.",
      viewWork: "Ver mis proyectos",
      contact: "Contactar",
      portraitAlt: "Retrato de Jules",
    },
    projects: {
      badge: "Proyectos",
      headline: "Mis proyectos",
      description:
        "De infraestructuras cloud a agentes de IA autónomos y aplicaciones de software, una selección de sistemas puestos en producción.",
      pageTitle: "Mis trabajos",
      pageDescription:
        "Arquitecturas cloud, plataformas de IA agéntica, cadenas de integración continua y aplicaciones desarrolladas con rigor.",
      viewMore: "Ver todos los proyectos",
      viewCode: "Código fuente",
      viewLive: "Demo en vivo",
      confidential: "Confidencial",
      items: [
        {
          id: "hermes",
          tag: "IA autónoma",
          title: "Daemon de agente autónomo Hermes",
          description:
            "Plataforma de agente de IA autónomo autoalojada en Oracle Cloud con panel web, persistencia en SQLite, registro de herramientas y bucles de ejecución programados.",
          meta: "Oracle Cloud, Dokploy, Traefik, Docker y Hermes Agent",
          stack: ["Hermes Agent", "Oracle Cloud", "Dokploy", "Docker", "Traefik"],
          image: "/assets/projects/hermes.svg",
          imageAlt: "Panel del agente Hermes",
          imageRatio: 16 / 9,
          previewUrl: "https://hermes.julesroyet.dev",
          githubUrl: "",
          confidential: false,
        },
        {
          id: "omniroute",
          tag: "Pasarela de IA",
          title: "Pasarela de enrutamiento de IA Omniroute",
          description:
            "Pasarela de inferencia de modelos de IA de alto rendimiento con enrutamiento en menos de 15 ms, caché semántica en Redis, conmutación por error dinámica y compatibilidad con OpenAI y Anthropic.",
          meta: "Node.js, Redis, Traefik, Dokploy y Cloudflare",
          stack: ["Node.js", "Redis", "Cloudflare", "Traefik", "Dokploy"],
          image: "/assets/projects/omniroute.svg",
          imageAlt: "Arquitectura de la pasarela Omniroute",
          imageRatio: 16 / 9,
          previewUrl: "https://omniroute.julesroyet.dev",
          githubUrl: "",
          confidential: false,
        },
        {
          id: "m2c-flows",
          tag: "Orange M2C",
          title: "M2C Flows: gemelo digital del SI",
          description:
            "Aplicación web stateless que cartografía las dependencias multicapa del SI, simula las migraciones a Azure y analiza el impacto en la latencia para la DSI de Orange.",
          meta: "Orange DSI, Azure, GitLab Pages y On-Premise",
          stack: ["Azure", "GitLab", "TypeScript", "Docker"],
          image: "/assets/projects/m2c-flows.svg",
          imageAlt: "Gemelo digital M2C Flows",
          imageRatio: 16 / 9,
          previewUrl: "",
          githubUrl: "",
          confidential: true,
        },
        {
          id: "opencode-harness",
          tag: "Herramientas dev",
          title: "Harness de ingeniería agéntica OpenCode",
          description:
            "Entorno de ejecución local para OpenCode y Claude Code con compresor de tokens RTK en Rust, memoria de sesión persistente y MCP de Dokploy y Cloudflare.",
          meta: "TypeScript, Rust, RTK, OpenCode y Claude Code",
          stack: ["TypeScript", "Rust", "OpenCode", "Claude Code"],
          image: "/assets/projects/opencode-harness.svg",
          imageAlt: "Harness de ingeniería agéntica",
          imageRatio: 16 / 9,
          previewUrl: "",
          githubUrl: "",
          confidential: false,
        },
        {
          id: "shopeen",
          tag: "Orange",
          title: "Calculadora de huella de carbono del SI",
          description:
            "Aplicación interna confidencial que estima el impacto ecológico y las emisiones de CO2 de la infraestructura de comercio electrónico de Orange.",
          meta: "Orange, Spring Boot, Kotlin, Svelte y MongoDB",
          stack: ["Spring Boot", "Kotlin", "Svelte", "MongoDB", "Kubernetes"],
          image: "/assets/projects/shopeen.webp",
          imageAlt: "Calculadora de huella ecológica Shopeen",
          imageRatio: 1922 / 950,
          previewUrl: "",
          githubUrl: "",
          confidential: true,
        },
        {
          id: "stakeirb",
          tag: "ENSEIRB",
          title: "Plataforma de juegos y casino en tiempo real",
          description:
            "Aplicación web que reproduce un casino en línea con gestión multijugador mediante WebSockets y juegos interactivos sincronizados.",
          meta: "Proyecto de escuela, Vue.js, Node.js, Socket.io, Express y SQLite",
          stack: ["Node.js", "Vue.js", "Socket.io", "SQLite", "Express.js"],
          image: "/assets/projects/stakeirb.webp",
          imageAlt: "Captura de pantalla de la plataforma Stak'eirb",
          imageRatio: 780 / 585,
          previewUrl: "https://stakeirb.julesroyet.dev",
          githubUrl: "https://github.com/TodoniK/stakeirb",
          confidential: false,
        },
        {
          id: "iplocator",
          tag: "Redes",
          title: "Geolocalización y análisis de red IP",
          description:
            "Servicio de análisis de direcciones IP que ofrece coordenadas geográficas, identificación del proveedor de internet y un mapa interactivo.",
          meta: "Vue.js, Express, MongoDB y OpenAPI Swagger",
          stack: ["Node.js", "MongoDB", "Vue.js", "Express.js", "Docker"],
          image: "/assets/projects/iplocator.webp",
          imageAlt: "Interfaz web de IP Locator",
          imageRatio: 3022 / 1646,
          previewUrl: "https://iplocator.julesroyet.dev",
          githubUrl: "https://github.com/TodoniK/ip-locator",
          confidential: false,
        },
        {
          id: "automatisms",
          tag: "CDG33",
          title: "Backoffice de envío de campañas SMS",
          description:
            "Aplicación web de administración para planificar y programar el envío de más de 1000 SMS semanales.",
          meta: "CDG33, Symfony, PHP, MySQL y Apache",
          stack: ["Symfony", "PHP", "MySQL", "Linux", "Docker"],
          image: "/assets/projects/automatisms.webp",
          imageAlt: "Consola de gestión de AutomatiSMS",
          imageRatio: 2188 / 1156,
          previewUrl: "",
          githubUrl: "",
          confidential: true,
        },
        {
          id: "mijotons",
          tag: "Móvil",
          title: "Aplicación móvil Mijotons y recetas",
          description:
            "Aplicación Android nativa para gestionar listas de la compra, localizar tiendas con OpenStreetMap y sugerir recetas.",
          meta: "Android Studio, Java, MySQL y OpenStreetMap",
          stack: ["Android", "Java", "MySQL", "Linux"],
          image: "/assets/projects/mijotons.webp",
          imageAlt: "Aplicación móvil Mijotons",
          imageRatio: 4164 / 2736,
          previewUrl: "https://todonik.github.io/mijotons-website/",
          githubUrl: "https://github.com/TodoniK/mijotons-dev",
          confidential: false,
        },
        {
          id: "portfolio",
          tag: "Portfolio",
          title: "Portfolio personal y escaparate interactivo",
          description:
            "Portfolio estático trilingüe creado con Astro y TypeScript sobre Cloudflare Workers, con efectos de React Bits portados a código nativo y sin framework en el cliente.",
          meta: "Astro 7, TypeScript, GSAP y Cloudflare Workers",
          stack: ["Astro", "TypeScript", "GSAP", "Cloudflare Workers", "Playwright"],
          image: "/assets/projects/portfolio.webp",
          imageAlt: "Escaparate del portfolio de Jules Royet",
          imageRatio: 3024 / 1288,
          previewUrl: "https://julesroyet.dev",
          githubUrl: "https://github.com/TodoniK/portfolio",
          confidential: false,
        },
      ],
    },
    about: {
      pageTitle: "Sobre mí",
      bioTitle: "Hola, soy Jules Royet.",
      bioP1:
        "Arquitecto cloud y DevOps e ingeniero de software titulado por la ENSEIRB-MATMECA. Diseño plataformas cloud resilientes, pipelines de integración continua automatizados y runtimes de IA agéntica. Con más de 3 años de experiencia práctica, hago de puente entre la arquitectura de sistemas, las herramientas para desarrolladores y la fiabilidad operativa.",
      bioP2:
        "Actualmente trabajo en Orange como arquitecto cloud y DevOps, donde acompaño la migración de las aplicaciones del SI a Azure y a las infraestructuras de cloud privada de Orange. Defino las arquitecturas objetivo (Azure Container Apps, AKS, WAF v2), los documentos de arquitectura técnica (DAT) y las herramientas de migración asistidas por IA. También practico la ciberseguridad defensiva en Root-Me y la gestión de sistemas agénticos.",
      bioP3:
        "Además de los proyectos de empresa, administro mi propia infraestructura cloud en un VPS de Oracle con Dokploy y Traefik, despliego agentes autónomos como Hermes, optimizo el consumo de tokens con herramientas escritas en Rust y diseño interfaces frontend creativas.",
      experienceTitle: "Experiencia",
      showMore: "Mostrar {count} más",
      showLess: "Mostrar menos",
      educationTitle: "Formación",
      certificationsTitle: "Certificaciones",
      skillsTitle: "Áreas de especialización",
      stackTitle: "Stack y herramientas",
      stackHint: "Sandbox de físicas interactivo: arrastra y juega con las herramientas",
      resetStack: "Restablecer el stack",
      experiences: [
        {
          company: "Orange",
          role: "Arquitecto cloud y DevOps",
          period: "Sept. 2025 a la actualidad",
          logo: "/assets/companies/logo-orange.webp",
          url: "https://www.orange.com",
          description:
            "Acompañamiento de las migraciones de aplicaciones a Azure y a la cloud privada de Orange. Definición de la arquitectura objetivo con ACA, AKS, WAF v2, VNet y Private Endpoints. Consolidación de los DAT, preparación de los comités FinOps y desarrollo de herramientas de automatización con IA como M2C Flows y Claude Code con memoria en Obsidian.",
        },
        {
          company: "Orange",
          role: "Ingeniero de software en formación dual",
          period: "Sept. 2022 a ago. 2025",
          logo: "/assets/companies/logo-orange.webp",
          url: "https://www.orange.com",
          description:
            "Desarrollo full stack de la tienda online de Orange (más de 600 000 visitantes al año) con Spring Boot, Kotlin, Svelte y MongoDB. Integración de pipelines de IA generativa (GPT-4o, LiteLLM) que redujeron un 75% el tiempo de publicación de las fichas de producto. Tests automatizados con JUnit, Hurl y Cypress, y despliegue CI/CD con GitLab en Kubernetes.",
        },
        {
          company: "Market Control",
          role: "Ingeniero de software en prácticas",
          period: "Mayo 2023 a ago. 2023",
          logo: "/assets/companies/logo-market-control.webp",
          url: "https://www.market-control.com",
          description:
            "Modernización de un sistema comercial legacy en PHP hacia OpenUI5 y SAP BTP en Barcelona. Reducción del 40% en los tiempos de carga, cobertura de tests automatizados con Opa5 del 87%, contenerización con Docker e integración continua con GitHub Actions.",
        },
        {
          company: "CDG33",
          role: "Desarrollador y jefe de proyecto",
          period: "Abr. 2022 a jun. 2022",
          logo: "/assets/companies/logo-cdg33.webp",
          url: "https://www.cdg33.fr",
          description:
            "Diseño y entrega de una aplicación web en Symfony para el envío programado de SMS con consola de administración (más de 1000 mensajes semanales) y desarrollo de un prototipo de chatbot de asistencia.",
        },
      ],
      educations: [
        {
          school: "ENSEIRB-MATMECA",
          degree: "Título de ingeniero en informática y redes",
          period: "2022 a 2025",
          city: "Burdeos, Francia",
          logo: "/assets/schools/logo-enseirb-matmeca.webp",
          url: "https://enseirb-matmeca.bordeaux-inp.fr",
        },
        {
          school: "IUT de Bayonne (UPPA)",
          degree: "DUT en informática",
          period: "2020 a 2022",
          city: "Bayona, Francia",
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
          issuer: "Formación en línea, Orange",
          year: "2025",
        },
        {
          name: "AWS Cloud Technical Essentials",
          issuer: "Amazon Web Services",
          year: "2025",
          url: "https://aws.amazon.com/training/",
        },
        {
          name: "TOEIC: 940/990 (inglés fluido)",
          issuer: "ETS Global",
          year: "2024",
          url: "https://www.etsglobal.org/fr/fr/programme/toeic-tests",
        },
      ],
      skills: [
        "Arquitectura cloud (Azure, GCP, OCI)",
        "Agentes de IA autónomos (Hermes, OpenCode)",
        "Pasarelas y enrutamiento de IA (Omniroute, LiteLLM)",
        "Docker y Kubernetes (ACA, AKS)",
        "Infraestructura como código (Terraform)",
        "CI/CD y DevSecOps (GitLab, GitHub Actions)",
        "Backend (Java, Spring Boot, Kotlin, Node.js)",
        "Frontend (TypeScript, React, Next.js, Svelte)",
        "Bases de datos (Cosmos DB, MongoDB, PostgreSQL)",
        "Ciberseguridad y CTF (Root-Me, DevSecOps)",
        "Linux y scripts de shell",
        "Green IT y ecodiseño",
      ],
    },
    contact: {
      headline: "Hablemos",
      description:
        "Siempre abierto a conversar sobre arquitectura cloud, agentes de IA autónomos, prácticas DevOps o nuevas oportunidades de ingeniería. No dudes en escribirme.",
      buttonIdle: "Contactar",
      buttonCopy: "Copiar {email}",
      buttonCopied: "Email copiado",
      seeProjects: "Ver los proyectos",
      downloadResume: "Descargar mi CV",
      builtWith: "2026 © Jules Royet, Creado con Next.js",
      rights: "Arquitecto cloud y DevOps",
    },
  },
};
