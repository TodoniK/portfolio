"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { features } from "@/lib/config";

const LENIS_OPTIONS = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
};

export function SmoothScroll({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const lenisRef = useRef<Lenis | null>(null);
  const scrollPositions = useRef<Map<string, number>>(new Map());
  const isPopState = useRef(false);

  // Manage popstate (back/forward navigation)
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const onPopState = (): void => {
      isPopState.current = true;
    };

    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  // Initialize Lenis
  useEffect(() => {
    if (!features.smoothScroll) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis(LENIS_OPTIONS);
    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId: number;

    function raf(time: number): void {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const onScroll = (): void => {
      if (typeof window !== "undefined") {
        const path = window.location.pathname;
        const y = window.scrollY;
        // Don't overwrite saved position with 0 during route transition resets
        if (y > 0) {
          scrollPositions.current.set(path, y);
        }
      }
    };

    lenis.on("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });

    function handleAnchorClick(e: MouseEvent): void {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const element = document.querySelector(href);
      if (!element) return;

      e.preventDefault();
      lenis.scrollTo(element as HTMLElement, { offset: -100 });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // Handle route change: restore on popstate or returning from article, scroll to top on article navigation
  useEffect(() => {
    const wasPop = isPopState.current;
    isPopState.current = false;
    const currentPath = pathname;
    const prevPath = prevPathname.current;
    prevPathname.current = currentPath;

    // Restore scroll when returning to /projects from an article, or on back/forward
    const isReturningToProjects =
      currentPath === "/projects" && Boolean(prevPath?.startsWith("/projects/"));

    const shouldRestore = wasPop || isReturningToProjects;

    if (!shouldRestore) {
      // Normal link navigation (entering an article, next/prev project):
      // Cancel any inertia immediately and reset to top
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.stop();
        lenis.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
        lenis.start();
      } else {
        window.scrollTo(0, 0);
      }

      // Reinforce top position after DOM mounts
      requestAnimationFrame(() => {
        const l = lenisRef.current;
        if (l) {
          l.stop();
          l.scrollTo(0, { immediate: true });
          window.scrollTo(0, 0);
          l.start();
        } else {
          window.scrollTo(0, 0);
        }
      });
      return;
    }

    // Restore saved scroll position
    const targetY = scrollPositions.current.get(currentPath) ?? 0;
    let attempts = 0;

    const restore = (): void => {
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const lenis = lenisRef.current;

      // If DOM has grown enough to accommodate target position or reached max attempts
      if (maxScroll >= targetY || attempts >= 10) {
        if (lenis) {
          lenis.stop();
          lenis.scrollTo(targetY, { immediate: true });
          window.scrollTo(0, targetY);
          lenis.start();
        } else {
          window.scrollTo(0, targetY);
        }
      } else {
        attempts += 1;
        requestAnimationFrame(restore);
      }
    };

    requestAnimationFrame(restore);
  }, [pathname]);

  return <>{children}</>;
}
