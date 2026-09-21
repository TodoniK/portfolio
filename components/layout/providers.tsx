"use client";

import { ReducedMotionProvider } from "@/lib/motion";
import { LanguageProvider } from "@/lib/i18n";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }): ReactNode {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReducedMotionProvider>
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </ReducedMotionProvider>
    </ThemeProvider>
  );
}
