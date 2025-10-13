import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Eye, Clock, ArrowLeft, Share2 } from "lucide-react"
import { mdxComponents } from "@/components/mdx-components"
import TableOfContents from "@/components/table-of-contents"
import AuthorProfile from "@/components/author-profile"
import { extractHeadings } from "@/lib/toc-utils"
import { generatePostMetadata } from "@/lib/metadata"
import { ArticleStructuredData, BreadcrumbStructuredData } from "@/components/structured-data"
import { siteConfig } from "@/lib/site-config"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const postDir = path.join(process.cwd(), "app/posts", id)
  const mdPath = path.join(postDir, "post.md")

  if (!fs.existsSync(mdPath)) {
    return {}
  }

  const file = fs.readFileSync(mdPath, "utf8")
  const { data, content } = matter(file)

  // 概要を作成（最初の200文字）
  const plainContent = content.replace(/[#*`_~\[\]]/g, '').replace(/\n+/g, ' ').trim()
  const description = plainContent.length > 200
    ? plainContent.substring(0, 200) + "..."
    : plainContent

  return generatePostMetadata(
    data.title || "無題",
    description,
    data.image || "/placeholder.jpg",
    data.date || new Date().toISOString(),
    data.tags || [],
    id
  )
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  // paramsをawaitで解決
  const { id } = await params
  
  // マークダウンファイルのパスを決定
  const postDir = path.join(process.cwd(), "app/posts", id)
  const mdPath = path.join(postDir, "post.md")

  // ファイル存在チェック
  if (!fs.existsSync(mdPath)) {
    notFound()
  }

  // マークダウン読み込み＆frontmatterパース
  const file = fs.readFileSync(mdPath, "utf8")
  const { data, content } = matter(file)

  // frontmatterから各種情報取得
  const { title, tags = [], date, image } = data

  // 目次の見出しを抽出
  const headings = extractHeadings(content)

  // 概要を作成（構造化データ用）
  const plainContent = content.replace(/[#*`_~\[\]]/g, '').replace(/\n+/g, ' ').trim()
  const description = plainContent.length > 200
    ? plainContent.substring(0, 200) + "..."
    : plainContent

  // パンくずリストのアイテム
  const breadcrumbItems = [
    { name: "ホーム", url: siteConfig.url },
    { name: title, url: `${siteConfig.url}/posts/${id}` }
  ]

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ArticleStructuredData
        title={title}
        description={description}
        image={image || "/placeholder.jpg"}
        datePublished={date}
        url={`${siteConfig.url}/posts/${id}`}
      />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      {/* 戻るボタン */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            記事一覧に戻る
          </Button>
        </Link>
      </div>

      {/* 記事ヘッダー */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          {/* タイトルの重複を防ぐため削除 */}
          {/* <CardTitle className="text-3xl font-bold leading-tight">{title}</CardTitle> */}
          <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {date ? new Date(date).toLocaleDateString("ja-JP") : ""}
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              シェア
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* メインコンテンツ - 3カラムレイアウト */}
      <div className="grid grid-cols-1 xl:grid-cols-8 gap-6">
        {/* 目次 - デスクトップのみ表示 */}
        <div className="hidden xl:block xl:col-span-2">
          <TableOfContents headings={headings} />
        </div>

        {/* 記事本文 */}
        <div className="xl:col-span-4">
          {/* モバイル用目次 */}
          <div className="xl:hidden mb-6">
            <TableOfContents headings={headings} />
          </div>
          <Card>
            <CardContent className="prose prose-lg prose-neutral max-w-none p-8">
              {/* アイキャッチ画像をタイトル直後に配置 */}
              {image && (
                <div className="mb-8 flex justify-center">
                  <div className="relative w-full max-w-3xl aspect-[16/9] overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                  </div>
                </div>
              )}
              <MDXRemote source={content} components={mdxComponents} />
            </CardContent>
          </Card>
        </div>

        {/* プロフィール - デスクトップのみ表示 */}
        <div className="hidden xl:block xl:col-span-2">
          <AuthorProfile />
        </div>
      </div>

      {/* モバイル用プロフィール */}
      <div className="xl:hidden mt-8">
        <AuthorProfile />
      </div>
    </div>
  )
}
