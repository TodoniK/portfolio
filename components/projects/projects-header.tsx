"use client";

import type { ReactNode } from "react";
import { FadeIn } from "@/components/ui/motion-primitives";
import { useLanguage } from "@/lib/i18n";

export function ProjectsHeader(): ReactNode {
  const { t } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-275 px-6 pt-44 pb-16 sm:px-10 sm:pt-56 sm:pb-20">
      <FadeIn className="flex flex-col items-center gap-4 text-center">
        <h1 className="font-serif text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3.25rem] lg:text-[3.75rem]">
          {t.projects.pageTitle}
        </h1>
        <p className="max-w-[36ch] text-[19px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[21px]">
          {t.projects.pageDescription}
        </p>
      </FadeIn>
    </section>
  );
}
