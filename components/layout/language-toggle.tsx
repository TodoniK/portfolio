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
      className="focus-ring relative inline-flex h-8 px-2.5 cursor-pointer items-center justify-center rounded-full bg-background ring-1 ring-foreground/8 transition-colors hover:bg-foreground/5"
    >
      <span className="text-[12px] font-semibold tracking-wider text-foreground select-none">
        {mounted ? (locale === "fr" ? "EN" : "FR") : "EN"}
      </span>
    </button>
  );
}
