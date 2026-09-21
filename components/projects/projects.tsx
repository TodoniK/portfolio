"use client";

import {
  ArrowRight,
  ExternalLink,
  Github,
  Globe,
  Lock,
  MessageSquare,
  Smartphone,
  Sparkles,
  Leaf,
  Dices,
  Bot,
  Network,
  Cloud,
  Terminal,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/motion-primitives";
import { useLanguage } from "@/lib/i18n";

const PROJECT_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  hermes: Bot,
  omniroute: Network,
  "m2c-flows": Cloud,
  "opencode-harness": Terminal,
  shopeen: Leaf,
  stakeirb: Dices,
  automatisms: MessageSquare,
  iplocator: Globe,
  mijotons: Smartphone,
  portfolio: Sparkles,
};

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const { t } = useLanguage();
  const items = viewMoreVisible
    ? t.projects.items.slice(0, 4)
    : t.projects.items;

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-4 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              {t.projects.headline}
            </h2>
            <p className="max-w-[36ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              {t.projects.description}
            </p>
          </FadeIn>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {items.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              confidentialLabel={t.projects.confidential}
              viewCodeLabel={t.projects.viewCode}
              viewLiveLabel={t.projects.viewLive}
            />
          ))}
        </div>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/projects"
              className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 shadow-sm"
            >
              {t.projects.viewMore}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

type ProjectItem = (typeof import("@/lib/i18n").DICTIONARY)["en"]["projects"]["items"][number];

function ProjectCard({
  project,
  index,
  confidentialLabel,
  viewCodeLabel,
  viewLiveLabel,
}: {
  project: ProjectItem;
  index: number;
  confidentialLabel: string;
  viewCodeLabel: string;
  viewLiveLabel: string;
}): ReactNode {
  const Icon = PROJECT_ICONS[project.id] ?? Sparkles;

  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <article className="project-card flex flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
        <header className="flex items-center justify-between px-1 pt-2">
          <div className="flex items-center gap-2.5">
            <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
              <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase text-foreground/80">
              {project.tag}
            </span>
          </div>

          {project.confidential ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
              <Lock className="h-3 w-3" aria-hidden="true" />
              {confidentialLabel}
            </span>
          ) : (
            <div className="flex items-center gap-1.5">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${viewCodeLabel} (${project.title})`}
                  title={viewCodeLabel}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : null}
              {project.previewUrl ? (
                <a
                  href={project.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${viewLiveLabel} (${project.title})`}
                  title={viewLiveLabel}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          )}
        </header>

        <div
          className="project-card__image ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1"
          style={{ aspectRatio: project.imageRatio }}
        >
          <div className="project-card__image-inner">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
              className="object-cover"
              priority={index < 2}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 px-1 pb-1">
          <h2 className="text-[19px] font-medium leading-[1.25] tracking-tight text-foreground sm:text-[21px]">
            {project.title}
          </h2>
          <p className="text-[14px] leading-relaxed tracking-tight text-foreground/70 sm:text-[15px]">
            {project.description}
          </p>
        </div>

        <p className="px-1 pb-2 text-[12px] tracking-tight text-foreground/50">
          {project.meta}
        </p>
      </article>
    </FadeIn>
  );
}
