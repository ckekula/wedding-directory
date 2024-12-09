import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ["/privacy-policy", "/terms-of-use"],
    },
    sitemap: 'https://sayido.lk/sitemap.xml',
  }
}