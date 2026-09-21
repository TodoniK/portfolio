"use client";

import { useLanguage } from "@/lib/i18n";
import { useSyncExternalStore, type ReactNode } from "react";

function useIsMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function LanguageToggle(): ReactNode {
  const mounted = useIsMounted();
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.nav.langSwitch}
      title={t.nav.langSwitch}
      className="group focus-ring relative inline-flex h-8 px-2.5 cursor-pointer items-center justify-center rounded-full text-foreground/60 transition-all duration-200 hover:text-foreground hover:bg-foreground/5 active:scale-95"
    >
      <span className="text-[12px] font-semibold tracking-wider transition-transform duration-200 group-hover:scale-105 select-none">
        {mounted ? (locale === "fr" ? "EN" : "FR") : "EN"}
      </span>
    </button>
  );
}
