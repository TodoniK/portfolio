// Static image registry so components can look assets up by id (Vite needs static globs).
const logos = import.meta.glob<{ default: ImageMetadata }>("../assets/logos/*.png", { eager: true });

/** Logo for a legacy path like "/assets/companies/logo-orange.webp". */
export function logo(legacyPath: string): ImageMetadata | undefined {
  const name = legacyPath.split("/").pop()?.replace(/\.\w+$/, "");
  return logos[`../assets/logos/${name}.png`]?.default;
}
