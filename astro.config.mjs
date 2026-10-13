// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://julesroyet.dev",
  trailingSlash: "never",
  build: { format: "file", inlineStylesheets: "always" },
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  compressHTML: true,
  image: { responsiveStyles: true },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "media-src 'none'",
        "font-src 'self'",
        "connect-src 'self' https://cloudflareinsights.com",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
        "upgrade-insecure-requests",
      ],
      scriptDirective: { resources: ["'self'", "https://static.cloudflareinsights.com"] },
    },
  },
});
