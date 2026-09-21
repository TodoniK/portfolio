import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

const PROJECT_SLUGS = [
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
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}`,
          fr: `${baseUrl}`,
        },
      },
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/projects`,
          fr: `${baseUrl}/projects`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/about`,
          fr: `${baseUrl}/about`,
        },
      },
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECT_SLUGS.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: {
      languages: {
        en: `${baseUrl}/projects/${slug}`,
        fr: `${baseUrl}/projects/${slug}`,
      },
    },
  }));

  return [...staticRoutes, ...projectRoutes];
}
