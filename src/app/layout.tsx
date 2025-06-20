import type { Metadata, Viewport } from 'next';
import './globals.scss';
import Navbar from '@/components/Navigations/NavBar';
import Footer from '@/components/Navigations/Footer';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
    metadataBase: new URL('https://www.julesroyet.fr'),
    title: {
        default: 'Jules Royet | Portfolio - Développeur Full Stack',
        template: '%s | Jules Royet - Développeur Full Stack'
    },
    description: 'Portfolio de Jules Royet, développeur FullStack passionné avec plus de 3 ans d\'expérience. Spécialisé en Node.js, Next.js, Vue.js, React et technologies web modernes. Expert en développement d\'applications web évolutives et sécurisées.',
    keywords: [
        'Jules Royet',
        'Développeur Full Stack',
        'Software Engineer',
        'TypeScript',
        'JavaScript',
        'Node.js',
        'Next.js',
        'Vue.js',
        'React.js',
        'Java',
        'Kotlin',
        'Spring Boot',
        'Web Development',
        'Frontend Developer',
        'Backend Developer',
        'Portfolio',
        'Bordeaux',
        'France',
        'ENSEIRB-MATMECA',
        'Orange',
        'Cybersecurity',
        'SOC',
        'Agile',
        'Scrum',
        'MongoDB',
        'MySQL',
        'Docker',
        'CI/CD',
        'DevOps',
        'API REST',
        'Microservices',
        'Freelance',
        'Consultant IT',
        'Développement Web',
        'Applications Mobiles',
        'Sécurité Informatique',
        'Ethical Hacking',
        'Green Code',
        'Performance Web',
        'UX/UI Design'
    ],
    authors: [{ name: 'Jules Royet', url: 'https://www.julesroyet.fr' }],
    creator: 'Jules Royet',
    publisher: 'Jules Royet',
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Jules Royet Portfolio'
    },
    formatDetection: {
        telephone: false
    },
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: 'https://www.julesroyet.fr',
        siteName: 'Jules Royet Portfolio',
        title: 'Jules Royet | Portfolio - Développeur Full Stack',
        description: 'Portfolio de Jules Royet, développeur FullStack avec plus de 3 ans d\'expérience. Spécialisé en Node.js, Next.js, Vue.js et technologies web modernes. Expert en cybersécurité et développement d\'applications web évolutives.',
        images: [
            {
                url: 'https://www.julesroyet.fr/assets/banner/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Jules Royet - Développeur Full Stack Portfolio - Spécialisé en Node.js, Next.js, Vue.js',
                type: 'image/png',
                secureUrl: 'https://www.julesroyet.fr/assets/banner/og-image.png',
            }
        ],
        emails: ['jules.royet.pc@gmail.com'],
        phoneNumbers: [],
        faxNumbers: [],
        countryName: 'France',
        determiner: 'auto',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Jules Royet | Portfolio - Développeur Full Stack',
        description: 'Portfolio de Jules Royet, développeur FullStack spécialisé en Node.js, Next.js, Vue.js et technologies web modernes. Expert en cybersécurité.',
        images: [{
            url: 'https://www.julesroyet.fr/assets/banner/og-image.png',
            alt: 'Jules Royet - Développeur Full Stack Portfolio',
            width: 1200,
            height: 630,
        }],
        creator: '@jules_royet',
        site: '@jules_royet',
        siteId: '',
        creatorId: '',
    },
    alternates: {
        canonical: 'https://www.julesroyet.fr',
    },
    other: {
        // Métadonnées pour LinkedIn
        'article:author': 'Jules Royet',
        'article:section': 'Technology',
        'article:tag': 'Software Engineering, Full Stack Development, Cybersecurity',
        // Métadonnées supplémentaires pour Facebook
        'fb:app_id': '', // Ajoutez votre App ID Facebook si vous en avez un
        // Métadonnées pour d'autres plateformes
        'application-name': 'Jules Royet Portfolio',
        'msapplication-TileColor': '#191919',
        'msapplication-config': '/browserconfig.xml',
        'theme-color': '#191919',
        // Métadonnées LinkedIn spécifiques
        'linkedin:owner': 'jules-royet',
        // Métadonnées supplémentaires pour améliorer le partage
        'og:rich_attachment': 'true',
        'og:see_also': 'https://www.linkedin.com/in/jules-royet',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
    themeColor: ' #191919',
    colorScheme: 'dark'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
            <head>
                <StructuredData />
                <link rel="canonical" href="https://www.julesroyet.fr" />
                <meta name="google-site-verification" content="" />
                <meta name="msvalidate.01" content="" />
                
                {/* Geo Tags */}
                <meta name="geo.region" content="FR-NAQ" />
                <meta name="geo.placename" content="Bordeaux" />
                <meta name="geo.position" content="44.8378;-0.5792" />
                <meta name="ICBM" content="44.8378, -0.5792" />
                
                {/* Language and Locale */}
                <meta httpEquiv="content-language" content="fr" />
                <meta name="language" content="French" />
                
                {/* Additional SEO Meta Tags */}
                <meta name="rating" content="general" />
                <meta name="revisit-after" content="7 days" />
                <meta name="distribution" content="global" />
                <meta name="coverage" content="worldwide" />
                <meta name="target" content="all" />
                <meta name="HandheldFriendly" content="true" />
                <meta name="MobileOptimized" content="width" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                
                {/* Preconnect for performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
                <link rel="dns-prefetch" href="https://github.com" />
                <link rel="dns-prefetch" href="https://linkedin.com" />
                
                {/* Additional Open Graph meta tags */}
                <meta property="og:image:secure_url" content="https://www.julesroyet.fr/assets/banner/og-image.png" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Jules Royet - Développeur Full Stack Portfolio" />
                
                {/* Twitter specific meta tags */}
                <meta name="twitter:image:src" content="https://www.julesroyet.fr/assets/banner/og-image.png" />
                <meta name="twitter:image:width" content="1200" />
                <meta name="twitter:image:height" content="630" />
                <meta name="twitter:image:alt" content="Jules Royet - Développeur Full Stack Portfolio" />
                
                {/* LinkedIn specific meta tags */}
                <meta property="linkedin:owner" content="jules-royet" />
                
                {/* WhatsApp and other messaging apps */}
                <meta property="og:rich_attachment" content="true" />
                
                <meta
                    property="og:image:width"
                    content="1200"
                />
                <meta
                    property="og:image:height"
                    content="630"
                />
                <meta
                    property="article:published_time"
                    content={new Date().toISOString()}
                />
                <meta
                    property="article:modified_time"
                    content={new Date().toISOString()}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            name: "Jules Royet",
                            jobTitle: "Développeur Full Stack",
                            description: "Développeur FullStack spécialisé en Node.js, Next.js, Vue.js et technologies web modernes",
                            url: "https://www.julesroyet.fr",
                            image: "https://www.julesroyet.fr/assets/banner/og-image.png",
                            sameAs: [
                                "https://www.linkedin.com/in/jules-royet",
                                "https://github.com/todonik",
                                "https://www.root-me.org/ROYET"
                            ],
                            worksFor: {
                                "@type": "Organization",
                                name: "Orange",
                                url: "https://www.orange.com/"
                            },
                            alumniOf: [
                                {
                                    "@type": "EducationalOrganization",
                                    name: "ENSEIRB-MATMECA",
                                    url: "https://www.enseirb-matmeca.fr/"
                                },
                                {
                                    "@type": "EducationalOrganization",
                                    name: "IUT de Bayonne",
                                    url: "https://www.iutbayonne.univ-pau.fr"
                                }
                            ],
                            address: {
                                "@type": "PostalAddress",
                                addressLocality: "Bordeaux",
                                addressRegion: "Nouvelle-Aquitaine",
                                addressCountry: "France"
                            },
                            email: "jules.royet.pc@gmail.com",
                            knowsAbout: [
                                "JavaScript",
                                "TypeScript",
                                "Node.js",
                                "Next.js",
                                "Vue.js",
                                "React.js",
                                "Java",
                                "Kotlin",
                                "Spring Boot",
                                "Web Development",
                                "Full Stack Development",
                                "Cybersecurity",
                                "DevOps",
                                "MongoDB",
                                "MySQL",
                                "Docker",
                                "CI/CD",
                                "Agile",
                                "Scrum"
                            ],
                            hasOccupation: {
                                "@type": "Occupation",
                                name: "Software Engineer",
                                occupationLocation: {
                                    "@type": "City",
                                    name: "Bordeaux"
                                },
                                skills: "JavaScript, TypeScript, Node.js, Vue.js, React.js, Java, Kotlin, Spring Boot"
                            }
                        })
                    }}
                />
            </head>
            <body>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
