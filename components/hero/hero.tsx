"use client";

import type { ReactNode } from "react";
import { HeroCtas } from "./hero-ctas";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import { PortraitMorph } from "./portrait-morph";
import { useLanguage } from "@/lib/i18n";

const PORTRAIT_SRC = "/jules-base.webp";
const PORTRAIT_HOVER_SRC = "/jules-hey.webp";

export function Hero(): ReactNode {
  const { t } = useLanguage();

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
          <FadeIn className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <p className="text-[17px] leading-tight tracking-tight font-medium text-foreground/80 sm:text-[19px]">
                {t.hero.greeting}
              </p>
            </div>

            <h1 className="text-[2.65rem] font-medium leading-[1.08] tracking-tight text-foreground md:text-[2.5rem] lg:text-[3.5rem]">
              <span className="block whitespace-nowrap">
                {t.hero.titleLine1}
              </span>
              <span className="block whitespace-nowrap text-foreground/80">
                {t.hero.titleLine2}
              </span>
            </h1>

            <p className="max-w-[34ch] text-[20px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[22px]">
              {t.hero.description}
            </p>

            <HeroCtas />
          </FadeIn>

          <ScaleUnblur className="flex justify-stretch md:justify-end">
            <div className="relative aspect-square w-full md:max-w-105 overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
              <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                <PortraitMorph
                  srcA={PORTRAIT_SRC}
                  srcB={PORTRAIT_HOVER_SRC}
                  alt={t.hero.portraitAlt}
                />
              </div>
            </div>
          </ScaleUnblur>
        </div>
      </div>
    </section>
  );
}
