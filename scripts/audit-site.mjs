// Usage: node scripts/audit-site.mjs http://localhost:3100 /absolute/path/to/lighthouse/core/index.js /tmp/report.json
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const [base = "http://localhost:3100", lighthousePath, output, filter] = process.argv.slice(2);
assert(lighthousePath && output, "Provide the installed Lighthouse module and output path");
const require = createRequire(lighthousePath);
const { launch } = require("chrome-launcher");
const { default: lighthouse } = await import(pathToFileURL(lighthousePath));
const { default: desktopConfig } = await import(new URL("./config/desktop-config.js", pathToFileURL(lighthousePath)));
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
assert(paths.length >= 26);
const chrome = await launch({ chromeFlags: ["--headless", "--no-sandbox"] });
const results = [];
try {
  for (const path of paths) {
    if (filter && !new RegExp(filter).test(path)) continue;
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const en = /^\/en(?:\/|$)/.test(path);
    assert(html.includes(`lang="${en ? "en" : "fr"}"`), `SSR language: ${path}`);
    assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, `One h1: ${path}`);
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(canonical?.replace(/\/$/, ""), `https://www.julesroyet.dev${path}`.replace(/\/$/, ""), `Canonical: ${path}`);
    assert(html.includes("hrefLang=\"en\"") || html.includes("hreflang=\"en\""), `English alternate: ${path}`);
    for (const device of ["mobile", "desktop"]) {
      const { lhr } = await lighthouse(base + path, { port: chrome.port, logLevel: "error", onlyCategories: ["performance", "accessibility", "best-practices", "seo"] }, device === "desktop" ? desktopConfig : undefined);
      const scores = Object.fromEntries(Object.entries(lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)]));
      const failed = Object.entries(lhr.audits).filter(([, a]) => a.score !== null && a.score < 1 && a.scoreDisplayMode !== "informative").map(([id, a]) => ({ id, score: a.score, title: a.title, value: a.displayValue, details: a.details }));
      results.push({ path, device, scores, failed, lcp: lhr.audits["lcp-breakdown-insight"]?.details });
      console.log(path, device, JSON.stringify(scores));
      await writeFile(output, JSON.stringify(results, null, 2));
    }
  }
} finally { await chrome.kill(); }
