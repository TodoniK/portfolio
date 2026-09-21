export type TechChip = {
  name: string;
  slug?: string;
  iconUrl?: string;
  bg: string;
  fg: string;
};

export const TECH_REGISTRY: Record<string, TechChip> = {
  Docker: { name: "Docker", slug: "docker", bg: "#1362b8", fg: "#ffffff" },
  Kubernetes: { name: "Kubernetes", slug: "kubernetes", bg: "#2557c7", fg: "#ffffff" },
  Azure: { name: "Azure", iconUrl: "/assets/icons/azure.svg", bg: "#0062a8", fg: "#ffffff" },
  AWS: { name: "AWS", iconUrl: "/assets/icons/aws.svg", bg: "#232F3E", fg: "#ffffff" },
  "Oracle Cloud": { name: "Oracle Cloud", iconUrl: "/assets/icons/oracle.svg", bg: "#b83824", fg: "#ffffff" },
  Dokploy: { name: "Dokploy", iconUrl: "/assets/icons/dokploy.svg", bg: "#0f172a", fg: "#ffffff" },
  Cloudflare: { name: "Cloudflare", iconUrl: "/assets/icons/cloudflare.svg", bg: "#9a3412", fg: "#ffffff" },
  "Hermes Agent": { name: "Hermes Agent", iconUrl: "/assets/icons/hermes.svg", bg: "#4338ca", fg: "#ffffff" },
  Terraform: { name: "Terraform", slug: "terraform", bg: "#6d28d9", fg: "#ffffff" },
  Linux: { name: "Linux", slug: "linux", bg: "#FCC624", fg: "#000000" },
  "Spring Boot": { name: "Spring Boot", slug: "springboot", bg: "#2e7d32", fg: "#ffffff" },
  SpringBoot: { name: "Spring Boot", slug: "springboot", bg: "#2e7d32", fg: "#ffffff" },
  Kotlin: { name: "Kotlin", slug: "kotlin", bg: "#6935f0", fg: "#ffffff" },
  TypeScript: { name: "TypeScript", slug: "typescript", bg: "#1d5b9f", fg: "#ffffff" },
  JavaScript: { name: "JavaScript", slug: "javascript", bg: "#F7DF1E", fg: "#000000" },
  React: { name: "React", slug: "react", bg: "#1e293b", fg: "#38bdf8" },
  "Next.js": { name: "Next.js", slug: "nextdotjs", bg: "#111111", fg: "#ffffff" },
  Python: { name: "Python", slug: "python", bg: "#20547e", fg: "#ffffff" },
  PostgreSQL: { name: "PostgreSQL", slug: "postgresql", bg: "#22459c", fg: "#ffffff" },
  MongoDB: { name: "MongoDB", slug: "mongodb", bg: "#15803d", fg: "#ffffff" },
  Redis: { name: "Redis", slug: "redis", bg: "#b91c1c", fg: "#ffffff" },
  Traefik: { name: "Traefik", slug: "traefikproxy", bg: "#0e7490", fg: "#ffffff" },
  Svelte: { name: "Svelte", slug: "svelte", bg: "#c2410c", fg: "#ffffff" },
  "Vue.js": { name: "Vue.js", slug: "vuedotjs", bg: "#15803d", fg: "#ffffff" },
  "Node.js": { name: "Node.js", slug: "nodedotjs", bg: "#15803d", fg: "#ffffff" },
  Symfony: { name: "Symfony", slug: "symfony", bg: "#000000", fg: "#ffffff" },
  Rust: { name: "Rust", slug: "rust", bg: "#000000", fg: "#ffffff" },
  Android: { name: "Android", slug: "android", bg: "#3DDC84", fg: "#000000" },
  OpenCode: { name: "OpenCode", iconUrl: "/icon.svg", bg: "#0066FF", fg: "#ffffff" },
  "Claude Code": { name: "Claude Code", slug: "anthropic", bg: "#b45309", fg: "#ffffff" },
  GitLab: { name: "GitLab", slug: "gitlab", bg: "#c2410c", fg: "#ffffff" },
  GitHub: { name: "GitHub", slug: "github", bg: "#181717", fg: "#ffffff" },
  SQLite: { name: "SQLite", slug: "sqlite", bg: "#003B57", fg: "#ffffff" },
  "Tailwind CSS": { name: "Tailwind CSS", slug: "tailwindcss", bg: "#06B6D4", fg: "#0a0a0a" },
  PHP: { name: "PHP", slug: "php", bg: "#525794", fg: "#ffffff" },
  MySQL: { name: "MySQL", slug: "mysql", bg: "#1d5b9f", fg: "#ffffff" },
  "Socket.io": { name: "Socket.io", slug: "socketdotio", bg: "#010101", fg: "#ffffff" },
  "Express.js": { name: "Express.js", slug: "express", bg: "#000000", fg: "#ffffff" },
  Java: { name: "Java", slug: "openjdk", bg: "#c2410c", fg: "#ffffff" },
};

export function getTechChip(name: string): TechChip {
  const clean = name.trim();
  if (TECH_REGISTRY[clean]) {
    return TECH_REGISTRY[clean];
  }
  // Fallback
  return {
    name: clean,
    slug: clean.toLowerCase().replace(/[^a-z0-9]/g, ""),
    bg: "#27272a",
    fg: "#ffffff",
  };
}
