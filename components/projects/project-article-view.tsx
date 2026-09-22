"use client";

import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Lock,
  Calendar,
  User,
  Server,
  Building,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { LocalizedLink as Link } from "@/components/ui/localized-link";
import type { ReactNode } from "react";
import { FadeIn } from "@/components/ui/motion-primitives";
import { useLanguage } from "@/lib/i18n";
import { getTechChip } from "@/lib/tech-stack";
import { PROJECT_ARTICLES } from "@/lib/projects-data";
import { ContactButton } from "@/components/contact/contact-button";

export function ProjectArticleView({ slug }: { slug: string }): ReactNode {
  const { t, locale } = useLanguage();

  const article = PROJECT_ARTICLES[slug];
  const projectIndex = t.projects.items.findIndex((p) => p.id === slug);
  const project = t.projects.items[projectIndex];

  if (!article || !project) {
    return null;
  }

  const prevProject =
    projectIndex > 0 ? t.projects.items[projectIndex - 1] : null;
  const nextProject =
    projectIndex < t.projects.items.length - 1
      ? t.projects.items[projectIndex + 1]
      : null;

  const techList =
    project.stack && project.stack.length > 0
      ? project.stack
      : project.meta
          .split(/,|and|et/i)
          .map((s) => s.trim())
          .filter(Boolean);

  const chips = techList.map(getTechChip);

  const loc = locale === "fr" ? "fr" : "en";

  return (
    <article className="relative mx-auto w-full max-w-275 px-6 pt-24 pb-20 sm:px-10 sm:pt-28">
      {/* Back Link */}
      <FadeIn delay={0.05}>
        <div className="mb-8">
          <Link
            href="/projects"
            className="group focus-ring inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background px-4 py-1.5 text-sm font-medium text-foreground/75 transition-colors hover:border-foreground/20 hover:text-foreground hover:bg-foreground/5 shadow-2xs"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            <span>{locale === "fr" ? "Retour aux projets" : "Back to projects"}</span>
          </Link>
        </div>
      </FadeIn>

      {/* Article Header */}
      <FadeIn delay={0.1}>
        <header className="flex flex-col gap-5 border-b border-foreground/10 pb-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-foreground/5 border border-foreground/10 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-foreground/85">
              {project.tag}
            </span>
            {project.confidential ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                {t.projects.confidential}
              </span>
            ) : null}
          </div>

          <h1 className="font-serif text-[2.25rem] font-medium leading-[1.1] tracking-tight text-foreground sm:text-[3rem] lg:text-[3.5rem]">
            {article.headline[loc]}
          </h1>

          <p className="max-w-[70ch] text-[18px] leading-relaxed tracking-tight text-foreground/75 sm:text-[20px]">
            {article.summary[loc]}
          </p>

          {/* Quick Info Grid */}
          <div className="mt-4 grid grid-cols-2 gap-4 rounded-2xl border border-foreground/8 bg-foreground/2 dark:bg-foreground/5 p-4 sm:grid-cols-4 sm:p-5">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
                <User className="h-3.5 w-3.5" aria-hidden="true" />
                {locale === "fr" ? "Rôle" : "Role"}
              </span>
              <span className="text-[13px] font-medium text-foreground sm:text-[14px]">
                {article.role[loc]}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {locale === "fr" ? "Période" : "Timeline"}
              </span>
              <span className="text-[13px] font-medium text-foreground sm:text-[14px]">
                {article.timeline[loc]}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
                <Building className="h-3.5 w-3.5" aria-hidden="true" />
                {locale === "fr" ? "Contexte" : "Context"}
              </span>
              <span className="text-[13px] font-medium text-foreground sm:text-[14px]">
                {article.clientOrContext[loc]}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
                <Server className="h-3.5 w-3.5" aria-hidden="true" />
                {locale === "fr" ? "Plateforme" : "Infra"}
              </span>
              <span className="text-[13px] font-medium text-foreground sm:text-[14px] truncate" title={article.infrastructure[loc]}>
                {article.infrastructure[loc]}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {project.previewUrl ? (
              <a
                href={project.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm hover:opacity-95 transition-opacity"
              >
                <span>{t.projects.viewLive}</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-foreground/5 transition-colors shadow-2xs"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>{t.projects.viewCode}</span>
              </a>
            ) : null}
          </div>
        </header>
      </FadeIn>

      {/* Featured Visual */}
      <FadeIn delay={0.15}>
        <div className="my-10 overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 shadow-sm">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </FadeIn>

      {/* Article Body */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px] lg:gap-14">
        {/* Main Content */}
        <div className="flex flex-col gap-10">
          <FadeIn delay={0.2}>
            <section className="flex flex-col gap-4">
              <h2 className="font-serif text-[1.65rem] font-medium tracking-tight text-foreground sm:text-[1.85rem]">
                {article.problemTitle[loc]}
              </h2>
              <p className="text-[16px] leading-relaxed text-foreground/80 sm:text-[17px]">
                {article.problemBody[loc]}
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={0.25}>
            <section className="flex flex-col gap-4">
              <h2 className="font-serif text-[1.65rem] font-medium tracking-tight text-foreground sm:text-[1.85rem]">
                {article.architectureTitle[loc]}
              </h2>
              <p className="text-[16px] leading-relaxed text-foreground/80 sm:text-[17px]">
                {article.architectureBody[loc]}
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={0.3}>
            <section className="flex flex-col gap-4">
              <h2 className="font-serif text-[1.65rem] font-medium tracking-tight text-foreground sm:text-[1.85rem]">
                {article.challengesTitle[loc]}
              </h2>
              <ul className="flex flex-col gap-3">
                {article.challenges.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-foreground/6 bg-background p-3.5 shadow-2xs"
                  >
                    <CheckCircle2
                      className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-[15px] leading-relaxed text-foreground/80">
                      {c[loc]}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>

          {/* Metrics section */}
          <FadeIn delay={0.35}>
            <section className="flex flex-col gap-4">
              <h2 className="font-serif text-[1.65rem] font-medium tracking-tight text-foreground sm:text-[1.85rem]">
                {article.metricsTitle[loc]}
              </h2>
              <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
                {article.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between rounded-2xl border border-foreground/8 bg-foreground/2 dark:bg-foreground/5 p-4"
                  >
                    <span className="text-[12px] font-medium text-foreground/60 leading-tight">
                      {m.label[loc]}
                    </span>
                    <span className="mt-3 font-mono text-[20px] font-bold text-foreground">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          <FadeIn delay={0.25}>
            <div className="sticky top-28 flex flex-col gap-6 rounded-3xl border border-foreground/10 bg-background p-6 shadow-xs">
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                  {locale === "fr" ? "Stack technique" : "Tech Stack"}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  {chips.map((chip) => (
                    <span
                      key={chip.name}
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-tight shadow-2xs select-none"
                      style={{
                        backgroundColor: chip.bg,
                        color: chip.fg,
                      }}
                    >
                      {chip.iconUrl && <span
                        className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/95 p-0.5 shadow-2xs"
                        aria-hidden="true"
                      >
                        <Image
                          src={chip.iconUrl}
                          alt=""
                          width={12}
                          height={12}
                          unoptimized
                          className="h-3 w-3 object-contain"
                        />
                      </span>}
                      <span>{chip.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-foreground/8 pt-5 flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                  {locale === "fr" ? "Échanger sur ce projet" : "Discuss this work"}
                </h3>
                <p className="text-[13px] text-foreground/70 leading-relaxed">
                  {locale === "fr"
                    ? "Une question d'architecture ou un défi technique similaire ? Échangeons directement."
                    : "Have an architectural question or similar engineering challenge? Reach out directly."}
                </p>
                <div className="mt-1">
                  <ContactButton />
                </div>
              </div>
            </div>
          </FadeIn>
        </aside>
      </div>

      {/* Prev / Next Pagination */}
      <FadeIn delay={0.4}>
        <nav
          aria-label="Projects navigation"
          className="mt-16 flex flex-col gap-4 border-t border-foreground/10 pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.id}`}
              className="group flex flex-col gap-1 text-left focus-ring rounded-2xl p-3 hover:bg-foreground/5 transition-colors"
            >
              <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-foreground/50">
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                {locale === "fr" ? "Projet précédent" : "Previous project"}
              </span>
              <span className="text-[16px] font-medium text-foreground">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.id}`}
              className="group flex flex-col gap-1 text-right focus-ring rounded-2xl p-3 hover:bg-foreground/5 transition-colors"
            >
              <span className="flex items-center justify-end gap-1 text-xs font-semibold uppercase tracking-wider text-foreground/50">
                {locale === "fr" ? "Projet suivant" : "Next project"}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-[16px] font-medium text-foreground">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </FadeIn>
    </article>
  );
}
