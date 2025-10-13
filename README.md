# Capillarist Blog

テクノロジー、科学、人生について考えるブログ

## 独自ドメインの設定方法

### 1. ドメインを取得

以下のサービスでドメインを購入できます：
- [お名前.com](https://www.onamae.com/) (日本)
- [ムームードメイン](https://muumuu-domain.com/) (日本)
- [Namecheap](https://www.namecheap.com/) (海外)

例: `capillarist.com` や `capillarist.blog` など

### 2. Vercelにドメインを接続

1. [Vercelダッシュボード](https://vercel.com/dashboard)にアクセス
2. プロジェクトを選択
3. **Settings** → **Domains**
4. 独自ドメインを入力して追加
5. Vercelが表示するDNS設定をドメイン管理画面で設定

### 3. 環境変数を更新

独自ドメインを設定したら、`.env.local`ファイルのURLを更新してください：

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 4. Vercelに環境変数を設定

1. Vercelダッシュボードで **Settings** → **Environment Variables**
2. `NEXT_PUBLIC_SITE_URL`を追加
3. 値を独自ドメインに設定（例: `https://capillarist.com`）

### 5. 再デプロイ

環境変数を更新したら、再デプロイしてください：

```bash
git add .
git commit -m "Update site URL"
git push
```

または、Vercelダッシュボードから手動で再デプロイできます。

## 検索エンジンへの登録

独自ドメインを設定したら、以下の検索エンジンに登録してください：

### Google Search Console

1. [Google Search Console](https://search.google.com/search-console)にアクセス
2. プロパティを追加（独自ドメイン）
3. サイトマップを送信: `https://yourdomain.com/sitemap.xml`
4. URLの検査からインデックスをリクエスト

### Bing Webmaster Tools

1. [Bing Webmaster Tools](https://www.bing.com/webmasters)にアクセス
2. サイトを追加
3. サイトマップを送信

## 開発

```bash
# 開発サーバーを起動
npm run dev

# ビルド
npm run build

# 本番環境でプレビュー
npm run start
```

## SEO機能

このプロジェクトには以下のSEO機能が実装されています：

- ✅ メタデータ（title, description, keywords）
- ✅ Open Graph（OG画像対応）
- ✅ Twitter Card
- ✅ 構造化データ（Schema.org）
- ✅ サイトマップ（自動生成）
- ✅ robots.txt（自動生成）
- ✅ 正規URL（canonical）

## 環境変数

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `NEXT_PUBLIC_SITE_URL` | サイトのベースURL | `https://capillarist.com` |

## ファイル構成

```
app/
  ├── layout.tsx          # グローバルメタデータ
  ├── sitemap.ts          # サイトマップ生成
  ├── robots.ts           # robots.txt生成
  └── posts/[id]/page.tsx # 記事ページ（個別メタデータ）

lib/
  └── site-config.ts      # サイト設定（URL管理）

.env.local               # 環境変数（ローカル開発用）
```
