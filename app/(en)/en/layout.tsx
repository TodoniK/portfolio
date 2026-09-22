import { SiteLayout } from "@/components/layout/site-layout";
import { baseMetadata } from "@/lib/metadata";
import type { ReactNode } from "react";

export const metadata = baseMetadata;

export default function Layout({ children }: { children: ReactNode }) {
  return <SiteLayout locale="en">{children}</SiteLayout>;
}
