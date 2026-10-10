// Static image registry so components can look assets up by id (Vite needs static globs).
const tiles = import.meta.glob<{ default: ImageMetadata }>("../assets/tiles/*.png", { eager: true });
const logos = import.meta.glob<{ default: ImageMetadata }>("../assets/logos/*.png", { eager: true });

export function tile(id: string): ImageMetadata {
  const m = tiles[`../assets/tiles/${id}.png`];
  if (!m) throw new Error(`Missing tile for project "${id}". Run npm run media:tiles.`);
  return m.default;
}

/** Logo for a legacy path like "/assets/companies/logo-orange.webp". */
export function logo(legacyPath: string): ImageMetadata | undefined {
  const name = legacyPath.split("/").pop()?.replace(/\.\w+$/, "");
  return logos[`../assets/logos/${name}.png`]?.default;
}
