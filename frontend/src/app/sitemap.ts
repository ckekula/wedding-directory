import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {


  return [
    {
      url: "https://sayido.lk",
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: "https://sayido.lk/about",
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8,
    },
    {
      url: "https://sayido.lk/vendor-search",
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    }

  ]
}