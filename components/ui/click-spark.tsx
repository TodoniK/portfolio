"use client";

// Adapted from React Bits ClickSpark: https://reactbits.dev/animations/click-spark
// Same eight-ray, 400ms ease-out burst observed on obsidianui.dev.
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";

export function ClickSpark() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let sparks: { x: number; y: number; start: number; color: string }[] = [];
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (now: number) => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      sparks = sparks.filter(s => now - s.start < 400);
      for (const spark of sparks) {
        const progress = Math.max(0, (now - spark.start) / 400);
        const eased = progress * (2 - progress);
        for (let i = 0; i < 8; i++) {
          const angle = Math.PI * 2 * i / 8;
          const distance = eased * 15;
          const length = 10 * (1 - eased);
          ctx.strokeStyle = spark.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(spark.x + distance * Math.cos(angle), spark.y + distance * Math.sin(angle));
          ctx.lineTo(spark.x + (distance + length) * Math.cos(angle), spark.y + (distance + length) * Math.sin(angle));
          ctx.stroke();
        }
      }
      raf = sparks.length ? requestAnimationFrame(draw) : 0;
    };
    const click = (event: MouseEvent) => {
      if (event.detail === 0) return;
      sparks = [...sparks.slice(-15), { x: event.clientX, y: event.clientY, start: performance.now(), color: getComputedStyle(document.body).color }];
      if (!raf) raf = requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("click", click, true);
    return () => { cancelAnimationFrame(raf); ctx.clearRect(0, 0, innerWidth, innerHeight); window.removeEventListener("resize", resize); document.removeEventListener("click", click, true); };
  }, [reduced]);
  return <canvas ref={ref} aria-hidden="true" data-click-spark className="pointer-events-none fixed inset-0 z-[9999] h-full w-full" />;
}
