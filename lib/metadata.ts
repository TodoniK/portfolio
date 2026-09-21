import type { Metadata } from "next";

export const siteConfig = {
  name: "Jules Royet",
  title: "Jules Royet | Cloud & DevOps Architect",
  description:
    "Cloud & DevOps Architect and Software Engineer. Designing resilient cloud platforms, automated CI/CD pipelines, and high-performance digital systems.",
  url: "https://julesroyet.dev",
  ogImage: "/og-image.webp",
  creator: "@julesroyet",
  authors: [
    {
      name: "Jules Royet",
      url: "https://julesroyet.dev",
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
      "en-US": "/",
      "fr-FR": "/",
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
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        "en-US": path,
        "fr-FR": path,
      },
    },
    openGraph: {
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
