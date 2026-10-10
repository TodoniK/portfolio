import { routes, href, LOCALES } from "../src/data/site";
export const PAGES = routes().flatMap((r) => LOCALES.map((l) => ({ locale: l, path: href(l, r) })));
