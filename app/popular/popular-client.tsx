"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Eye, Clock, TrendingUp } from "lucide-react"

type Period = "weekly" | "monthly" | "yearly"

interface PopularPost {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  views: number;
  readTime: number;
  rank: number;
}

interface PopularClientProps {
  popularPosts: {
    weekly: PopularPost[];
    monthly: PopularPost[];
    yearly: PopularPost[];
  }
}

export default function PopularClient({ popularPosts }: PopularClientProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("weekly")

  const periodLabels = {
    weekly: "週間",
    monthly: "月間",
    yearly: "年間",
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <TrendingUp className="h-8 w-8 mr-2 text-orange-500" />
          人気記事
        </h1>
        <p className="text-gray-600">読者に最も読まれている記事をご紹介します</p>
      </div>

      {/* 期間選択ボタン */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {(Object.keys(periodLabels) as Period[]).map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className="mx-1"
            >
              {periodLabels[period]}
            </Button>
          ))}
        </div>
      </div>

      {/* 人気記事一覧 */}
      <div className="space-y-6">
        {popularPosts[selectedPeriod].map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Badge variant="destructive" className="mr-2">
                      #{post.rank}
                    </Badge>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardTitle className="text-xl">
                    <Link href={`/posts/${post.id}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
                  </div>
                  <div className="flex items-center font-semibold text-orange-600">
                    <Eye className="h-4 w-4 mr-1" />
                    {post.views.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}分
                  </div>
                </div>
                <Link href={`/posts/${post.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                  続きを読む →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}