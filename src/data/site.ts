import { DICTIONARY, type Locale } from "./dictionary";
import { PROJECT_ARTICLES } from "./projects-data";
import { EXPERTISES, type ExpertiseSlug } from "./expertises";

export type { Locale, ExpertiseSlug };
export const LOCALES: Locale[] = ["fr", "en"];

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
const LEGAL = { fr: "/mentions-legales", en: "/en/legal-notice" } as const;

export function href(locale: Locale, path = "/"): string {
  if (path === "/legal") return LEGAL[locale];
  const clean = path === "/" ? "" : path;
  return locale === "fr" ? clean || "/" : `/en${clean}`;
}

/** Equivalent URL in the other locale, so the language switch keeps context. */
export function alternatePath(pathname: string, target: Locale): string {
  const p = pathname.replace(/\/$/, "") || "/";
  if (p === LEGAL.fr || p === LEGAL.en) return LEGAL[target];
  const base = p.startsWith("/en") ? p.slice(3) || "/" : p;
  return href(target, base);
}

/* ---------- clusters (expertise pages) ---------- */
export const CLUSTERS: Array<{ slug: ExpertiseSlug; code: string }> = [
  { slug: "cloud-devops", code: "01" },
  { slug: "systemes-ia", code: "02" },
  { slug: "developpement-logiciel", code: "03" },
];

export const CLUSTER_LABEL: Record<ExpertiseSlug, Record<Locale, string>> = {
  "cloud-devops": { fr: "Cloud et DevOps", en: "Cloud & DevOps" },
  "systemes-ia": { fr: "Systèmes IA", en: "AI systems" },
  "developpement-logiciel": { fr: "Développement logiciel", en: "Software engineering" },
};

/** One-line pitch per area, for home cards (the long copy lives on the expertise pages). */
export const CLUSTER_BLURB: Record<ExpertiseSlug, Record<Locale, string>> = {
  "cloud-devops": { fr: "Migrations Azure, conteneurs et déploiements automatisés.", en: "Azure migrations, containers and automated delivery." },
  "systemes-ia": { fr: "Agents autonomes, passerelles de modèles et outillage agentique.", en: "Autonomous agents, model gateways and agentic tooling." },
  "developpement-logiciel": { fr: "Backends Java et Kotlin, interfaces TypeScript, applications web.", en: "Java and Kotlin backends, TypeScript interfaces, web apps." },
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

export const pick = <T>(v: { en: T; fr: T }, locale: Locale): T => v[locale];

/* ---------- UI strings for the new interface ---------- */
export const UI = {
  fr: {
    skip: "Aller au contenu principal",
    menu: "Menu",
    close: "Fermer",
    nav: { home: "Accueil", projects: "Projets", about: "Parcours", contact: "Contact" },
    langLabel: "Read in English",
    langShort: "EN",
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
    portraitHint: "Survolez ou touchez le portrait",
    portraitAlt: "Illustration de Jules Royet travaillant sur son ordinateur",
    portraitAltWave: "Illustration de Jules Royet qui fait signe de la main",
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
    loading: "Chargement",
    present: "en cours",
    healthy: "healthy",
  },
  en: {
    skip: "Skip to main content",
    menu: "Menu",
    close: "Close",
    nav: { home: "Home", projects: "Projects", about: "About", contact: "Contact" },
    langLabel: "Lire en français",
    langShort: "FR",
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
    portraitHint: "Hover or tap the portrait",
    portraitAlt: "Illustration of Jules Royet working on his laptop",
    portraitAltWave: "Illustration of Jules Royet waving",
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
    loading: "Loading",
    present: "ongoing",
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
