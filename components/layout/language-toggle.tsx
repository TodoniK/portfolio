"use client";

import { useLanguage } from "@/lib/i18n";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { localePath } from "@/lib/locale";

export function LanguageToggle(): ReactNode {
  const { locale, t } = useLanguage();
  const path = usePathname().replace(/^\/en(?=\/|$)/, "") || "/";

  return (
    <a
      href={localePath(path, locale === "fr" ? "en" : "fr")}
      hrefLang={locale === "fr" ? "en" : "fr"}
      aria-label={t.nav.langSwitch}
      title={t.nav.langSwitch}
      className="group focus-ring relative inline-flex h-8 px-2.5 cursor-pointer items-center justify-center rounded-full text-foreground/60 transition-all duration-200 hover:text-foreground hover:bg-foreground/5 active:scale-95"
    >
      <span className="text-[12px] font-semibold tracking-wider transition-transform duration-200 group-hover:scale-105 select-none">
        {locale === "fr" ? "EN" : "FR"}
      </span>
    </a>
  );
}
