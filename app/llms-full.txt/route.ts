import { DICTIONARY } from "@/lib/dictionary";
import { EXPERTISES } from "@/lib/expertises";
import { PROJECT_ARTICLES } from "@/lib/projects-data";
import { siteConfig } from "@/lib/metadata";

export function GET() {
  const about = DICTIONARY.fr.about;
  const text = `# Jules Royet\n\nSource : ${siteConfig.url}/about\n\n${about.bioP1}\n\n${about.bioP2}\n\n${about.bioP3}\n\n## Expérience\n\n${about.experiences.map(e => `### ${e.company} : ${e.role}\n${e.period}\n\n${e.description}`).join("\n\n")}\n\n## Expertises\n\n${Object.entries(EXPERTISES).map(([slug, e]) => `### ${e.title.fr}\nSource : ${siteConfig.url}/expertises/${slug}\n\n${e.summary.fr}\n\n${e.sections.map(s => `${s.fr}\n\n${s.body.fr}`).join("\n\n")}`).join("\n\n")}\n\n## Projets\n\n${Object.entries(PROJECT_ARTICLES).map(([slug, p]) => `### ${p.headline.fr}\nSource : ${siteConfig.url}/projects/${slug}\n\n${p.summary.fr}\n\n${p.problemBody.fr}\n\n${p.architectureBody.fr}`).join("\n\n")}\n\nContact : ${siteConfig.url}/contact\n`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
