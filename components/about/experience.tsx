"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n";

const COLLAPSED_COUNT = 2.5;
const ROW_HEIGHT = 72;
const ROW_GAP = 8;

export function Experience(): ReactNode {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const entries = t.about.experiences;

  const collapsedHeight =
    Math.floor(COLLAPSED_COUNT) * ROW_HEIGHT +
    Math.floor(COLLAPSED_COUNT) * ROW_GAP +
    (COLLAPSED_COUNT % 1) * ROW_HEIGHT;
  const hiddenCount = entries.length - Math.floor(COLLAPSED_COUNT);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-foreground text-[15px] font-semibold tracking-tight">
        {t.about.experienceTitle}
      </h2>
      <div
        className={`border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative overflow-hidden rounded-4xl border px-2 pt-2 sm:px-4 sm:pt-4 ${
          open ? "pb-2 sm:pb-4" : "pb-0"
        }`}
      >
        <motion.div
          className="relative"
          initial={false}
          animate={{
            height: open ? "auto" : collapsedHeight,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <ul className="flex flex-col gap-2">
            {entries.map((entry) => {
              const itemContent = (
                <>
                  <div className="ring-foreground/8 relative inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-white ring-1 p-1 dark:ring-white/10">
                    <Image
                      src={entry.logo}
                      alt={entry.company}
                      width={40}
                      height={40}
                      className="h-9 w-9 object-contain"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-foreground text-[16px] font-semibold tracking-tight sm:text-[17px] group-hover:text-foreground">
                        {entry.company}
                      </span>
                      {entry.url ? (
                        <ExternalLink
                          className="h-4 w-4 text-foreground/30 transition-transform duration-200 group-hover:text-foreground/75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                    <span className="text-foreground/75 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                      {entry.role}
                      <span className="text-foreground/30 mx-2">•</span>
                      <span className="text-foreground/55">{entry.period}</span>
                    </span>
                  </div>
                </>
              );

              return (
                <li key={`${entry.company}-${entry.period}`}>
                  {entry.url ? (
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring group bg-background border-foreground/5 hover:border-foreground/15 hover:bg-foreground/2 flex items-center gap-4 rounded-3xl border p-2.5 transition-all duration-200"
                      style={{ minHeight: ROW_HEIGHT }}
                    >
                      {itemContent}
                    </a>
                  ) : (
                    <div
                      className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-2.5"
                      style={{ minHeight: ROW_HEIGHT }}
                    >
                      {itemContent}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>

        <AnimatePresence>
          {!open && (
            <motion.div
              key="fade"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0"
              style={{
                height: ROW_HEIGHT,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 80%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 80%)",
              }}
            />
          )}
        </AnimatePresence>

        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className={`focus-ring text-foreground flex w-full cursor-pointer items-center justify-center gap-1.5 bg-transparent text-[15px] font-medium tracking-tight ${
              open
                ? "relative mt-4"
                : "absolute inset-x-0 bottom-0 z-10 py-3 sm:py-4"
            }`}
          >
            {open
              ? t.about.showLess
              : t.about.showMore.replace("{count}", hiddenCount.toString())}
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="inline-flex"
            >
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          </button>
        )}
      </div>
    </div>
  );
}
