import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { getSiteUrl } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const baseUrl = getSiteUrl()

  // 記事ページのサイトマップエントリー
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.id}`,
    lastModified: post.date,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // 静的ページのサイトマップエントリー
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/popular`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  return [...staticPages, ...postEntries]
}
