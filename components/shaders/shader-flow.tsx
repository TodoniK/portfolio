"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import type { ShaderFlowProps } from "./shader-flow-canvas";

const Canvas = dynamic(() => import("./shader-flow-canvas"), { ssr: false });

export function ShaderFlow(props: ShaderFlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element || reduced || matchMedia("(pointer: coarse)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { rootMargin: "100px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [reduced]);
  return <div ref={ref} aria-hidden="true" className={props.className ?? "absolute inset-0 h-full w-full"} style={{ background: "radial-gradient(ellipse at center, color-mix(in srgb, var(--foreground) 5%, transparent), transparent 70%)" }}>{visible && !reduced ? <Canvas {...props} /> : null}</div>;
}
