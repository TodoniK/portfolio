import ProjectPage from "@/app/(fr)/projects/[slug]/page";
import { PROJECT_ARTICLES } from "@/lib/projects-data";
import { DICTIONARY } from "@/lib/dictionary";
import { createMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

export function generateStaticParams() { return Object.keys(PROJECT_ARTICLES).map(slug => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = DICTIONARY.en.projects.items.find(p => p.id === slug);
  const article = PROJECT_ARTICLES[slug];
  if (!project || !article) notFound();
  return createMetadata({ title: `${project.title}: case study`, description: article.summary.en, path: `/projects/${slug}`, locale: "en" });
}
export default ProjectPage;
