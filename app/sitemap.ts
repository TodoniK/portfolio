import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";
import { PROJECT_ARTICLES } from "@/lib/projects-data";
import { localePath } from "@/lib/locale";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about", "/projects", "/contact", "/expertises/cloud-devops", "/expertises/developpement-logiciel", "/expertises/systemes-ia", ...Object.keys(PROJECT_ARTICLES).map(slug => `/projects/${slug}`)];
  return paths.flatMap(path => (["fr", "en"] as const).map(locale => ({
    url: siteConfig.url + localePath(path, locale),
    alternates: { languages: { fr: siteConfig.url + path, en: siteConfig.url + localePath(path, "en"), "x-default": siteConfig.url + path } },
  })));
}
