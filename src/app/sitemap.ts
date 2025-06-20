import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.julesroyet.fr'
  const currentDate = new Date().toISOString()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}#home`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}#jobs`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}#educations`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}#projects`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}#contacts`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    // Ajouter les URLs des projets individuels si ils existent
    {
      url: 'https://stakeirb.julesroyet-projects.me/',
      lastModified: '2024-01-01',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://iplocator.julesroyet-projects.me/',
      lastModified: '2024-01-01',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://todonik.github.io/mijotons-website/',
      lastModified: '2024-01-01',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
