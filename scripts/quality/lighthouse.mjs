// Lighthouse on key pages (mobile + desktop). Usage: BASE=http://127.0.0.1:8788 node scripts/quality/lighthouse.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://127.0.0.1:8788";
const pages = (process.env.PAGES ?? "/,/projects,/projects/hermes,/en/about,/expertises/systemes-ia").split(",");
mkdirSync("reports", { recursive: true });
const rows = [];
for (const form of ["mobile", "desktop"]) {
  for (const p of pages) {
    const out = `reports/lh-${form}-${p.replace(/\W+/g, "_") || "home"}.json`;
    const args = [ "lighthouse", BASE + p, "--quiet", "--output=json", `--output-path=${out}`, "--chrome-flags=--headless=new --no-sandbox",
      "--only-categories=performance,accessibility,best-practices,seo", ...(form === "desktop" ? ["--preset=desktop"] : ["--form-factor=mobile"]) ];
    execFileSync("npx", args, { stdio: "inherit" });
    const r = JSON.parse(readFileSync(out, "utf8"));
    const s = (k) => Math.round(r.categories[k].score * 100);
    const a = r.audits;
    rows.push({ form, page: p, perf: s("performance"), a11y: s("accessibility"), bp: s("best-practices"), seo: s("seo"),
      LCP: a["largest-contentful-paint"].displayValue, CLS: a["cumulative-layout-shift"].displayValue, TBT: a["total-blocking-time"].displayValue });
  }
}
console.table(rows);
