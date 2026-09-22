"use client";

import { createContext, useContext, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { DICTIONARY, type Locale, type Translations } from "./dictionary";
import { localePath } from "./locale";

export { DICTIONARY, type Locale, type Translations };

const LanguageContext = createContext<{
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
} | null>(null);

export function LanguageProvider({ children, locale }: { children: ReactNode; locale: Locale }): ReactNode {
  const pathname = usePathname();
  const setLocale = (next: Locale): void => {
    const path = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
    window.location.assign(localePath(path, next) + window.location.search + window.location.hash);
  };
  return (
    <LanguageContext.Provider value={{ locale, t: DICTIONARY[locale], setLocale, toggleLocale: () => setLocale(locale === "fr" ? "en" : "fr") }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
