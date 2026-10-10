import type { APIRoute } from "astro";
import { SITE, CLUSTERS, href, projects, t, type Locale } from "../data/site";
import { EXPERTISES } from "../data/expertises";

const abs = (p: string) => new URL(p, SITE.url).href;

function dump(l: Locale) {
  const d = t(l);
  const out = [`# Jules Royet (${l})`, "", d.about.bioP1, "", d.about.bioP2, "", d.about.bioP3, "", `## ${d.about.experienceTitle}`];
  d.about.experiences.forEach((e) => out.push(`- ${e.role}, ${e.company} (${e.period}): ${e.description}`));
  out.push("", `## ${d.about.educationTitle}`);
  d.about.educations.forEach((e) => out.push(`- ${e.degree}, ${e.school}, ${e.city} (${e.period})`));
  out.push("", `## ${d.about.certificationsTitle}`);
  d.about.certifications.forEach((c) => out.push(`- ${c.name}, ${c.issuer} (${c.year})`));
  out.push("", `## ${d.about.skillsTitle}`, ...d.about.skills.map((s) => `- ${s}`), "");
  CLUSTERS.forEach((c) => {
    const e = EXPERTISES[c.slug];
    out.push(`## ${e.title[l]}`, abs(href(l, `/expertises/${c.slug}`)), "", e.summary[l], "");
    e.sections.forEach((s) => out.push(`### ${s[l]}`, s.body[l], ""));
    e.questions.forEach((q) => out.push(`Q: ${q[l]}`, `A: ${q.answer[l]}`, ""));
  });
  projects(l).forEach((p) => {
    const a = p.article;
    out.push(`## ${p.title}`, abs(href(l, `/projects/${p.id}`)), "", `${a.role[l]} · ${a.timeline[l]} · ${a.clientOrContext[l]} · ${a.infrastructure[l]}`, "", a.summary[l], "",
      `### ${a.problemTitle[l]}`, a.problemBody[l], "", `### ${a.architectureTitle[l]}`, a.architectureBody[l], "", `### ${a.challengesTitle[l]}`,
      ...a.challenges.map((c) => `- ${c[l]}`), "", `### ${a.metricsTitle[l]}`, ...a.metrics.map((m) => `- ${m.label[l]}: ${m.value}`), "", `Stack: ${p.stack.join(", ")}`, "");
  });
  return out.join("\n");
}

export const GET: APIRoute = () =>
  new Response(`${dump("en")}\n\n---\n\n${dump("fr")}\n\nContact: ${SITE.email}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
