import { ContactCard } from "@/components/contact/contact-card";
import { Projects } from "@/components/projects/projects";
import { ProjectsHeader } from "@/components/projects/projects-header";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Projets Cloud, DevOps, logiciel et agents IA",
  description: "Études de cas de Jules Royet : architectures cloud, développement logiciel, agents autonomes et automatisation. Décisions techniques et réalisations.",
  path: "/projects",
});

export default function ProjectsPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <ProjectsHeader />
      <Projects />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
