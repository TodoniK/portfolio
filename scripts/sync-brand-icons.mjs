// Run explicitly to refresh first-party brand assets. Never runs during builds.
import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const raw = (repo, path) => `https://raw.githubusercontent.com/${repo}/HEAD/${path}`;
const sources = {
  rootme: "https://www.root-me.org/IMG/logo/siteon0.svg",
  opencode: raw("anomalyco/opencode", "packages/console/app/src/asset/brand/opencode-logo-light-square.svg"),
  hermes: raw("NousResearch/hermes-agent", "website/static/img/favicon.svg"),
  docker: raw("docker/docs", "assets/icons/Whale.svg"),
  kubernetes: raw("kubernetes/kubernetes", "logo/logo.svg"),
  typescript: raw("microsoft/TypeScript-Website", "packages/typescriptlang-org/static/branding/ts-logo-128.svg"),
  nodedotjs: raw("nodejs/nodejs.org", "apps/site/public/static/logos/nodejsHex.svg"),
  svelte: raw("sveltejs/branding", "svelte-logo.svg"),
  vuedotjs: "https://vuejs.org/logo.svg",
  dokploy: "https://dokploy.com/icon.svg",
  kotlin: "https://kotlinlang.org/images/favicon/favicon.svg",
  symfony: "https://symfony.com/favicons/favicon.svg",
  traefikproxy: "https://traefik.io/favicon.svg",
  rust: "https://rust-lang.org/static/images/rust-logo-blk.svg",
  github: "https://github.githubassets.com/favicons/favicon.svg",
  tailwindcss: "https://tailwindcss.com/favicons/safari-pinned-tab.svg",
  socketdotio: "https://socket.io/images/logo.svg",
  php: "https://www.php.net/favicon.svg?v=2",
  express: "https://expressjs.com/favicon.svg",
  android: "https://developer.android.com/static/images/logos/android.svg",
  react: "https://react.dev/safari-pinned-tab.svg",
  nextdotjs: "https://nextjs.org/_next/static/immutable/media/nextjs-logotype-light.00-_80jv8_dct.svg",
  springboot: "https://spring.io/img/projects/spring-boot.svg",
  python: "https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg",
  postgresql: "https://wiki.postgresql.org/images/a/a4/PostgreSQL_logo.3colors.svg",
  cloudflare: "https://www.cloudflare.com/logo.svg",
  sqlite: "https://sqlite.org/images/sqlite370_banner.svg",
  mongodb: "https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg",
  redis: raw("redis/redis-website", "assets/icons/logo.svg"),
  terraform: raw("hashicorp/design-system", "packages/flight-icons/svg-original/terraform-color-24.svg"),
  gitlab: "https://about.gitlab.com/images/press/gitlab-logo-100-rgb.svg",
  claude: "https://mintcdn.com/claude-code/c5r9_6tjPMzFdDDT/logo/light.svg",
  aws: raw("aws/aws-toolkit-vscode", "packages/core/resources/aws-logo.svg"),
  azure: raw("microsoft/azuredatastudio", "extensions/azurecore/resources/azure.svg"),
  oracle: raw("oracle/oci-designer-toolkit", "okitclassic/okitserver/static/svg/oracle.svg"),
  javascript: "https://raw.githubusercontent.com/voodootikigod/logo.js/1544bdeed6d618a6cfe4f0650d04ab8d9cfa76d9/js.svg",
  // Devicon distributes the recognizable brand artwork, not an issuer-owned repository.
  // Upstream references: dev.java, mysql.com/about/legal/logos.html, kernel.org.
  java: raw("devicons/devicon", "icons/java/java-original.svg"),
  mysql: raw("devicons/devicon", "icons/mysql/mysql-original.svg"),
  linux: raw("devicons/devicon", "icons/linux/linux-original.svg"),
};

await mkdir(new URL("../public/assets/brands/", import.meta.url), { recursive: true });
const manifest = {};
for (const [name, source] of Object.entries(sources)) {
  const response = await fetch(source, { signal: AbortSignal.timeout(30000) });
  const extension = new URL(source).pathname.endsWith(".png") ? "png" : "svg";
  const bytes = Buffer.from(await response.arrayBuffer());
  const svg = bytes.toString();
  const valid = extension === "png" ? bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) : /<svg[\s>]/i.test(svg) && !/<script[\s>]|<foreignObject[\s>]|\bonload\s*=/i.test(svg);
  if (!response.ok || !valid) {
    throw new Error(`Invalid SVG for ${name}: ${response.status}`);
  }
  await writeFile(new URL(`../public/assets/brands/${name}.${extension}`, import.meta.url), bytes);
  manifest[name] = { source, file: `${name}.${extension}`, sha256: createHash("sha256").update(bytes).digest("hex") };
  console.log(`Downloaded ${name}`);
}
await writeFile(new URL("../public/assets/brands/sources.json", import.meta.url), JSON.stringify(manifest, null, 2) + "\n");
