"use client";

import type { ReactNode } from "react";
import { FadeIn } from "@/components/ui/motion-primitives";
import { useLanguage } from "@/lib/i18n";

export function AboutBio(): ReactNode {
  const { t } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-160 px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
      <FadeIn delay={0.3}>
        <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
          <h1 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
            {t.about.bioTitle}
          </h1>
          <div className="mt-8 space-y-6 text-[16px] leading-[1.75] tracking-tight text-foreground/75 sm:text-[18px]">
            <p>{t.about.bioP1}</p>
            <p>{t.about.bioP2}</p>
            <p>{t.about.bioP3}</p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
