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
import { getTechChip } from "@/lib/tech-stack";

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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 items-stretch">
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
  const techList =
    project.stack && project.stack.length > 0
      ? project.stack
      : project.meta
          .split(/,|and|et/i)
          .map((s) => s.trim())
          .filter(Boolean);

  const chips = techList.map(getTechChip);

  return (
    <FadeIn
      delay={Math.min(index * 0.05, 0.25)}
      className="h-full flex flex-col"
    >
      <article className="project-card group relative flex h-full flex-col justify-between rounded-3xl border border-foreground/8 bg-background p-3.5 sm:p-4 hover:border-foreground/20 transition-all duration-300">
        <div className="flex flex-col gap-3.5">
          <header className="flex items-center justify-between px-1 pt-1">
            <div className="flex items-center gap-2.5">
              <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background shadow-xs">
                <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase text-foreground/80">
                {project.tag}
              </span>
            </div>

            <div className="relative z-20 flex items-center gap-1.5">
              {project.confidential ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                  <Lock className="h-3 w-3" aria-hidden="true" />
                  {confidentialLabel}
                </span>
              ) : (
                <>
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${viewCodeLabel} (${project.title})`}
                      title={viewCodeLabel}
                      className="focus-ring inline-flex h-7 w-7 items-center justify-center rounded-md text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : null}
                  {project.previewUrl ? (
                    <a
                      href={project.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${viewLiveLabel} (${project.title})`}
                      title={viewLiveLabel}
                      className="focus-ring inline-flex h-7 w-7 items-center justify-center rounded-md text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : null}
                </>
              )}
            </div>
          </header>

          <Link
            href={`/projects/${project.id}`}
            className="group/link block focus:outline-none"
            tabIndex={0}
          >
            <div className="project-card__image ring-foreground/5 relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-foreground/5 ring-1">
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

            <div className="mt-3.5 flex flex-col gap-1.5 px-1">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-[19px] font-medium leading-[1.25] tracking-tight text-foreground sm:text-[21px] group-hover/link:text-foreground/90 transition-colors">
                  {project.title}
                </h2>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-foreground/30 transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:text-foreground"
                  aria-hidden="true"
                />
              </div>
              <p className="text-[14px] leading-relaxed tracking-tight text-foreground/70 sm:text-[15px]">
                {project.description}
              </p>
            </div>
          </Link>
        </div>

        {/* Tech stack chips - rounded, colored, with official logos */}
        <div className="mt-4 pt-3 border-t border-foreground/6 flex flex-wrap items-center gap-1.5 px-1">
          {chips.map((chip) => (
            <span
              key={`${project.id}-${chip.name}`}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight shadow-2xs select-none"
              style={{
                backgroundColor: chip.bg,
                color: chip.fg,
              }}
            >
              <span
                className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/95 p-0.5 shadow-2xs"
                aria-hidden="true"
              >
                <Image
                  src={chip.iconUrl ?? `https://cdn.simpleicons.org/${chip.slug}`}
                  alt=""
                  width={12}
                  height={12}
                  unoptimized
                  className="h-3 w-3 object-contain"
                />
              </span>
              <span>{chip.name}</span>
            </span>
          ))}
        </div>
      </article>
    </FadeIn>
  );
}
