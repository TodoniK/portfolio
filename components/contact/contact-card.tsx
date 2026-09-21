"use client";

import { Mail, Shield, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ContactCardCtas } from "./contact-card-ctas";
import { FadeIn } from "@/components/ui/motion-primitives";
import { ShaderFlow } from "../shaders/shader-flow";
import { useLanguage } from "@/lib/i18n";

const CARD_FADE_MASK =
  "radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%)";

export function ContactCard(): ReactNode {
  const { t } = useLanguage();

  return (
    <section className="mx-auto my-12 w-full max-w-275 px-6 sm:my-20 sm:px-10">
      <FadeIn>
        <div className="relative w-full overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
          <div className="relative w-full overflow-hidden rounded-[1.6rem]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-25"
              style={{
                WebkitMaskImage: CARD_FADE_MASK,
                maskImage: CARD_FADE_MASK,
              }}
            >
              <ShaderFlow scale={3} brightness={3} />
            </div>

            <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-7 md:grid-cols-[1.2fr_1fr] md:items-stretch md:gap-6 md:p-6">
              <div className="flex flex-col gap-5">
                <h2 className="font-serif text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem] lg:text-[3.25rem]">
                  {t.contact.headline}
                </h2>
                <p className="max-w-[32ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px] mb-6">
                  {t.contact.description}
                </p>
                <ContactCardCtas />
              </div>

              <div className="border-foreground/8 flex flex-col items-center justify-center gap-6 rounded-[1.1rem] border bg-background p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-center gap-3 opacity-85">
                  <SocialIcon
                    href="mailto:jules.royet.pc@gmail.com"
                    label="Email"
                    lucideIcon={Mail}
                  />
                  <SocialIcon
                    href="https://www.linkedin.com/in/jules-royet"
                    label="LinkedIn"
                    imageSrc="/linkedin.svg"
                  />
                  <SocialIcon
                    href="https://github.com/todonik"
                    label="GitHub"
                    imageSrc="https://cdn.simpleicons.org/github"
                  />
                  <SocialIcon
                    href="https://www.root-me.org/ROYET?lang=fr#6d64628f42c7d83514cfbbcf25d78e75"
                    label="Root-Me (Cybersecurity)"
                    lucideIcon={Shield}
                  />
                  <SocialIcon
                    href="/resumes.pdf"
                    label="Resume / CV"
                    lucideIcon={FileText}
                  />
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-[13px] tracking-tight text-foreground/75 font-medium">
                    {t.contact.builtWith}
                  </p>
                  <p className="text-[12px] tracking-tight text-foreground/50">
                    {t.contact.rights}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  lucideIcon: LucideIcon,
  imageSrc,
}: {
  href: string;
  label: string;
  lucideIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  imageSrc?: string;
}): ReactNode {
  const isExternal = href.startsWith("http") || href.endsWith(".pdf");
  const props = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  if (isExternal) {
    return (
      <a
        href={href}
        aria-label={label}
        title={label}
        className="border-foreground/8 hover:border-foreground/20 focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-background text-foreground/75 transition-colors hover:text-foreground hover:bg-foreground/5"
        {...props}
      >
        {LucideIcon ? (
          <LucideIcon className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt=""
            width={16}
            height={16}
            aria-hidden="true"
            unoptimized={imageSrc.startsWith("https://cdn.simpleicons.org")}
            className="max-h-[16px] max-w-[16px] object-contain dark:invert"
          />
        ) : null}
      </a>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="border-foreground/8 hover:border-foreground/20 focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-background text-foreground/75 transition-colors hover:text-foreground hover:bg-foreground/5"
      {...props}
    >
      {LucideIcon ? (
        <LucideIcon className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          width={16}
          height={16}
          aria-hidden="true"
          unoptimized={imageSrc.startsWith("https://cdn.simpleicons.org")}
          className="max-h-[16px] max-w-[16px] object-contain dark:invert"
        />
      ) : null}
    </Link>
  );
}
