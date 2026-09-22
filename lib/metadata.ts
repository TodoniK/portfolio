import type { Metadata } from "next";
import { localePath, type Locale } from "./locale";

export const siteConfig = {
  name: "Jules Royet",
  title: "Jules Royet | Cloud & DevOps Architect",
  description:
    "Jules Royet, architecte Cloud et DevOps chez Orange. Ingénierie logicielle, infrastructures Azure et agents IA. Parcours et projets entre Bordeaux et Nice.",
  url: "https://www.julesroyet.dev",
  ogImage: "/og-image.webp",
  creator: "@julesroyet",
  authors: [
    {
      name: "Jules Royet",
      url: "https://www.julesroyet.dev",
    },
  ],
  keywords: [
    "Jules Royet",
    "Cloud Architect",
    "DevOps Architect",
    "DevOps Engineer",
    "Cloud Computing",
    "Infrastructure as Code",
    "Terraform",
    "Kubernetes",
    "Docker",
    "CI/CD",
    "Autonomous AI Agents",
    "Hermes Agent",
    "Omniroute",
    "OpenCode",
    "Claude Code",
    "Azure",
    "Java",
    "Spring Boot",
    "Kotlin",
    "TypeScript",
    "React",
    "Next.js",
    "Cybersecurity",
    "ENSEIRB-MATMECA",
    "Orange",
    "Bordeaux",
    "Nice",
  ],
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      fr: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.png",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/site.webmanifest",
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
  locale = "fr",
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  locale?: Locale;
}): Metadata {
  const canonical = localePath(path, locale);
  const url = `${siteConfig.url}${canonical}`;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        fr: path,
        en: localePath(path, "en"),
        "x-default": path,
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: [locale === "fr" ? "en_US" : "fr_FR"],
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.title,
      description: description ?? siteConfig.description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title ?? siteConfig.name,
        },
      ],
    },
    twitter: {
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.title,
      description: description ?? siteConfig.description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
