// Post-build: lifts Astro's per-page CSP <meta> into a site-wide CSP response header (union of hashes),
// because frame-ancestors and reporting only work as headers. Writes dist/_headers.
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const dist = resolve(import.meta.dirname, "../../dist");
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : f.endsWith(".html") ? [join(d, f)] : []));
const script = new Set(), style = new Set();
for (const f of walk(dist)) {
  const meta = readFileSync(f, "utf8").match(/http-equiv="content-security-policy" content="([^"]+)"/)?.[1];
  if (!meta) throw new Error(`No CSP meta in ${f}`);
  for (const part of meta.split(";")) {
    const [name, ...vals] = part.trim().split(/\s+/);
    const target = name === "script-src" ? script : name === "style-src" ? style : null;
    vals.filter((v) => v.startsWith("'sha")).forEach((v) => target?.add(v));
  }
}
const csp = [
  "default-src 'self'",
  `script-src 'self' https://static.cloudflareinsights.com ${[...script].join(" ")}`,
  "style-src 'self' 'unsafe-inline'", // per-page hashes stay enforced by the CSP meta; header kept short (_headers line limit)
  "img-src 'self' data:",
  "media-src 'none'",
  "font-src 'self'",
  "connect-src 'self' https://cloudflareinsights.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");
const headers = `/*
  Content-Security-Policy: ${csp}
  Strict-Transport-Security: max-age=31536000
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
  X-Robots-Tag: index, follow

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/og/*
  Cache-Control: public, max-age=86400

/signature/*
  ! Cross-Origin-Resource-Policy
  Cache-Control: public, max-age=86400
  X-Robots-Tag: noindex

/resumes.pdf
  Cache-Control: public, max-age=3600
  X-Robots-Tag: noindex

/*.txt
  Content-Type: text/plain; charset=utf-8
`;
if (csp.length > 1950) throw new Error(`CSP header too long for _headers (${csp.length})`);
writeFileSync(join(dist, "_headers"), headers);
console.log(`_headers: ${script.size} script hashes, ${style.size} style hashes, ${csp.length} chars`);
