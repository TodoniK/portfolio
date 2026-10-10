import type { APIRoute } from "astro";
import { SITE, LOCALES, href, routes } from "../data/site";

const abs = (p: string) => new URL(p, SITE.url).href;
const lastmod = new Date().toISOString().slice(0, 10);

export const GET: APIRoute = () => {
  const urls = routes().flatMap((r) =>
    LOCALES.map((l) => {
      const alts = LOCALES.map((a) => `<xhtml:link rel="alternate" hreflang="${a}" href="${abs(href(a, r))}"/>`).join("");
      return `<url><loc>${abs(href(l, r))}</loc><lastmod>${lastmod}</lastmod>${alts}<xhtml:link rel="alternate" hreflang="x-default" href="${abs(href("fr", r))}"/></url>`;
    }),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
