import type { APIRoute } from "astro";
import { SITE } from "../data/site";

// Search and AI answer engines are explicitly welcome: being cited is the goal of GEO.
export const GET: APIRoute = () =>
  new Response(
    [
      "User-agent: *",
      "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
      "Allow: /",
      "",
      ...["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Amazonbot", "Bingbot"].flatMap((b) => [`User-agent: ${b}`, "Allow: /", ""]),
      `Sitemap: ${SITE.url}/sitemap.xml`,
      "",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
