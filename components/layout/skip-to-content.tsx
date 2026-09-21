"use client";

import { useLanguage } from "@/lib/i18n";
import type { ReactNode } from "react";

export function SkipToContent(): ReactNode {
  const { locale } = useLanguage();
  return (
    <a href="#main-content" className="skip-to-content">
      {locale === "fr" ? "Passer au contenu principal" : "Skip to main content"}
    </a>
  );
}
