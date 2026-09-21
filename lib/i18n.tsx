"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

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
    }>;
    educations: Array<{
      school: string;
      degree: string;
      period: string;
      city: string;
      logo: string;
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
      greeting: "Hey 👋, I'm Jules",
      titleLine1: "Cloud & DevOps Architect",
      titleLine2: "& Software Engineer",
      description:
        "Architecting resilient cloud platforms, automated CI/CD pipelines, and high-performance digital systems.",
      viewWork: "View My Work",
      contact: "Contact",
      portraitAlt: "Jules portrait",
    },
    projects: {
      badge: "Projects",
      headline: "My projects",
      description:
        "From scalable cloud infrastructure to full-stack applications, a selection of work I've built and delivered.",
      pageTitle: "My recent work",
      pageDescription:
        "Cloud architectures, automated pipelines, and full-stack applications shipped with care.",
      viewMore: "View all projects",
      viewCode: "Source code",
      viewLive: "Live preview",
      confidential: "Confidential",
      items: [
        {
          id: "shopeen",
          tag: "ORANGE",
          title: "Enterprise Carbon Footprint Calculator",
          description:
            "Confidential internal web application estimating the environmental impact and CO2 production of Orange's IT infrastructure.",
          meta: "Orange • Spring Boot, Kotlin, Svelte & MongoDB",
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
            "Full-stack web application simulating an online casino with multiplayer websocket synchronization and interactive games.",
          meta: "School Project • Vue.js, Node.js, Socket.io, Express & SQLite",
          image: "/assets/projects/stakeirb.webp",
          imageAlt: "Stak'eirb gaming platform screenshot",
          imageRatio: 780 / 585,
          previewUrl: "https://stakeirb.julesroyet.dev",
          githubUrl: "https://github.com/TodoniK/stakeirb",
          confidential: false,
        },
        {
          id: "automatisms",
          tag: "CDG33",
          title: "SMS Campaign Automation Backoffice",
          description:
            "Confidential administrative platform designed for scheduled SMS broadcasts, campaign dispatching, and contact management.",
          meta: "CDG33 • Symfony, PHP, MySQL & Apache",
          image: "/assets/projects/automatisms.webp",
          imageAlt: "AutomatiSMS management console",
          imageRatio: 2188 / 1156,
          previewUrl: "",
          githubUrl: "",
          confidential: true,
        },
        {
          id: "iplocator",
          tag: "NETWORKING",
          title: "IP Geolocation & Network Intelligence",
          description:
            "Real-time IP lookup application providing geographic pinpointing, ISP analysis, and interactive map integration.",
          meta: "Vue.js, Express, MongoDB & OpenAPI Swagger",
          image: "/assets/projects/iplocator.webp",
          imageAlt: "IP Locator web interface",
          imageRatio: 3022 / 1646,
          previewUrl: "https://iplocator.julesroyet.dev",
          githubUrl: "https://github.com/TodoniK/ip-locator",
          confidential: false,
        },
        {
          id: "mijotons",
          tag: "MOBILE",
          title: "Mijotons Smart Grocery & Recipe App",
          description:
            "Native Android application managing grocery lists, supermarket geolocation with OpenStreetMap, and anti-waste recipe suggestions.",
          meta: "Android Studio, Java, MySQL & OpenStreetMap",
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
            "Modern developer portfolio built with Next.js 16, OGL shaders, Matter.js physics sandbox, and bilingue internationalization.",
          meta: "Next.js 16, React 19, Tailwind CSS v4 & TypeScript",
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
      bioTitle: "Hello! I'm Jules Royet.",
      bioP1:
        "A Cloud & DevOps Architect and Software Engineer graduated from ENSEIRB-MATMECA, passionate about building reliable cloud platforms, automated workflows, and modern web applications. With more than 3 years of hands-on experience, I bridge system architecture, automation, and full-stack development.",
      bioP2:
        "Currently working at Orange as a Cloud & DevOps Architect, I design scalable cloud architectures, optimize deployment pipelines, and promote green code practices. I also explore cybersecurity, with a strong interest in SOC operations, penetration testing, and ethical hacking on Root-Me.",
      bioP3:
        "Outside of cloud engineering, I follow the latest tech and security breakthroughs, experiment with creative frontend technologies, and enjoy sharing knowledge with engineering teams.",
      experienceTitle: "Experience",
      showMore: "Show {count} more",
      showLess: "Show less",
      educationTitle: "Education",
      skillsTitle: "Areas of expertise",
      stackTitle: "Stack & Tools",
      stackHint: "Interactive physics sandbox — drag and play with tools",
      resetStack: "Reset stack",
      experiences: [
        {
          company: "Orange",
          role: "Cloud & DevOps Architect",
          period: "Sept. 2025 – Present",
          logo: "/assets/companies/logo-orange.webp",
          description:
            "Designing and implementing cloud infrastructure solutions and DevOps practices to optimize deployment pipelines, ensure scalability, and enhance system reliability.",
        },
        {
          company: "Orange",
          role: "Software Engineer (Apprenticeship)",
          period: "Sept. 2022 – Aug. 2025",
          logo: "/assets/companies/logo-orange.webp",
          description:
            "Developed an internal ecological impact calculator and optimized sustainable business applications through full-stack development, CI/CD pipelines, and agile practices.",
        },
        {
          company: "Market Control",
          role: "Software Engineer Intern",
          period: "May 2023 – Aug. 2023",
          logo: "/assets/companies/logo-market-control.webp",
          description:
            "Developed an enterprise web platform with OpenUI5, implemented automated testing, CI/CD workflows, and managed deployment on Docker and SAP BTP.",
        },
        {
          company: "CDG33",
          role: "Developer & Project Manager",
          period: "Apr. 2022 – Jun. 2022",
          logo: "/assets/companies/logo-cdg33.webp",
          description:
            "Designed and developed a web application for scheduled SMS broadcasts with an administrative interface and conducted a ChatBot POC.",
        },
      ],
      educations: [
        {
          school: "ENSEIRB-MATMECA",
          degree: "Master of Science in Computer Science & Networks",
          period: "2022 – 2025",
          city: "Bordeaux, France",
          logo: "/assets/schools/logo-enseirb-matmeca.webp",
        },
        {
          school: "IUT de Bayonne (UPPA)",
          degree: "Bachelor of Technology in Computer Science (DUT)",
          period: "2020 – 2022",
          city: "Bayonne, France",
          logo: "/assets/schools/logo-iut-bayonne.webp",
        },
      ],
      skills: [
        "Cloud Architecture",
        "DevOps & CI/CD",
        "Infrastructure as Code (Terraform)",
        "Docker & Kubernetes",
        "Backend (Java, Spring, Kotlin)",
        "Frontend (React, Vue.js, TypeScript)",
        "Cybersecurity & SOC",
        "Linux & Shell Scripting",
        "Green IT & Eco-Design",
        "Agile & Scrum",
      ],
    },
    contact: {
      headline: "Let's connect",
      description:
        "Always open to discussing cloud architecture challenges, DevOps practices, innovative systems, or new opportunities. Reach out anytime!",
      buttonIdle: "Contact",
      buttonCopy: "Copy {email}",
      buttonCopied: "Email copied",
      seeProjects: "See projects",
      downloadResume: "Download Resume",
      builtWith: "2026 © Jules Royet • Built with Next.js",
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
      greeting: "Salut 👋, moi c'est Jules",
      titleLine1: "Architecte Cloud & DevOps",
      titleLine2: "& Ingénieur Logiciel",
      description:
        "Conception d'architectures cloud résilientes, de pipelines CI/CD automatisés et de systèmes numériques performants.",
      viewWork: "Découvrir mes projets",
      contact: "Me contacter",
      portraitAlt: "Portrait de Jules",
    },
    projects: {
      badge: "Projets",
      headline: "Mes projets",
      description:
        "Des infrastructures cloud aux applications web et mobiles, une sélection de projets conçus et déployés.",
      pageTitle: "Mes réalisations",
      pageDescription:
        "Infrastructures cloud, pipelines automatisés et applications logicielles développées avec rigueur.",
      viewMore: "Voir tous les projets",
      viewCode: "Code source",
      viewLive: "Démo en direct",
      confidential: "Confidentiel",
      items: [
        {
          id: "shopeen",
          tag: "ORANGE",
          title: "Calculateur d'empreinte carbone SI",
          description:
            "Application interne confidentielle estimant l'impact écologique et les émissions de CO2 de l'infrastructure informatique d'Orange.",
          meta: "Orange • Spring Boot, Kotlin, Svelte & MongoDB",
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
          title: "Plateforme de jeux & casino temps réel",
          description:
            "Application web répliquant un casino en ligne avec gestion multijoueur via WebSockets et jeux interactifs synchronisés.",
          meta: "Projet d'école • Vue.js, Node.js, Socket.io, Express & SQLite",
          image: "/assets/projects/stakeirb.webp",
          imageAlt: "Capture d'écran plateforme Stak'eirb",
          imageRatio: 780 / 585,
          previewUrl: "https://stakeirb.julesroyet.dev",
          githubUrl: "https://github.com/TodoniK/stakeirb",
          confidential: false,
        },
        {
          id: "automatisms",
          tag: "CDG33",
          title: "Backoffice de diffusion de campagnes SMS",
          description:
            "Application web confidentielle d'administration pour la planification et l'envoi programmé de SMS pour le CDG33.",
          meta: "CDG33 • Symfony, PHP, MySQL & Apache",
          image: "/assets/projects/automatisms.webp",
          imageAlt: "Console de gestion AutomatiSMS",
          imageRatio: 2188 / 1156,
          previewUrl: "",
          githubUrl: "",
          confidential: true,
        },
        {
          id: "iplocator",
          tag: "RÉSEAU",
          title: "Géolocalisation & analyse réseau IP",
          description:
            "Service d'analyse d'adresses IP fournissant les coordonnées géographiques, l'identification FAI et une carte interactive.",
          meta: "Vue.js, Express, MongoDB & OpenAPI Swagger",
          image: "/assets/projects/iplocator.webp",
          imageAlt: "Interface web IP Locator",
          imageRatio: 3022 / 1646,
          previewUrl: "https://iplocator.julesroyet.dev",
          githubUrl: "https://github.com/TodoniK/ip-locator",
          confidential: false,
        },
        {
          id: "mijotons",
          tag: "MOBILE",
          title: "Application mobile Mijotons & Recettes",
          description:
            "Application Android native pour la gestion de listes de courses, repérage de magasins via OpenStreetMap et suggestions culinaires.",
          meta: "Android Studio, Java, MySQL & OpenStreetMap",
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
          title: "Portfolio personnel & vitrine interactive",
          description:
            "Portfolio moderne conçu avec Next.js 16, shaders OGL, bac à sable physique Matter.js et bascule bilingue instantanée.",
          meta: "Next.js 16, React 19, Tailwind CSS v4 & TypeScript",
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
      bioTitle: "Bonjour ! Je suis Jules Royet.",
      bioP1:
        "Architecte Cloud & DevOps et Ingénieur Logiciel diplômé de l'ENSEIRB-MATMECA, passionné par la conception de plateformes cloud fiables, l'automatisation de workflows et le développement logiciel moderne. Avec plus de 3 ans d'expérience, j'unis architecture système, automatisation et développement full-stack.",
      bioP2:
        "Actuellement chez Orange en tant qu'Architecte Cloud & DevOps, je conçois des architectures résilientes, optimise les chaînes de déploiement et promeut l'écoconception logicielle. J'explore également la cybersécurité, avec un intérêt marqué pour les opérations SOC et le hacking éthique sur Root-Me.",
      bioP3:
        "En dehors de l'ingénierie cloud, je reste à l'affût des dernières avancées technologiques et de sécurité, j'expérimente avec le frontend créatif et j'aime partager mes connaissances avec les équipes.",
      experienceTitle: "Expérience",
      showMore: "Afficher {count} de plus",
      showLess: "Réduire",
      educationTitle: "Formation",
      skillsTitle: "Domaines d'expertise",
      stackTitle: "Stack & Outils",
      stackHint: "Bac à sable physique interactif — déplacez les outils",
      resetStack: "Réinitialiser la stack",
      experiences: [
        {
          company: "Orange",
          role: "Architecte Cloud & DevOps",
          period: "Sept. 2025 – Présent",
          logo: "/assets/companies/logo-orange.webp",
          description:
            "Conception et mise en œuvre de solutions d'infrastructure cloud et de pratiques DevOps pour optimiser les pipelines, garantir la scalabilité et renforcer la fiabilité des systèmes.",
        },
        {
          company: "Orange",
          role: "Ingénieur Logiciel (Apprentissage)",
          period: "Sept. 2022 – Août 2025",
          logo: "/assets/companies/logo-orange.webp",
          description:
            "Développement d'un calculateur d'impact écologique interne et optimisation d'applications métiers durables via le full-stack, l'intégration continue et l'agilité.",
        },
        {
          company: "Market Control",
          role: "Ingénieur Logiciel Stagiaire",
          period: "Mai 2023 – Août 2023",
          logo: "/assets/companies/logo-market-control.webp",
          description:
            "Développement d'une plateforme web avec OpenUI5, tests automatisés, chaînes CI/CD et déploiement conteneurisé sur Docker et SAP BTP.",
        },
        {
          company: "CDG33",
          role: "Développeur & Chef de Projet",
          period: "Avr. 2022 – Juin 2022",
          logo: "/assets/companies/logo-cdg33.webp",
          description:
            "Conception et développement d'une application web d'envois programmés de SMS avec interface d'administration et POC de ChatBot pour le site public.",
        },
      ],
      educations: [
        {
          school: "ENSEIRB-MATMECA",
          degree: "Diplôme d'Ingénieur Informatique & Réseaux",
          period: "2022 – 2025",
          city: "Bordeaux, France",
          logo: "/assets/schools/logo-enseirb-matmeca.webp",
        },
        {
          school: "IUT de Bayonne (UPPA)",
          degree: "DUT Informatique (Diplôme Universitaire de Technologie)",
          period: "2020 – 2022",
          city: "Bayonne, France",
          logo: "/assets/schools/logo-iut-bayonne.webp",
        },
      ],
      skills: [
        "Architecture Cloud",
        "DevOps & CI/CD",
        "Infrastructure as Code (Terraform)",
        "Docker & Kubernetes",
        "Backend (Java, Spring, Kotlin)",
        "Frontend (React, Vue.js, TypeScript)",
        "Cybersécurité & SOC",
        "Linux & Scripts Shell",
        "Green IT & Écoconception",
        "Méthodologie Agile & Scrum",
      ],
    },
    contact: {
      headline: "Prenons contact",
      description:
        "Toujours ouvert aux échanges sur l'architecture cloud, les pratiques DevOps, les systèmes innovants ou de nouvelles opportunités. N'hésitez pas !",
      buttonIdle: "Me contacter",
      buttonCopy: "Copier {email}",
      buttonCopied: "Email copié",
      seeProjects: "Voir les projets",
      downloadResume: "Télécharger mon CV",
      builtWith: "2026 © Jules Royet • Conçu avec Next.js",
      rights: "Architecte Cloud & DevOps",
    },
  },
};

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function getSavedLocale(): Locale {
  if (typeof window === "undefined") return "fr";
  try {
    const saved = localStorage.getItem("jules_portfolio_locale") as Locale | null;
    if (saved === "en" || saved === "fr") return saved;
    const browserLang = navigator.language.slice(0, 2);
    return browserLang === "fr" ? "fr" : "en";
  } catch {
    return "fr";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }): ReactNode {
  const [locale, setLocaleState] = useState<Locale>(() => getSavedLocale());

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("jules_portfolio_locale", newLocale);
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLocale;
    }
  };

  const toggleLocale = () => {
    const next = locale === "fr" ? "en" : "fr";
    setLocale(next);
  };

  const value: LanguageContextType = {
    locale: mounted ? locale : "fr",
    t: DICTIONARY[mounted ? locale : "fr"],
    setLocale,
    toggleLocale,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
