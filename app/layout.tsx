import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { WebsiteStructuredData } from "@/components/structured-data"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://v0-capillarist-blog.vercel.app'),
  title: {
    default: 'Capillarist',
    template: '%s | Capillarist',
  },
  description: "テクノロジー、科学、人生について考えるブログ",
  keywords: ['テクノロジー', '科学', '人生', 'ブログ', '技術', '研究'],
  authors: [{ name: 'Capillarist' }],
  creator: 'Capillarist',
  publisher: 'Capillarist',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://v0-capillarist-blog.vercel.app',
    siteName: 'Capillarist',
    title: 'Capillarist',
    description: 'テクノロジー、科学、人生について考えるブログ',
    images: [
      {
        url: '/og-image.png', // OG画像を追加してください
        width: 1200,
        height: 630,
        alt: 'Capillarist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Capillarist',
    description: 'テクノロジー、科学、人生について考えるブログ',
    images: ['/og-image.png'], // OG画像を追加してください
  },
  alternates: {
    canonical: 'https://v0-capillarist-blog.vercel.app',
  },
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <WebsiteStructuredData />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
