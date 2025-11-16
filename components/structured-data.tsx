import { siteConfig } from "@/lib/site-config"

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "alternateName": siteConfig.nameJa,
    "url": siteConfig.url,
    "description": siteConfig.description,
    "inLanguage": "ja-JP",
    "publisher": {
      "@type": "Person",
      "name": siteConfig.author
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function ArticleStructuredData({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author = "Capillarist",
  url,
}: {
  title: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author?: string
  url: string
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image.startsWith('http') ? image : `${siteConfig.url}${image}`,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Person",
      "name": "Capillarist"
    },
    "url": url,
    "inLanguage": "ja-JP"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
