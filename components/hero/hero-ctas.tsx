"use client";

import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "@/lib/i18n";
import { ContactButton } from "@/components/contact/contact-button";

export function HeroCtas(): ReactNode {
  const { t, locale } = useLanguage();

  return (
    <div className="mt-2 flex flex-wrap items-center gap-3">
      <ContactButton />

      <Link
        href="/projects"
        className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-foreground/5"
      >
        {t.hero.viewWork}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>

      <a
        href="/resumes.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
      >
        <FileText className="h-4 w-4 text-foreground/60" aria-hidden="true" />
        {locale === "fr" ? "CV" : "Resume"}
      </a>
    </div>
  );
}
