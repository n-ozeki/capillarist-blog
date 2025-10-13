/**
 * サイトの基本設定を管理
 */

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://v0-capillarist-blog.vercel.app'
}

export const siteConfig = {
  name: 'Capillarist',
  description: 'テクノロジー、科学、人生について考えるブログ',
  url: getSiteUrl(),
  ogImage: '/og-image.png',
  keywords: ['テクノロジー', '科学', '人生', 'ブログ', '技術', '研究'],
  author: 'Capillarist',
  locale: 'ja_JP',
}
