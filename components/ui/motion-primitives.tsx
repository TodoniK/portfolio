"use client";

import type { ReactNode } from "react";

export function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}): ReactNode {
  return (
    <div
      style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
      className={`motion-enter ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function ScaleUnblur({
  children,
  delay = 0,
  duration = 1,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}): ReactNode {
  return (
    <div
      style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s`, transformOrigin: "center" }}
      className={`motion-scale ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
