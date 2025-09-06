import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, Eye, Clock, TrendingUp } from "lucide-react"
import { getAllPosts } from "@/lib/posts"
import PopularClient from "./popular-client"

// 実際のブログ投稿データを取得し、人気記事として整理
function getPopularPostsData() {
  const allPosts = getAllPosts()
  
  // 実際のデータから人気記事を生成（サンプル数値付き）
  const popularData = allPosts.map((post, index) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    tags: post.tags,
    publishedAt: post.date,
    views: Math.floor(Math.random() * 2000) + 500, // サンプル閲覧数
    readTime: Math.floor(Math.random() * 10) + 5, // サンプル読了時間
    rank: index + 1,
  }))

  // 閲覧数でソート
  const sortedByViews = [...popularData].sort((a, b) => b.views - a.views)

  return {
    weekly: sortedByViews.slice(0, 2),
    monthly: sortedByViews.slice(0, 3),
    yearly: sortedByViews,
  }
}

export default function PopularPage() {
  const popularPosts = getPopularPostsData()

  return <PopularClient popularPosts={popularPosts} />
}
