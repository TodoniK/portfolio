import { ContactPage } from "@/components/contact/contact-page";
import { createMetadata } from "@/lib/metadata";
export const metadata = createMetadata({ title: "Contact: engineering projects and opportunities", description: "Contact Jules Royet in Bordeaux and Nice to discuss cloud, DevOps, software engineering, AI systems, employment opportunities or freelance projects.", path: "/contact", locale: "en" });
export default function Page() { return <ContactPage locale="en" />; }
