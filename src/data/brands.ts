// Official logos (src/assets/brands, sources in sources.json) and which ones illustrate each project.
const files = import.meta.glob<string>("../assets/brands/*.svg", { eager: true, query: "?no-inline", import: "default" });

export const BRAND_LABEL = {
  android: "Android", astro: "Astro", aws: "AWS", azure: "Azure", claude: "Claude", cloudflare: "Cloudflare",
  docker: "Docker", dokploy: "Dokploy", express: "Express", github: "GitHub", gitlab: "GitLab CI", hermes: "Hermes Agent",
  java: "Java", kotlin: "Kotlin", kubernetes: "Kubernetes", linux: "Linux", mongodb: "MongoDB", mysql: "MySQL",
  nodedotjs: "Node.js", opencode: "OpenCode", oracle: "Oracle Cloud", php: "PHP", postgresql: "PostgreSQL",
  python: "Python", react: "React", redis: "Redis", rust: "Rust", socketdotio: "Socket.io", springboot: "Spring Boot",
  sqlite: "SQLite", svelte: "Svelte", symfony: "Symfony", terraform: "Terraform", traefikproxy: "Traefik",
  typescript: "TypeScript", vuedotjs: "Vue.js",
} as const;
export type Brand = keyof typeof BRAND_LABEL;
/** Logos drawn in white upstream: they sit on a dark tile instead of the light one. */
const DARK_TILE = new Set<Brand>(["dokploy"]);

export function brand(id: Brand) {
  const src = files[`../assets/brands/${id}.svg`];
  if (!src) throw new Error(`Missing logo src/assets/brands/${id}.svg`);
  return { id, name: BRAND_LABEL[id], src, dark: DARK_TILE.has(id) };
}

/** Short display name and tools shown on each project thumbnail. */
export const PROJECT_VISUAL: Record<string, { short: string; brands: Brand[] }> = {
  hermes: { short: "Hermes", brands: ["hermes", "oracle", "dokploy", "docker", "traefikproxy"] },
  omniroute: { short: "Omniroute", brands: ["nodedotjs", "redis", "cloudflare", "traefikproxy", "dokploy"] },
  "m2c-flows": { short: "M2C Flows", brands: ["azure", "gitlab", "typescript", "docker"] },
  "opencode-harness": { short: "Agentic Harness", brands: ["opencode", "claude", "typescript", "rust"] },
  shopeen: { short: "Shopeen", brands: ["springboot", "kotlin", "svelte", "mongodb", "kubernetes"] },
  stakeirb: { short: "Stak'eirb", brands: ["nodedotjs", "vuedotjs", "socketdotio", "sqlite", "express"] },
  iplocator: { short: "IP Locator", brands: ["nodedotjs", "vuedotjs", "mongodb", "express", "docker"] },
  automatisms: { short: "AutomatiSMS", brands: ["symfony", "php", "mysql", "linux", "docker"] },
  mijotons: { short: "Mijotons", brands: ["android", "java", "mysql", "linux"] },
  portfolio: { short: "Portfolio", brands: ["astro", "typescript", "cloudflare", "github"] },
};

export function visual(id: string) {
  const v = PROJECT_VISUAL[id];
  if (!v) throw new Error(`Missing thumbnail data for project "${id}" in src/data/brands.ts`);
  return { short: v.short, brands: v.brands.map(brand) };
}
