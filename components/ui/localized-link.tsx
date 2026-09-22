"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "@/lib/i18n";
import { localePath } from "@/lib/locale";

export function LocalizedLink({ href, ...props }: ComponentProps<typeof Link>) {
  const { locale } = useLanguage();
  return <Link {...props} href={typeof href === "string" && /^\/(?!\/|en(?:\/|$))/.test(href) && !/\.[a-z0-9]+(?:[?#]|$)/i.test(href) ? localePath(href, locale) : href} />;
}
