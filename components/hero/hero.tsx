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
      <div className="mx-auto w-full max-w-275 px-6 pt-36 pb-20 sm:px-10 sm:pt-48 sm:pb-28">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
          <FadeIn className="flex flex-col gap-4 md:col-span-7">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <p className="text-[17px] leading-tight tracking-tight font-medium text-foreground/80 sm:text-[19px]">
                {t.hero.greeting}
              </p>
            </div>

            <h1 className="text-[2.25rem] font-medium leading-[1.1] tracking-tight text-foreground sm:text-[2.75rem] lg:text-[3.25rem]">
              <span className="block break-words">
                {t.hero.titleLine1}
              </span>
              <span className="block break-words text-foreground/80">
                {t.hero.titleLine2}
              </span>
            </h1>

            <p className="max-w-[34ch] text-[18px] leading-[1.5] tracking-tight text-foreground/65 sm:text-[20px]">
              {t.hero.description}
            </p>

            <HeroCtas />
          </FadeIn>

          <ScaleUnblur className="flex justify-center md:col-span-5 md:justify-end">
            <div className="relative aspect-[4/5] w-full max-w-[300px] sm:max-w-[350px] overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
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
