import type { APIRoute } from "astro";
import { SITE, CLUSTERS, href, projects, t } from "../data/site";
import { EXPERTISES } from "../data/expertises";

const abs = (p: string) => new URL(p, SITE.url).href;

export const GET: APIRoute = () => {
  const d = t("en");
  const body = [
    "# Jules Royet",
    "",
    "> Cloud & DevOps Architect at Orange and software engineer, ENSEIRB-MATMECA graduate. Based in Nice, France. Builds cloud platforms, CI/CD pipelines and autonomous AI agent runtimes.",
    "",
    d.about.bioP1,
    "",
    "## Expertise",
    ...CLUSTERS.map((c) => `- [${EXPERTISES[c.slug].title.en}](${abs(href("en", `/expertises/${c.slug}`))}): ${EXPERTISES[c.slug].summary.en}`),
    "",
    "## Case studies",
    ...projects("en").map((p) => `- [${p.title}](${abs(href("en", `/projects/${p.id}`))}): ${p.description}`),
    "",
    "## Profile",
    `- [About](${abs("/en/about")}): experience, education, certifications`,
    `- [Contact](${abs("/en/contact")}): ${SITE.email}`,
    `- [Resume (PDF)](${abs(SITE.cv)})`,
    `- [Full text for LLMs](${abs("/llms-full.txt")})`,
    "",
    "## Optional",
    `- [Version française](${abs("/")})`,
    `- [LinkedIn](${SITE.linkedin})`,
    `- [GitHub](${SITE.github})`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
