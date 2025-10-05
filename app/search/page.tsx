"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search, Calendar, Clock } from "lucide-react"
import { searchPosts, type Post } from "@/lib/search"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Post[]>([])
  const [allPosts, setAllPosts] = useState<Post[]>([])

  useEffect(() => {
    // Load all posts from API
    fetch('/api/posts')
      .then(res => res.json())
      .then(posts => {
        setAllPosts(posts)
        setResults(posts)
      })
      .catch(error => {
        console.error('Error loading posts:', error)
        setAllPosts([])
        setResults([])
      })
  }, [])

  useEffect(() => {
    const q = searchParams.get("q") || ""
    setQuery(q)
    performSearch(q)
  }, [searchParams, allPosts])

  const performSearch = (searchQuery: string) => {
    const filtered = searchPosts(allPosts, searchQuery)
    setResults(filtered)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query)
    // URLを更新
    const url = new URL(window.location.href)
    url.searchParams.set("q", query)
    window.history.pushState({}, "", url.toString())
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Search className="h-8 w-8 mr-2 text-blue-500" />
          記事検索
        </h1>
        <p className="text-gray-600">キーワードやタグで記事を検索できます</p>
      </div>

      {/* 検索フォーム */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2 max-w-2xl mx-auto">
          <Input
            type="text"
            placeholder="検索キーワードを入力..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            検索
          </Button>
        </div>
      </form>

      {/* 検索結果 */}
      <div className="mb-6">
        <p className="text-gray-600">
          {query ? `"${query}" の検索結果: ${results.length}件` : `全記事: ${results.length}件`}
        </p>
      </div>

      {results.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">検索結果が見つかりませんでした</h3>
            <p className="text-gray-600">別のキーワードで検索してみてください</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {results.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-xl">
                  <Link href={`/posts/${post.id}`} className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString("ja-JP")}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      約{post.id === 'anaerobic-bacteria-part1' ? 3 : Math.max(1, Math.ceil(post.content.length / 400))}分
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
      )}
    </div>
  )
}
