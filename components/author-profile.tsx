import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function AuthorProfile() {
  return (
    <Card className="sticky top-24">
      <CardHeader className="text-center pb-4">
        <div className="w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden">
          <Image
            src="/97680FE9-0683-4BE4-9E28-9F31605FEBCD.jpg"
            alt="Capillarist"
            width={144}
            height={144}
            className="w-full h-full object-cover scale-125"
          />
        </div>
        <h3 className="text-lg font-semibold">Capillarist</h3>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-sm text-gray-600 leading-relaxed space-y-3">
          <p>
            都内の大学で研究活動を行っている大学院生。
            専門は「細胞を組み立てて理解する」組織工学。
            科学をわかりやすく伝えることを目指しています。
          </p>
        </div>
        <div className="mt-4">
          <Link href="/profile">
            <Button variant="outline" size="sm" className="w-full">
              詳細プロフィールを表示
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}