import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Twitter, Mail, MapPin, Calendar, Code } from "lucide-react"
import Link from "next/link"
import { getAllPosts } from "@/lib/posts"
import Image from "next/image"

export default function ProfilePage() {
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Python",
    "Docker",
    "AWS",
  ]

  const allPosts = getAllPosts()
  const recentPosts = allPosts.slice(0, 3)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* プロフィール情報 */}
        <div className="lg:col-span-1">
            <Card>
            <CardHeader className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/97680FE9-0683-4BE4-9E28-9F31605FEBCD.jpg"
                  alt="Profile Photo"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover scale-125"
                  priority
                />
              </div>
              <CardTitle className="text-2xl">Capillarist</CardTitle>
              <p className="text-gray-600">フルスタック開発者</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                東京, 日本
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                2025年からブログを開始
              </div>
              <div className="flex items-center text-gray-600">
                <Code className="h-4 w-4 mr-2" />
                5年以上の開発経験
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>
                  <path d="M8.5 8.5l7 7M8.5 15.5l7-7"/>
                </svg>
                バスケ愛好家
              </div>

              {/* ソーシャルリンク */}
              <div className="flex justify-center space-x-4 pt-4">
                <Link href="https://github.com" className="text-gray-600 hover:text-gray-900">
                  <Github className="h-6 w-6" />
                </Link>
                <Link href="https://twitter.com" className="text-gray-600 hover:text-gray-900">
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link href="mailto:contact@example.com" className="text-gray-600 hover:text-gray-900">
                  <Mail className="h-6 w-6" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* スキル */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">スキル</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* メインコンテンツ */}
        <div className="lg:col-span-2 space-y-6">
          {/* 自己紹介 */}
          <Card>
            <CardHeader>
              <CardTitle>自己紹介</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                広島大学工学部を卒業後、都内の大学院に進学。
                学部では微生物学を学び、現在は「細胞を組み立てて理解する」組織工学を専門としている。
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                本ブログでは、専門的な知見をできるだけわかりやすく、かつ信頼性の高い形で発信することを心がけています。
                読者の皆さまの知的好奇心を刺激し、日々の暮らしや学びの質を少しでも高められるような情報を提供していきます。
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                将来的には、科学的知識と社会をつなぐ架け橋となるべく、研究・執筆・教育など多様な分野で活動を広げていく予定です。
                その第一歩として、自分自身の学びの過程を共有することで、研究や科学に親しみを持ってもらえたらと願っています。
              </p>
            </CardContent>
          </Card>

          {/* 最近の投稿 */}
          <Card>
            <CardHeader>
              <CardTitle>最近の投稿</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <Link
                        href={`/posts/${post.id}`}
                        className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(post.date).toLocaleDateString("ja-JP")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                  すべての投稿を見る →
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 統計情報 */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{allPosts.length}</div>
                <div className="text-gray-600">総投稿数</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">12.5K</div>
                <div className="text-gray-600">総閲覧数</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
