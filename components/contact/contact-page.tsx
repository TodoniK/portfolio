import { ContactCard } from "./contact-card";
import { localePath, type Locale } from "@/lib/locale";
import Link from "next/link";

export function ContactPage({ locale }: { locale: Locale }) {
  const en = locale === "en";
  return <main id="main-content">
    <section className="mx-auto max-w-3xl px-6 pt-36 pb-12 sm:px-10 sm:pt-44">
      <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">{en ? "Let’s talk about your project" : "Échangeons sur ton projet"}</h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground/80">{en ? "I’m Jules Royet, Cloud & DevOps Architect at Orange, based in Bordeaux with an assignment in Nice. I welcome discussions about engineering roles and freelance projects in cloud, software development and AI systems." : "Je suis Jules Royet, architecte Cloud et DevOps chez Orange, basé à Bordeaux avec une mission à Nice. Je suis ouvert aux échanges sur des opportunités salariées et des projets freelance en cloud, développement logiciel et systèmes IA."}</p>
      <h2 className="mt-10 font-serif text-2xl">{en ? "Employment opportunities" : "Opportunités salariées"}</h2>
      <p className="mt-3 leading-relaxed text-foreground/80">{en ? "Share the role, team, technical context, location and working arrangements. My background and project case studies can help you assess the fit." : "Indique le poste, l’équipe, le contexte technique, la localisation et les modalités de travail. Mon parcours et mes études de cas permettent de situer mon expérience."}</p>
      <h2 className="mt-10 font-serif text-2xl">{en ? "Freelance project discussions" : "Échanges sur une mission freelance"}</h2>
      <p className="mt-3 leading-relaxed text-foreground/80">{en ? "Describe the problem, existing systems, expected outcome and schedule. Scope, availability and working arrangements are discussed together before any commitment." : "Présente le problème à résoudre, l’existant, le résultat attendu et le calendrier. Le périmètre, la disponibilité et les modalités sont à définir ensemble avant tout engagement."}</p>
      <a className="focus-ring mt-8 inline-block break-all rounded-xl bg-foreground px-5 py-3 text-background" href="mailto:jules.royet.pc@gmail.com">jules.royet.pc@gmail.com</a>
      <p className="mt-6 text-sm"><Link className="focus-ring underline underline-offset-4" href={localePath("/about", locale)}>{en ? "Read my background" : "Consulter mon parcours"}</Link></p>
    </section>
    <ContactCard />
  </main>;
}
