import { siteConfig } from "@/lib/metadata";
import { EXPERTISES } from "@/lib/expertises";
import { DICTIONARY } from "@/lib/dictionary";

export function GET() {
  const text = `# Jules Royet\n\n> Cloud & DevOps Architect at Orange and software engineer, ENSEIRB-MATMECA graduate. Based in Bordeaux with an assignment in Nice, France.\n\n## Profile\n\n- [About](${siteConfig.url}/en/about)\n- [Projects](${siteConfig.url}/en/projects)\n- [Contact](${siteConfig.url}/en/contact)\n- [French homepage](${siteConfig.url}/)\n- [Full profile](${siteConfig.url}/llms-full.txt)\n\n## Expertise\n\n${Object.entries(EXPERTISES).map(([slug, entry]) => `- [${entry.title.en}](${siteConfig.url}/en/expertises/${slug}): ${entry.summary.en}`).join("\n")}\n\n## Case studies\n\n${DICTIONARY.en.projects.items.map(project => `- [${project.title}](${siteConfig.url}/en/projects/${project.id}): ${project.description}`).join("\n")}\n`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
