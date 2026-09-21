"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { DICTIONARY, type Locale, type Translations } from "./dictionary";

export { DICTIONARY, type Locale, type Translations };

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("locale-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("locale-change", callback);
  };
}

function getLocaleSnapshot(): Locale {
  if (typeof window === "undefined") return "fr";
  try {
    const saved = localStorage.getItem("jules_portfolio_locale") as Locale | null;
    if (saved === "en" || saved === "fr") return saved;
    const browserLang = navigator.language.slice(0, 2);
    return browserLang === "fr" ? "fr" : "en";
  } catch {
    return "fr";
  }
}

function getServerSnapshot(): Locale {
  return "fr";
}

export function LanguageProvider({ children }: { children: ReactNode }): ReactNode {
  const locale = useSyncExternalStore(
    subscribe,
    getLocaleSnapshot,
    getServerSnapshot
  );

  const setLocale = (newLocale: Locale): void => {
    try {
      localStorage.setItem("jules_portfolio_locale", newLocale);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLocale;
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("locale-change"));
    }
  };

  const toggleLocale = (): void => {
    const next = locale === "fr" ? "en" : "fr";
    setLocale(next);
  };

  const value: LanguageContextType = {
    locale,
    t: DICTIONARY[locale],
    setLocale,
    toggleLocale,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
