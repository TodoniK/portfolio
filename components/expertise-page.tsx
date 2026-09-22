import Link from "next/link";
import { notFound } from "next/navigation";
import { EXPERTISES, type ExpertiseSlug } from "@/lib/expertises";
import { localePath, type Locale } from "@/lib/locale";
import { DICTIONARY } from "@/lib/dictionary";
import { siteConfig } from "@/lib/metadata";
import { ContactCard } from "@/components/contact/contact-card";

export function ExpertisePage({ slug, locale }: { slug: string; locale: Locale }) {
  if (!Object.hasOwn(EXPERTISES, slug)) notFound();
  const entry = EXPERTISES[slug as ExpertiseSlug];
  const en = locale === "en";
  const url = siteConfig.url + localePath(`/expertises/${slug}`, locale);
  const jsonLd = { "@context": "https://schema.org", "@type": "WebPage", "@id": `${url}#page`, url, name: entry.title[locale], description: entry.summary[locale], inLanguage: locale, about: { "@id": `${siteConfig.url}/#person` }, author: { "@id": `${siteConfig.url}/#person` }, isPartOf: { "@id": `${siteConfig.url}/#website` } };
  return <main id="main-content">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <article className="mx-auto max-w-3xl px-6 pt-36 pb-12 sm:px-10 sm:pt-44">
      <nav aria-label={en ? "Breadcrumb" : "Fil d’Ariane"} className="mb-8 text-sm text-foreground/70"><Link className="focus-ring underline underline-offset-4" href={localePath("/", locale)}>{en ? "Home" : "Accueil"}</Link><span aria-hidden="true"> / </span><span>{entry.title[locale]}</span></nav>
      <p className="mb-4 font-mono text-xs uppercase tracking-widest">Jules Royet · Bordeaux / Nice</p>
      <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">{entry.title[locale]}</h1>
      <p className="mt-7 text-lg leading-relaxed text-foreground/80">{entry.summary[locale]}</p>
      {entry.sections.map(section => <section key={section.en} className="mt-14"><h2 className="font-serif text-2xl sm:text-3xl">{section[locale]}</h2><p className="mt-4 leading-relaxed text-foreground/80">{section.body[locale]}</p></section>)}
      <section className="mt-14"><h2 className="font-serif text-2xl">{en ? "Related engineering work" : "Réalisations associées"}</h2><ul className="mt-5 divide-y divide-foreground/10">{entry.projects.map(id => { const project = DICTIONARY[locale].projects.items.find(p => p.id === id)!; return <li key={id}><Link href={localePath(`/projects/${id}`, locale)} className="focus-ring block py-4 underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground">{project.title} <span aria-hidden="true">↗</span></Link></li>; })}</ul></section>
      <section className="mt-14"><h2 className="font-serif text-2xl">{en ? "Questions and answers" : "Questions fréquentes"}</h2>{entry.questions.map(q => <div key={q.en} className="mt-7"><h3 className="font-semibold">{q[locale]}</h3><p className="mt-2 leading-relaxed text-foreground/80">{q.answer[locale]}</p></div>)}</section>
      <footer className="mt-14 border-t border-foreground/10 pt-6 text-sm leading-relaxed text-foreground/75">{en ? "Written by Jules Royet, software engineer and Cloud & DevOps Architect at Orange. " : "Par Jules Royet, ingénieur logiciel et architecte Cloud et DevOps chez Orange. "}<Link className="focus-ring underline underline-offset-4" href={localePath("/about", locale)}>{en ? "Background and experience" : "Parcours et expérience"}</Link>.</footer>
    </article>
    <ContactCard />
  </main>;
}
