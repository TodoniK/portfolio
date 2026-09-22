import { Nav } from "@/components/layout/nav";
import { PageBackdrop } from "@/components/layout/page-backdrop";
import { Providers } from "@/components/layout/providers";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { siteConfig } from "@/lib/metadata";
import { AnalyticsProvider } from "@/components/layout/analytics-provider";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/locale";
import "@/app/globals.css";
import { ExpertiseLinks } from "@/components/expertise-links";
import { ClickSpark } from "@/components/ui/click-spark";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
  preload: false,
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "500",
  display: "optional",
});

export function SiteLayout({
  children,
  locale,
}: Readonly<{
  children: ReactNode;
  locale: Locale;
}>): ReactNode {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: "Jules Royet",
        jobTitle: "Cloud & DevOps Architect and AI Systems Engineer",
        description:
          "Architecte Cloud & DevOps chez Orange et Ingénieur Logiciel diplômé de l'ENSEIRB-MATMECA. Spécialiste des architectures cloud résilientes, des agents autonomes et du DevSecOps.",
        url: siteConfig.url,
        image: `${siteConfig.url}/jules-base.webp`,
        email: "jules.royet.pc@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bordeaux",
          addressRegion: "Nouvelle-Aquitaine",
          addressCountry: "FR",
        },
        sameAs: [
          "https://www.linkedin.com/in/jules-royet",
          "https://github.com/todonik",
          "https://www.root-me.org/ROYET",
        ],
        worksFor: {
          "@type": "Organization",
          name: "Orange",
          url: "https://www.orange.com/",
        },
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "ENSEIRB-MATMECA",
            url: "https://www.enseirb-matmeca.fr/",
          },
          {
            "@type": "CollegeOrUniversity",
            name: "IUT de Bayonne et du Pays Basque",
            url: "https://www.iutbayonne.univ-pau.fr/",
          },
        ],
        knowsAbout: [
          "Cloud Architecture",
          "Microsoft Azure",
          "DevOps",
          "CI/CD",
          "Autonomous AI Agents",
          "Hermes Agent",
          "Omniroute",
          "Kubernetes",
          "Docker",
          "Terraform",
          "Java",
          "Spring Boot",
          "Kotlin",
          "TypeScript",
          "Next.js",
          "Cybersecurity",
          "DevSecOps",
          "FinOps",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        inLanguage: ["fr", "en"],
        name: "Jules Royet Portfolio",
        publisher: {
          "@id": `${siteConfig.url}/#person`,
        },
      },
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      {/* This component is the document shell used by both root layouts. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <meta name="geo.region" content="FR-NAQ" />
        <meta name="geo.placename" content="Bordeaux" />
        <meta name="geo.position" content="44.8378;-0.5792" />
        <meta name="ICBM" content="44.8378, -0.5792" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <Providers locale={locale}>
          <div className="site-frame site-frame--top" aria-hidden="true" />
          <div className="site-frame site-frame--left" aria-hidden="true" />
          <div className="site-frame site-frame--right" aria-hidden="true" />
          <svg
            className="site-corner site-corner--top-left"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
              fill="currentColor"
            />
          </svg>
          <svg
            className="site-corner site-corner--top-right"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
              fill="currentColor"
            />
          </svg>
          <SkipToContent />
          <PageBackdrop />
          <Nav />
          {children}
          <ExpertiseLinks />
          <ClickSpark />
          <AnalyticsProvider />
        </Providers>
      </body>
    </html>
  );
}
