export default function StructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Jules Royet",
        "jobTitle": "Software Engineer",
        "description": "Développeur Full Stack avec plus de 3 ans d'expérience, spécialisé en Node.js, Next.js, Vue.js et cybersécurité",
        "url": "https://www.julesroyet.fr",
        "image": "https://www.julesroyet.fr/assets/banner/og-image.png",
        "sameAs": [
            "https://www.linkedin.com/in/jules-royet",
            "https://github.com/todonik",
            "https://www.root-me.org/ROYET?lang=fr"
        ],
        "knowsAbout": [
            "JavaScript",
            "TypeScript",
            "Node.js",
            "Next.js",
            "Vue.js",
            "React.js",
            "Java",
            "Kotlin",
            "Spring Boot",
            "Cybersecurity",
            "Web Development",
            "Full Stack Development"
        ],
        "alumniOf": [
            {
                "@type": "EducationalOrganization",
                "name": "ENSEIRB-MATMECA",
                "url": "https://enseirb-matmeca.bordeaux-inp.fr/"
            }
        ],
        "worksFor": [
            {
                "@type": "Organization",
                "name": "Orange",
                "url": "https://www.orange.com"
            }
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "jules.royet.pc@gmail.com",
            "contactType": "Professional"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bordeaux",
            "addressCountry": "France"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
