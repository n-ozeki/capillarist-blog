import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generatePageMetadata } from "@/lib/metadata"

export const metadata = generatePageMetadata(
  "プライバシーポリシー",
  "Capillaristのプライバシーポリシーについて",
  "/privacy"
)

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">プライバシーポリシー</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          <p className="text-sm text-gray-500">最終更新日: {new Date().toLocaleDateString("ja-JP")}</p>

          <h2>1. 個人情報の収集について</h2>
          <p>
            当ブログでは、基本的に個人情報の収集は行っておりません。
            ただし、以下の情報が自動的に収集される場合があります：
          </p>
          <ul>
            <li>アクセス解析ツールによる統計情報（IPアドレス、ブラウザ情報、アクセス日時など）</li>
            <li>Cookieによる訪問履歴</li>
          </ul>

          <h2>2. Cookieの使用について</h2>
          <p>
            当ブログでは、より良いサービスを提供するためにCookieを使用することがあります。
            Cookieとは、Webサーバーからお客様のブラウザに送信される小さなテキストファイルで、
            お客様のコンピュータに保存されます。
          </p>
          <p>
            お客様はブラウザの設定により、Cookieの受け取りを拒否したり、
            Cookieを受け取った場合に警告を表示させることができます。
          </p>

          <h2>3. アクセス解析ツールについて</h2>
          <p>
            当ブログでは、Google Analyticsなどのアクセス解析ツールを使用することがあります。
            これらのツールはトラフィックデータの収集のためにCookieを使用します。
            このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
          </p>

          <h2>4. 広告の配信について</h2>
          <p>
            当ブログでは、第三者配信の広告サービス（Google AdSenseなど）を利用することがあります。
            広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
          </p>

          <h2>5. 外部リンクについて</h2>
          <p>
            当ブログには外部サイトへのリンクが含まれています。
            リンク先のサイトにおける個人情報の取り扱いについては、
            各サイトの責任となりますので、該当サイトのプライバシーポリシーをご確認ください。
          </p>

          <h2>6. 個人情報の管理</h2>
          <p>
            当ブログは、収集した情報を適切に管理し、以下の場合を除き第三者に開示・提供することはありません：
          </p>
          <ul>
            <li>本人の同意がある場合</li>
            <li>法令に基づき開示が必要な場合</li>
          </ul>

          <h2>7. プライバシーポリシーの変更</h2>
          <p>
            当ブログは、個人情報に関する日本の法令その他の規範を遵守するとともに、
            本ポリシーの内容を適宜見直し、その改善に努めます。
            修正された最新のプライバシーポリシーは常に本ページにて開示されます。
          </p>

          <h2>8. お問い合わせ</h2>
          <p>
            本プライバシーポリシーに関するお問い合わせは、以下までご連絡ください：
          </p>
          <p className="text-gray-600">
            Email: capillarist@outlook.com
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
