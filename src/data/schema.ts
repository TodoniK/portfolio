// JSON-LD builders. Every value mirrors visible content (Google structured data policy).
import { SITE, UI, CLUSTER_LABEL, href, pick, t, type Locale, type Project } from "./site";
import { EXPERTISES, type ExpertiseSlug } from "./expertises";

const abs = (p: string) => new URL(p, SITE.url).href;
export const PERSON_ID = `${SITE.url}/#person`;
export const SITE_ID = `${SITE.url}/#website`;

export function personGraph(locale: Locale) {
  const d = t(locale);
  return [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Jules Royet",
      givenName: "Jules",
      familyName: "Royet",
      url: SITE.url,
      image: abs("/og/home.jpg"),
      jobTitle: pick({ fr: "Architecte cloud et DevOps", en: "Cloud & DevOps Architect", es: "Arquitecto cloud y DevOps" }, locale),
      description: d.about.bioP1,
      email: `mailto:${SITE.email}`,
      address: { "@type": "PostalAddress", addressLocality: SITE.locality, addressRegion: SITE.region, addressCountry: SITE.country },
      worksFor: { "@type": "Organization", name: "Orange", url: "https://www.orange.com" },
      alumniOf: d.about.educations.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school, url: e.url })),
      hasCredential: d.about.certifications.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.name,
        recognizedBy: { "@type": "Organization", name: c.issuer },
      })),
      knowsLanguage: ["fr", "en", "es"],
      knowsAbout: d.about.skills,
      sameAs: [SITE.linkedin, SITE.github, SITE.rootme],
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: SITE.url,
      name: "Jules Royet",
      inLanguage: ["fr", "en", "es"],
      publisher: { "@id": PERSON_ID },
    },
  ];
}

export function breadcrumb(locale: Locale, items: Array<[string, string]>) {
  const all: Array<[string, string]> = [[UI[locale].nav.home, href(locale, "/")], ...items];
  return {
    "@type": "BreadcrumbList",
    itemListElement: all.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
  };
}

export function projectSchema(locale: Locale, p: Project, image: string) {
  const a = p.article;
  return {
    "@type": "CreativeWork",
    "@id": `${abs(href(locale, `/projects/${p.id}`))}#work`,
    name: p.title,
    headline: a.headline[locale],
    abstract: a.summary[locale],
    url: abs(href(locale, `/projects/${p.id}`)),
    image: abs(image),
    inLanguage: locale,
    dateCreated: a.timeline.en.match(/\d{4}/)?.[0],
    creator: { "@id": PERSON_ID },
    keywords: p.stack.join(", "),
    genre: p.clusters.map((c) => CLUSTER_LABEL[c][locale]),
    ...(p.githubUrl ? { codeRepository: p.githubUrl } : {}),
    ...(p.previewUrl ? { sameAs: p.previewUrl } : {}),
  };
}

export function faqSchema(locale: Locale, slug: ExpertiseSlug) {
  return {
    "@type": "FAQPage",
    mainEntity: EXPERTISES[slug].questions.map((q) => ({
      "@type": "Question",
      name: q[locale],
      acceptedAnswer: { "@type": "Answer", text: q.answer[locale] },
    })),
  };
}

export function profilePage(locale: Locale) {
  return { "@type": "ProfilePage", url: abs(href(locale, "/about")), mainEntity: { "@id": PERSON_ID }, inLanguage: locale };
}
