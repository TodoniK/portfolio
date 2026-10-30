import { DICTIONARY, type Locale } from "./dictionary";
import { PROJECT_ARTICLES } from "./projects-data";
import { EXPERTISES, type ExpertiseSlug } from "./expertises";

export type { Locale, ExpertiseSlug };
export const LOCALES: Locale[] = ["fr", "en", "es"];

export const SITE = {
  url: "https://julesroyet.dev",
  name: "Jules Royet",
  email: "jules.royet.pc@gmail.com",
  cv: "/resumes.pdf",
  linkedin: "https://www.linkedin.com/in/jules-royet",
  github: "https://github.com/todonik",
  rootme: "https://www.root-me.org/ROYET",
  twitter: "@julesroyet",
  locality: "Nice",
  region: "Nouvelle-Aquitaine",
  country: "FR",
  geo: { lat: 44.8378, lng: -0.5792 },
} as const;

export const t = (locale: Locale) => DICTIONARY[locale];

/* ---------- routing ---------- */
const LEGAL: Record<Locale, string> = { fr: "/mentions-legales", en: "/en/legal-notice", es: "/es/aviso-legal" };

export function href(locale: Locale, path = "/"): string {
  if (path === "/legal") return LEGAL[locale];
  const clean = path === "/" ? "" : path;
  return locale === "fr" ? clean || "/" : `/${locale}${clean}`;
}

/** Equivalent URL in another locale, so the language switch keeps context. */
export function alternatePath(pathname: string, target: Locale): string {
  const p = pathname.replace(/\/$/, "") || "/";
  if (/\/404$/.test(p)) return href(target, "/");
  if (Object.values(LEGAL).includes(p)) return LEGAL[target];
  return href(target, p.replace(/^\/(en|es)(?=\/|$)/, "") || "/");
}

/** Language names and the suggestion banner, each written in its own language. */
export const LANG: Record<Locale, { name: string; suggest: string; go: string; close: string }> = {
  fr: { name: "Français", suggest: "Ce site existe aussi en français.", go: "Lire en français", close: "Fermer" },
  en: { name: "English", suggest: "This site is also available in English.", go: "Read in English", close: "Close" },
  es: { name: "Español", suggest: "Este sitio también está disponible en español.", go: "Leer en español", close: "Cerrar" },
};

/* ---------- clusters (expertise pages) ---------- */
export const CLUSTERS: Array<{ slug: ExpertiseSlug; code: string }> = [
  { slug: "cloud-devops", code: "01" },
  { slug: "systemes-ia", code: "02" },
  { slug: "developpement-logiciel", code: "03" },
];

export const CLUSTER_LABEL: Record<ExpertiseSlug, Record<Locale, string>> = {
  "cloud-devops": { fr: "Cloud et DevOps", en: "Cloud & DevOps", es: "Cloud y DevOps" },
  "systemes-ia": { fr: "Systèmes IA", en: "AI systems", es: "Sistemas de IA" },
  "developpement-logiciel": { fr: "Développement logiciel", en: "Software engineering", es: "Desarrollo de software" },
};

/** One-line pitch per area, for home cards (the long copy lives on the expertise pages). */
export const CLUSTER_BLURB: Record<ExpertiseSlug, Record<Locale, string>> = {
  "cloud-devops": { fr: "Migrations Azure, conteneurs et déploiements automatisés.", en: "Azure migrations, containers and automated delivery.", es: "Migraciones a Azure, contenedores y despliegues automatizados." },
  "systemes-ia": { fr: "Agents autonomes, passerelles de modèles et outillage agentique.", en: "Autonomous agents, model gateways and agentic tooling.", es: "Agentes autónomos, pasarelas de modelos y herramientas agénticas." },
  "developpement-logiciel": { fr: "Backends Java et Kotlin, interfaces TypeScript, applications web.", en: "Java and Kotlin backends, TypeScript interfaces, web apps.", es: "Backends en Java y Kotlin, interfaces en TypeScript, aplicaciones web." },
};

export function clustersOf(slug: string): ExpertiseSlug[] {
  return CLUSTERS.map((c) => c.slug).filter((c) => (EXPERTISES[c].projects as readonly string[]).includes(slug));
}

/* ---------- projects ---------- */
// shortcut: omniroute.julesroyet.dev has no DNS record (checked 2026-10-10), so no live link until it is deployed.
const DEAD_LINKS = new Set(["https://omniroute.julesroyet.dev"]);

export function projects(locale: Locale) {
  return t(locale).projects.items.map((item, i) => {
    const article = PROJECT_ARTICLES[item.id];
    if (!article) throw new Error(`Missing case study for project "${item.id}"`);
    return {
      ...item,
      index: String(i + 1).padStart(2, "0"),
      previewUrl: DEAD_LINKS.has(item.previewUrl) ? "" : item.previewUrl,
      stack: item.stack ?? [],
      clusters: clustersOf(item.id),
      article,
    };
  });
}
export type Project = ReturnType<typeof projects>[number];

export const pick = <T>(v: Record<Locale, T>, locale: Locale): T => v[locale];

