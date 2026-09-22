import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ProjectArticleView } from "@/components/projects/project-article-view";
import { PROJECT_ARTICLES } from "@/lib/projects-data";
import { DICTIONARY } from "@/lib/dictionary";
import { createMetadata } from "@/lib/metadata";

const SLUGS = Object.keys(PROJECT_ARTICLES);

export function generateStaticParams(): Array<{ slug: string }> {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = DICTIONARY.fr.projects.items.find((p) => p.id === slug);
  const article = PROJECT_ARTICLES[slug];

  if (!project || !article) {
    return {
      title: "Projet non trouvé | Jules Royet",
    };
  }

  return createMetadata({ title: `${project.title} : étude de cas`, description: article.summary.fr, path: `/projects/${slug}` });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<ReactNode> {
  const { slug } = await params;

  if (!PROJECT_ARTICLES[slug]) {
    notFound();
  }

  return (
    <main id="main-content">
      <ProjectArticleView slug={slug} />
    </main>
  );
}
