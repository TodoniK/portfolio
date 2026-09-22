import type { ReactNode } from "react";

// Adapted from React Bits Star Border: https://reactbits.dev/animations/star-border
export function StarBorder({ children }: { children: ReactNode }) {
  return <div className="portrait-star-border relative w-full max-w-[300px] rounded-4xl p-[2px] sm:max-w-[350px]">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <span className="portrait-star portrait-star-top" />
      <span className="portrait-star portrait-star-bottom" />
    </div>
    <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] border border-foreground/15 bg-background p-1.5 shadow-sm">{children}</div>
  </div>;
}
