import { ContactPage } from "@/components/contact/contact-page";
import { createMetadata } from "@/lib/metadata";
export const metadata = createMetadata({ title: "Contact : projets et opportunités en ingénierie", description: "Contacter Jules Royet à Bordeaux et Nice pour discuter cloud, DevOps, développement logiciel, systèmes IA, emploi ou projet freelance.", path: "/contact" });
export default function Page() { return <ContactPage locale="fr" />; }
