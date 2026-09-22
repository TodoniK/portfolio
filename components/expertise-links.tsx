"use client";
import { useLanguage } from "@/lib/i18n";
import { LocalizedLink } from "@/components/ui/localized-link";

export function ExpertiseLinks() {
  const { locale } = useLanguage();
  const en = locale === "en";
  return <nav aria-label={en ? "Engineering expertise and contact" : "Expertises et contact"} className="flex flex-wrap justify-center gap-x-6 gap-y-4 px-6 pb-10 text-sm text-foreground/75">
    <LocalizedLink className="focus-ring underline underline-offset-4 hover:text-foreground" href="/expertises/cloud-devops">Cloud & DevOps</LocalizedLink>
    <LocalizedLink className="focus-ring underline underline-offset-4 hover:text-foreground" href="/expertises/developpement-logiciel">{en ? "Software engineering" : "Développement logiciel"}</LocalizedLink>
    <LocalizedLink className="focus-ring underline underline-offset-4 hover:text-foreground" href="/expertises/systemes-ia">{en ? "AI systems" : "Systèmes IA"}</LocalizedLink>
    <LocalizedLink className="focus-ring underline underline-offset-4 hover:text-foreground" href="/contact">Contact</LocalizedLink>
  </nav>;
}
