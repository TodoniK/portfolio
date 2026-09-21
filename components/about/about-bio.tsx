"use client";

import type { ReactNode } from "react";
import { FadeIn } from "@/components/ui/motion-primitives";
import { useLanguage } from "@/lib/i18n";

export function AboutBio(): ReactNode {
  const { locale } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-160 px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
      <FadeIn delay={0.3}>
        <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
          <h1 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
            {locale === "fr" ? (
              <>
                Bonjour ! Je suis{" "}
                <span className="border-b border-foreground/30 pb-0.5">
                  Jules Royet
                </span>
                .
              </>
            ) : (
              <>
                Hello! I&rsquo;m{" "}
                <span className="border-b border-foreground/30 pb-0.5">
                  Jules Royet
                </span>
                .
              </>
            )}
          </h1>
          <div className="mt-8 space-y-6 text-[16px] leading-[1.75] tracking-tight text-foreground/75 sm:text-[18px]">
            <p>
              {locale === "fr" ? (
                <>
                  <strong className="font-semibold text-foreground">
                    Architecte Cloud & DevOps
                  </strong>{" "}
                  et{" "}
                  <strong className="font-semibold text-foreground">
                    Ingénieur Logiciel
                  </strong>{" "}
                  diplômé de l&apos;
                  <strong className="font-semibold text-foreground">
                    ENSEIRB-MATMECA
                  </strong>
                  , passionné par la conception de plateformes cloud fiables,
                  l&apos;automatisation de workflows et le développement
                  logiciel moderne. Avec plus de 3 ans d&apos;expérience, j&apos;unis
                  architecture système, automatisation et développement full-stack.
                </>
              ) : (
                <>
                  A{" "}
                  <strong className="font-semibold text-foreground">
                    Cloud & DevOps Architect
                  </strong>{" "}
                  and{" "}
                  <strong className="font-semibold text-foreground">
                    Software Engineer
                  </strong>{" "}
                  graduated from{" "}
                  <strong className="font-semibold text-foreground">
                    ENSEIRB-MATMECA
                  </strong>
                  , passionate about building reliable cloud platforms,
                  automated workflows, and modern web applications. With more
                  than 3 years of hands-on experience, I bridge system
                  architecture, automation, and full-stack development.
                </>
              )}
            </p>
            <p>
              {locale === "fr" ? (
                <>
                  Actuellement chez{" "}
                  <strong className="font-semibold text-foreground">
                    Orange
                  </strong>{" "}
                  en tant qu&apos;Architecte Cloud & DevOps, je conçois des
                  architectures résilientes, optimise les chaînes de déploiement
                  et promeut l&apos;écoconception logicielle. J&apos;explore également la{" "}
                  <strong className="font-semibold text-foreground">
                    cybersécurité
                  </strong>
                  , avec un intérêt marqué pour les opérations SOC et le
                  hacking éthique sur Root-Me.
                </>
              ) : (
                <>
                  Currently working at{" "}
                  <strong className="font-semibold text-foreground">
                    Orange
                  </strong>{" "}
                  as a Cloud & DevOps Architect, I design scalable cloud
                  architectures, optimize deployment pipelines, and promote green
                  code practices. I also explore{" "}
                  <strong className="font-semibold text-foreground">
                    cybersecurity
                  </strong>
                  , with a strong interest in SOC operations, penetration
                  testing, and ethical hacking on Root-Me.
                </>
              )}
            </p>
            <p>
              {locale === "fr" ? (
                <>
                  En dehors de l&apos;ingénierie cloud, je reste à l&apos;affût des
                  dernières avancées technologiques et de sécurité,
                  j&apos;expérimente avec le frontend créatif et j&apos;aime partager mes
                  connaissances avec les équipes.
                </>
              ) : (
                <>
                  Outside of cloud engineering, I follow the latest tech and
                  security breakthroughs, experiment with creative frontend
                  technologies, and enjoy sharing knowledge with engineering
                  teams.
                </>
              )}
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
