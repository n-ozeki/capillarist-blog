import { Metadata } from 'next'
import { getSiteUrl } from './site-config'

const baseUrl = getSiteUrl()

export function generatePostMetadata(
  title: string,
  description: string,
  image: string,
  date: string,
  tags: string[],
  id: string
): Metadata {
  const url = `${baseUrl}/posts/${id}`
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  return {
    title,
    description,
    keywords: tags,
    authors: [{ name: 'Capillarist' }],
    openGraph: {
      type: 'article',
      locale: 'ja_JP',
      url,
      siteName: 'Capillarist',
      title,
      description,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: date,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = ''
): Metadata {
  const url = `${baseUrl}${path}`

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url,
      siteName: 'Capillarist',
      title,
      description,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Capillarist',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
    alternates: {
      canonical: url,
    },
  }
}
