"use client";

import { ArrowRight, FileText } from "lucide-react";
import { LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "@/lib/i18n";
import { ContactButton } from "./contact-button";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ContactCardCtas(): ReactNode {
  const { t, locale } = useLanguage();

  return (
    <LayoutGroup>
      <motion.div
        layout
        transition={{ layout: { duration: 0.55, ease: EASE } }}
        className="mt-2 flex flex-wrap items-center gap-3"
      >
        <ContactButton />

        <motion.div
          layout
          transition={{ layout: { duration: 0.55, ease: EASE } }}
        >
          <Link
            href="/projects"
            className="border border-foreground/5 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-md/2 transition-colors hover:bg-foreground/5"
          >
            {t.contact.seeProjects}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>

        <motion.div
          layout
          transition={{ layout: { duration: 0.55, ease: EASE } }}
        >
          <a
            href="/resumes.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-foreground/5 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            <FileText className="h-4 w-4 text-foreground/60" aria-hidden="true" />
            {locale === "fr" ? "Télécharger le CV" : "Download CV"}
          </a>
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
}
