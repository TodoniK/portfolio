"use client";

import { ReducedMotionProvider } from "@/lib/motion";
import { LanguageProvider } from "@/lib/i18n";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/locale";

export function Providers({ children, locale }: { children: ReactNode; locale: Locale }): ReactNode {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReducedMotionProvider>
        <LanguageProvider locale={locale}>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </ReducedMotionProvider>
    </ThemeProvider>
  );
}
