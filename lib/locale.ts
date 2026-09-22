export type Locale = "fr" | "en";

export function localePath(path: string, locale: Locale): string {
  return locale === "en" ? `/en${path === "/" ? "" : path}` : path;
}