/** Sentences of a text (a capital, or ¿ ¡, after the end punctuation starts a new one). */
export const sentences = (text: string) => text.trim().split(/(?<=[.!?])\s+(?=[\p{Lu}¿¡«"])/u);
/** Long copy cut into short paragraphs of at most `per` sentences, so it never reads as one block. */
export function paragraphs(text: string, per = 2): string[] {
  const all = sentences(text), out: string[] = [];
  for (let i = 0; i < all.length; i += per) out.push(all.slice(i, i + per).join(" "));
  return out;
}

/* ---------- UI strings for the new interface ---------- */
export const UI = {
  fr: {
    skip: "Aller au contenu principal",
    menu: "Menu",
    close: "Fermer",
    nav: { home: "Accueil", projects: "Projets", about: "Parcours", contact: "Contact" },
    langMenu: "Langue",
    themeDark: "Thème sombre",
    status: "Disponible pour échanger",
    location: "Nice · Côte d'Azur",
    heroKicker: "Architecte Cloud & IA · Cloud & AI Solutions Architect",
    heroBuild: "Je construis",
    heroWords: ["des plateformes cloud.", "des agents IA autonomes.", "des pipelines CI/CD.", "des systèmes qui tiennent."],
    stats: [["4", "ans d'expérience chez Orange"], ["600k+", "visiteurs par an sur la boutique Orange"], ["-75%", "de temps de publication grâce à l'IA"], ["10", "études de cas publiées"]] as Array<[string, string]>,
    memojiHint: "Me faire signe",
    heroCta: "Voir les projets",
    heroCv: "Télécharger le CV",
    scroll: "Défiler",
    manifestoTitle: "Manifeste",
    manifesto: "J'architecture le cloud, j'automatise la livraison et je mets des agents IA en production.",
    portraitAlt: "Photo de Jules Royet",
    clustersTitle: "Expertises",
    clustersHeading: "Trois domaines, un même fil.",
    clustersLead: "Des systèmes qui tournent en production et que d'autres peuvent maintenir.",
    clusterCta: "Explorer",
    projectsTitle: "Projets sélectionnés",
    allProjects: "Tous les projets",
    timelineTitle: "Journal de parcours",
    stackTitle: "Stack en production",
    contactKicker: "Contact",
    contactTitle: "Prenons contact",
    copy: "Copier l'adresse",
    copied: "Adresse copiée",
    writeMe: "Écrire un e-mail",
    footerBuilt: "Site statique Astro, servi par Cloudflare.",
    legal: "Mentions légales",
    filterAll: "Tout",
    filterLabel: "Filtrer par domaine",
    projectsCount: (n: number) => `${n} études de cas`,
    caseStudy: "Étude de cas",
    related: "Domaines",
    links: "Liens",
    back: "Tous les projets",
    prev: "Projet précédent",
    next: "Projet suivant",
    discuss: "Échanger sur ce projet",
    discussText: "Une question d'architecture ou un défi technique similaire ? Écrivez-moi directement.",
    languages: "Langues",
    languagesList: ["Français, langue maternelle", "Anglais courant (TOEIC 940/990)", "Espagnol intermédiaire (B2)"],
    certificationsTitle: "Certifications",
    educationTitle: "Formation",
    skillsTitle: "Domaines d'expertise",
    experienceTitle: "Expériences",
    faq: "Questions fréquentes",
    relatedWork: "Réalisations associées",
    writtenBy: "Par Jules Royet, ingénieur logiciel et architecte cloud et DevOps chez Orange.",
    background: "Parcours et expérience",
    notFoundTitle: "Route introuvable",
    notFoundText: "Le paquet s'est perdu entre deux sauts. Cette page n'existe pas ou a été déplacée.",
    notFoundHome: "Retour à l'accueil",
    present: "en cours",
    healthy: "healthy",
  },
  en: {
    skip: "Skip to main content",
    menu: "Menu",
    close: "Close",
    nav: { home: "Home", projects: "Projects", about: "About", contact: "Contact" },
    langMenu: "Language",
    themeDark: "Dark theme",
    status: "Open to conversations",
    location: "Nice · Côte d'Azur",
    heroKicker: "Cloud & AI Solutions Architect",
    heroBuild: "I build",
    heroWords: ["cloud platforms.", "autonomous AI agents.", "CI/CD pipelines.", "systems that hold up."],
    stats: [["4", "years at Orange"], ["600k+", "yearly visitors on the Orange store"], ["-75%", "publishing time cut with AI"], ["10", "published case studies"]] as Array<[string, string]>,
    memojiHint: "Wave at me",
    heroCta: "View projects",
    heroCv: "Download resume",
    scroll: "Scroll",
    manifestoTitle: "Manifesto",
    manifesto: "I design cloud platforms, automate delivery and ship AI agents to production.",
    portraitAlt: "Photo of Jules Royet",
    clustersTitle: "Expertise",
    clustersHeading: "Three areas, one thread.",
    clustersLead: "Systems that run in production and that others can maintain.",
    clusterCta: "Explore",
    projectsTitle: "Selected work",
    allProjects: "All projects",
    timelineTitle: "Career log",
    stackTitle: "Production stack",
    contactKicker: "Contact",
    contactTitle: "Let's connect",
    copy: "Copy address",
    copied: "Address copied",
    writeMe: "Send an email",
    footerBuilt: "Static Astro site, served by Cloudflare.",
    legal: "Legal notice",
    filterAll: "All",
    filterLabel: "Filter by area",
    projectsCount: (n: number) => `${n} case studies`,
    caseStudy: "Case study",
    related: "Areas",
    links: "Links",
    back: "All projects",
    prev: "Previous project",
    next: "Next project",
    discuss: "Discuss this work",
    discussText: "Have an architectural question or similar engineering challenge? Reach out directly.",
    languages: "Languages",
    languagesList: ["French, native", "English, fluent (TOEIC 940/990)", "Spanish, intermediate (B2)"],
    certificationsTitle: "Certifications",
    educationTitle: "Education",
    skillsTitle: "Areas of expertise",
    experienceTitle: "Experience",
    faq: "Questions and answers",
    relatedWork: "Related engineering work",
    writtenBy: "Written by Jules Royet, software engineer and Cloud & DevOps Architect at Orange.",
    background: "Background and experience",
    notFoundTitle: "Route not found",
    notFoundText: "The packet got lost between two hops. This page does not exist or has moved.",
    notFoundHome: "Back to home",
    present: "ongoing",
    healthy: "healthy",
  },
  es: {
    skip: "Ir al contenido principal",
    menu: "Menú",
    close: "Cerrar",
    nav: { home: "Inicio", projects: "Proyectos", about: "Trayectoria", contact: "Contacto" },
    langMenu: "Idioma",
    themeDark: "Tema oscuro",
    status: "Disponible para conversar",
    location: "Niza · Costa Azul",
    heroKicker: "Arquitecto Cloud e IA · Cloud & AI Solutions Architect",
    heroBuild: "Construyo",
    heroWords: ["plataformas cloud.", "agentes de IA autónomos.", "pipelines de CI/CD.", "sistemas que aguantan."],
    stats: [["4", "años de experiencia en Orange"], ["600k+", "visitantes al año en la tienda de Orange"], ["-75%", "de tiempo de publicación gracias a la IA"], ["10", "casos de estudio publicados"]] as Array<[string, string]>,
    memojiHint: "Salúdame",
    heroCta: "Ver los proyectos",
    heroCv: "Descargar el CV",
    scroll: "Desplazar",
    manifestoTitle: "Manifiesto",
    manifesto: "Diseño la arquitectura cloud, automatizo las entregas y llevo agentes de IA a producción.",
    portraitAlt: "Foto de Jules Royet",
    clustersTitle: "Especialidades",
    clustersHeading: "Tres ámbitos, un mismo hilo.",
    clustersLead: "Sistemas que funcionan en producción y que otros pueden mantener.",
    clusterCta: "Explorar",
    projectsTitle: "Proyectos destacados",
    allProjects: "Todos los proyectos",
    timelineTitle: "Diario de trayectoria",
    stackTitle: "Stack en producción",
    contactKicker: "Contacto",
    contactTitle: "Hablemos",
    copy: "Copiar la dirección",
    copied: "Dirección copiada",
    writeMe: "Enviar un correo",
    footerBuilt: "Sitio estático Astro, servido por Cloudflare.",
    legal: "Aviso legal",
    filterAll: "Todo",
    filterLabel: "Filtrar por ámbito",
    projectsCount: (n: number) => `${n} casos de estudio`,
    caseStudy: "Caso de estudio",
    related: "Ámbitos",
    links: "Enlaces",
    back: "Todos los proyectos",
    prev: "Proyecto anterior",
    next: "Proyecto siguiente",
    discuss: "Hablar de este proyecto",
    discussText: "¿Una pregunta de arquitectura o un reto técnico parecido? Escríbeme directamente.",
    languages: "Idiomas",
    languagesList: ["Francés, lengua materna", "Inglés fluido (TOEIC 940/990)", "Español intermedio (B2)"],
    certificationsTitle: "Certificaciones",
    educationTitle: "Formación",
    skillsTitle: "Especialidades",
    experienceTitle: "Experiencia",
    faq: "Preguntas frecuentes",
    relatedWork: "Proyectos relacionados",
    writtenBy: "Por Jules Royet, ingeniero de software y arquitecto cloud y DevOps en Orange.",
    background: "Trayectoria y experiencia",
    notFoundTitle: "Ruta no encontrada",
    notFoundText: "El paquete se perdió entre dos saltos. Esta página no existe o se ha movido.",
    notFoundHome: "Volver al inicio",
    present: "en curso",
    healthy: "healthy",
  },
} satisfies Record<Locale, unknown>;

/** Every indexable page, as locale-neutral paths (used by sitemap, llms.txt and tests). */
export function routes(): string[] {
  return [
    "/", "/projects", "/about", "/contact", "/legal",
    ...CLUSTERS.map((c) => `/expertises/${c.slug}`),
    ...t("fr").projects.items.map((p) => `/projects/${p.id}`),
  ];
}
