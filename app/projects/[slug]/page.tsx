import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ProjectArticleView } from "@/components/projects/project-article-view";
import { PROJECT_ARTICLES } from "@/lib/projects-data";
import { DICTIONARY } from "@/lib/dictionary";

const SLUGS = [
  "hermes",
  "omniroute",
  "m2c-flows",
  "opencode-harness",
  "shopeen",
  "stakeirb",
  "iplocator",
  "automatisms",
  "mijotons",
  "portfolio",
] as const;

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

  const title = `${project.title} — Étude de cas | Jules Royet`;
  const description = article.summary.fr;
  const url = `https://julesroyet.dev/projects/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: project.image.startsWith("http")
            ? project.image
            : `https://julesroyet.dev${project.image}`,
          width: 1200,
          height: 630,
          alt: project.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        project.image.startsWith("http")
          ? project.image
          : `https://julesroyet.dev${project.image}`,
      ],
    },
  };
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
