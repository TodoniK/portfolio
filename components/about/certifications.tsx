"use client";

import { Award } from "lucide-react";
import type { ReactNode } from "react";
import { useLanguage } from "@/lib/i18n";

const ROW_HEIGHT = 72;

export function Certifications(): ReactNode {
  const { t } = useLanguage();
  const entries = t.about.certifications;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-foreground text-[15px] font-semibold tracking-tight">
        {t.about.certificationsTitle}
      </h2>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-4xl border p-2 sm:p-4">
        <ul className="flex flex-col gap-2">
          {entries.map((entry) => (
            <li
              key={`${entry.name}-${entry.issuer}`}
              className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-2.5"
              style={{ minHeight: ROW_HEIGHT }}
            >
              <div className="ring-foreground/8 relative inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-foreground/5 ring-1 p-1 text-foreground/80 dark:ring-white/10">
                <Award className="h-6 w-6 text-foreground/75" aria-hidden="true" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="text-foreground text-[16px] font-semibold tracking-tight sm:text-[17px]">
                  {entry.name}
                </span>
                <span className="text-foreground/75 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                  {entry.issuer}
                  <span className="text-foreground/30 mx-2">•</span>
                  <span className="text-foreground/55">{entry.year}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
