import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/api/'],
    },
    sitemap: 'https://www.julesroyet.fr/sitemap.xml',
    host: 'https://www.julesroyet.fr'
  }
}
