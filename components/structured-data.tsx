export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Capillarist",
    "url": "https://v0-capillarist-blog.vercel.app",
    "description": "テクノロジー、科学、人生について考えるブログ",
    "inLanguage": "ja-JP",
    "publisher": {
      "@type": "Person",
      "name": "Capillarist"
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
    "image": image.startsWith('http') ? image : `https://v0-capillarist-blog.vercel.app${image}`,
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
