import type { Metadata, Viewport } from 'next';
import './globals.scss';
import Navbar from '@/components/Navigations/NavBar';
import Footer from '@/components/Navigations/Footer';

export const metadata: Metadata = {
    metadataBase: new URL('https://www.linkedin.com/in/jules-royet'),
    title: 'Jules | Portfolio',
    description: 'Versatile FullStack Developer with a flair for designing and developing scalable web applications using Node.js, Next.js, and a suite of modern technologies. Passionate about building user-centric solutions and leveraging AI technologies like OpenAI GPT for personalized experiences. Interested in offensive and defensive security, SOC solutions.',
    keywords: 'TypeScript, Full Stack Developer, Software Engineer, Vue.js, React.js, Node.js, Next.js, Nest.js, Web Development, AI, OpenAI GPT, Software Engineering',
    authors: [{ name: 'Jules Royet', url: 'https://www.linkedin.com/in/jules-royet' }],
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Jules | Portfolio'
    },
    formatDetection: {
        telephone: false
    },
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: 'https://www.linkedin.com/in/jules-royet',
        images: [
            {
                url: '/assets/banner/profile-banner.png',
                width: 1920,
                height: 1080,
                alt: 'Jules - Software Engineer'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Jules Royet | Développeur Full Stack',
        description: 'Portfolio de Jules Royet, développeur FullStack spécialisé dans Node.js, Next.js et technologies web modernes.',
        images: ['/assets/banner/og-image.png'],
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
        <html lang="en">
            <head>
                <meta
                    name="image"
                    property="og:image"
                    content="/assets/banner/og-image.png"
                />
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
            </head>
            <body>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
