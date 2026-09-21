"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useLanguage } from "@/lib/i18n";

const EMAIL = "jules.royet.pc@gmail.com";
const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 420,
  damping: 32,
  mass: 0.8,
} as const;

export function ContactButton(): ReactNode {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useLanguage();

  const isOpen = hovered || copied;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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

  const handleCopy = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCopied(true);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).catch(() => {
        fallbackCopy();
      });
    } else {
      fallbackCopy();
    }

    timeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <motion.button
      type="button"
      layout
      onClick={handleCopy}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={
        copied
          ? t.contact.buttonCopied
          : isOpen
            ? t.contact.buttonCopy.replace("{email}", EMAIL)
            : t.contact.buttonIdle
      }
      transition={{ layout: SPRING_TRANSITION }}
      style={{ borderRadius: 12 }}
      className="focus-ring relative inline-flex h-11 cursor-pointer items-center justify-center overflow-hidden bg-foreground px-4 sm:px-5 text-sm font-medium text-background active:scale-[0.98] shadow-sm select-none"
    >
      <motion.div
        layout="position"
        className="relative inline-flex items-center justify-center"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {isOpen ? (
            <motion.span
              key="expanded"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="inline-flex items-center gap-2 whitespace-nowrap"
            >
              <span className="relative inline-flex h-4 w-4 shrink-0 items-center justify-center">
                <AnimatePresence initial={false} mode="wait">
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="inline-flex text-emerald-400"
                    >
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="inline-flex text-background/80"
                    >
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              {copied ? (
                <span className="text-emerald-400 font-medium">{t.contact.buttonCopied}</span>
              ) : (
                <span className="tabular-nums tracking-tight">{EMAIL}</span>
              )}
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.contact.buttonIdle}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}
