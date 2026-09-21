"use client";

import { Check, Mail } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { useLanguage } from "@/lib/i18n";

const EMAIL = "jules.royet.pc@gmail.com";

export function ContactButton(): ReactNode {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t, locale } = useLanguage();

  const fallbackCopy = (): void => {
    try {
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    } catch {
      // Ignored
    }
  };

  const handleCopy = (): void => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).catch(() => {
        fallbackCopy();
      });
    } else {
      fallbackCopy();
    }
  };

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={handleCopy}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={
          copied
            ? t.contact.buttonCopied
            : `${t.contact.buttonIdle} : ${t.contact.buttonCopy.replace("{email}", EMAIL)}`
        }
        className="focus-ring relative inline-flex h-11 min-w-[150px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-foreground px-5 text-sm font-medium text-background transition-transform duration-150 active:scale-98 shadow-sm hover:opacity-95"
      >
        <span className="inline-flex items-center gap-2">
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              <span className="text-emerald-400">{t.contact.buttonCopied}</span>
            </>
          ) : (
            <>
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>{t.contact.buttonIdle}</span>
            </>
          )}
        </span>
      </button>

      {/* Floating email tooltip on hover: zero layout shift */}
      {hovered && !copied ? (
        <div
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-foreground/10 bg-background/95 px-2.5 py-1 text-xs font-medium text-foreground shadow-lg backdrop-blur-md transition-opacity duration-150"
        >
          <span>{EMAIL}</span>
          <span className="ml-1.5 text-foreground/50">
            ({locale === "fr" ? "cliquer pour copier" : "click to copy"})
          </span>
        </div>
      ) : null}
    </div>
  );
}
