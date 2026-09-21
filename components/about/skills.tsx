"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/lib/i18n";

export function Skills(): ReactNode {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
        {t.about.skillsTitle}
      </h3>
      <div className="rounded-4xl border border-foreground/5 bg-foreground/2 p-3 sm:p-5 dark:bg-foreground/5">
        <div className="flex flex-wrap gap-2.5">
          {t.about.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-foreground/8 bg-background px-4 py-2 text-[14px] tracking-tight text-foreground/85 sm:text-[15px] font-medium shadow-2xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
