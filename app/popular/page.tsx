import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, Eye, Clock, TrendingUp } from "lucide-react"
import { getAllPosts } from "@/lib/posts"
import { getPopularPosts } from "@/lib/analytics"
import PopularClient from "./popular-client"

// キャッシュを無効化して毎回GA APIを呼び出す
export const dynamic = 'force-dynamic'

// Google Analyticsから実際の人気記事データを取得
async function getPopularPostsData() {
  const allPosts = getAllPosts()

  // Google Analyticsからページビューを取得
  const weeklyViews = await getPopularPosts(10, '7daysAgo', 'today')
  const monthlyViews = await getPopularPosts(10, '30daysAgo', 'today')
  const yearlyViews = await getPopularPosts(10, '365daysAgo', 'today')

  // ページパスから記事IDを抽出して記事データとマージ
  const mapViewsToPosts = (views: any[]) => {
    return views
      .map((view) => {
        // /posts/article-id から article-id を抽出
        const match = view.pagePath.match(/\/posts\/([^\/]+)/)
        if (!match) return null

        const postId = match[1]
        const post = allPosts.find((p) => p.id === postId)
        if (!post) return null

        return {
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          tags: post.tags,
          publishedAt: post.date,
          views: view.views,
          readTime: Math.floor(Math.random() * 10) + 5, // 読了時間は推定
          rank: 0, // 後で設定
        }
      })
      .filter((p) => p !== null)
      .map((post, index) => ({ ...post, rank: index + 1 }))
  }

  return {
    weekly: mapViewsToPosts(weeklyViews).slice(0, 2),
    monthly: mapViewsToPosts(monthlyViews).slice(0, 3),
    yearly: mapViewsToPosts(yearlyViews),
  }
}

export default async function PopularPage() {
  const popularPosts = await getPopularPostsData()

  return <PopularClient popularPosts={popularPosts} />
}
