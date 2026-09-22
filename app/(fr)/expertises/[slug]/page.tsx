import { notFound } from "next/navigation";
import { ExpertisePage } from "@/components/expertise-page";
import { EXPERTISES, type ExpertiseSlug } from "@/lib/expertises";
import { createMetadata } from "@/lib/metadata";

export function generateStaticParams() { return Object.keys(EXPERTISES).map(slug => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!Object.hasOwn(EXPERTISES, slug)) notFound();
  const entry = EXPERTISES[slug as ExpertiseSlug];
  return createMetadata({ title: entry.title.fr, description: entry.summary.fr, path: `/expertises/${slug}` });
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ExpertisePage slug={slug} locale="fr" />;
}
