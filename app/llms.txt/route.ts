import { NextResponse } from "next/server";

const LLMS_TEXT = `# Jules Royet : Cloud & DevOps Architect & AI Systems Engineer

> Portfolio and technical profile of Jules Royet, Cloud & DevOps Architect at Orange and graduate of ENSEIRB-MATMECA. Specialized in cloud architecture (Azure, Hybrid, OCI), autonomous agent runtimes, DevSecOps, and high-performance software engineering.

## Summary

- Name: Jules Royet
- Current Role: Architecte Cloud & DevOps chez Orange (DSI France / Move To Cloud)
- Location: Bordeaux, France (Residence) / Nice, France (Mission)
- Education: Diplôme d'Ingénieur Informatique & Réseaux, ENSEIRB-MATMECA (2022 to 2025)
- Website: [julesroyet.dev](https://julesroyet.dev)
- Email: jules.royet.pc@gmail.com
- LinkedIn: [linkedin.com/in/jules-royet](https://www.linkedin.com/in/jules-royet)
- GitHub: [github.com/todonik](https://github.com/todonik)
- Root-Me: [root-me.org/ROYET](https://www.root-me.org/ROYET)

## Core Expertise

- Cloud Platforms: Microsoft Azure (ACA, AKS, App Gateway WAF v2, VNet, Private Endpoints, Key Vault, Cosmos DB), AWS, OCI, Orange Private Cloud (SoPaaS, Mercury).
- Autonomous AI & Tooling: Hermes Autonomous Agent, Omniroute AI Gateway, OpenCode & Claude Code agentic harness, RTK Rust token optimizer, LiteLLM, GPT-4o pipelines.
- DevOps & IaC: Terraform, Docker, Kubernetes, GitLab CI/CD, GitHub Actions.
- Full Stack Engineering: Java, Spring Boot, Kotlin, TypeScript, React, Next.js, Svelte, Vue.js, Node.js, Python, PostgreSQL, MongoDB.
- Cybersecurity & Governance: DevSecOps, TLS architectures, SOC practices, FinOps comitology, DAT authoring, Root-Me CTFs.

## Production Projects

- [Hermes Agent](https://hermes.julesroyet.dev): Autonomous AI agent runtime with web dashboard and execution loops.
- [Omniroute](https://omniroute.julesroyet.dev): AI gateway with intelligent routing, sub-15ms latency and Redis caching.
- [M2C Flows](https://julesroyet.dev/projects): Digital twin web platform for IT migration simulation and latency impact modeling at Orange DSI.
- [OpenCode Harness](https://julesroyet.dev/projects): Custom developer runtime with RTK token compression and session memory plugins.
- [Shopeen](https://julesroyet.dev/projects): Internal environmental impact and carbon calculator for Orange IT infrastructure.
- [Stake'eirb](https://stakeirb.julesroyet.dev): Real-time multiplayer casino platform with WebSockets.
- [IP Locator](https://iplocator.julesroyet.dev): Real-time IP geolocation and network intelligence.

## Certifications

- AZ-900: Microsoft Azure Fundamentals (2025)
- Infrastructure Automation with Terraform (HashiCorp, 2025)
- AWS Cloud Technical Essentials (Amazon Web Services, 2025)
- TOEIC: Score C1 Full Professional (ETS Global, 2024 to 2026)

## Links

- [Home](https://julesroyet.dev/): Portfolio homepage with interactive showcase
- [Projects](https://julesroyet.dev/projects): Complete production and cloud projects
- [About](https://julesroyet.dev/about): Experience, education, certifications and interactive tools
- [Resume](https://julesroyet.dev/resumes.pdf): Downloadable CV in PDF format
- [Full LLM Profile](https://julesroyet.dev/llms-full.txt): Comprehensive background and technical architecture dossier
`;

export async function GET(): Promise<NextResponse> {
  return new NextResponse(LLMS_TEXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
