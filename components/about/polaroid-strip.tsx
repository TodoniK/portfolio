"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/motion";

const cards = [
  { fr: "Cloud", en: "Cloud", detail: "Azure · Kubernetes", image: "/assets/brands/kubernetes.svg", rotate: -8 },
  { fr: "DevOps", en: "DevOps", detail: "Docker · CI/CD", image: "/assets/brands/docker.svg", rotate: 6 },
  { fr: "Logiciel", en: "Software", detail: "TypeScript · React", image: "/assets/brands/typescript.svg", rotate: -4 },
  { fr: "Systèmes IA", en: "AI systems", detail: "Hermes · OpenCode", image: "/assets/brands/hermes.svg", rotate: 7 },
  { fr: "Cybersécurité", en: "Cybersecurity", detail: "Root-Me · CTF", image: "/assets/brands/rootme.svg", rotate: -6 },
  { fr: "Ingénieur", en: "Engineer", detail: "ENSEIRB-MATMECA", image: "/assets/schools/logo-enseirb-matmeca.webp", rotate: 5 },
] as const;

export function PolaroidStrip() {
  const { locale } = useLanguage();
  const reducedMotion = useReducedMotion();
  return (
    <ul aria-label={locale === "fr" ? "Expertises et formation" : "Expertise and education"} className="flex w-full flex-wrap items-start justify-center gap-3 px-6 py-5 sm:gap-2 sm:px-8">
      {cards.map(card => (
        <motion.li initial={false} animate={reducedMotion ? {} : { y: [-12, 0], scale: [0.95, 1] }} transition={{ duration: 0.45 }} key={card.en} style={{ rotate: `${card.rotate}deg` }} className="expertise-polaroid flex aspect-[3/4] w-[clamp(7rem,11vw,9rem)] shrink-0 flex-col rounded-2xl border-4 border-neutral-200 bg-white p-2 text-neutral-900 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100">
          <div className="flex flex-1 items-center justify-center rounded-lg bg-neutral-100 p-4">
            <Image src={card.image} alt="" width={64} height={64} sizes="64px" className="h-14 w-14 object-contain" />
          </div>
          <p className="mt-3 text-center text-xs font-semibold">{card[locale]}</p>
          <p className="mt-1 mb-1 text-center text-[10px] leading-relaxed">{card.detail}</p>
        </motion.li>
      ))}
    </ul>
  );
}
