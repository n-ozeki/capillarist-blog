import { BetaAnalyticsDataClient } from '@google-analytics/data'

// Google Analytics Data APIクライアントの初期化
function getAnalyticsClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY

  if (!clientEmail || !privateKey) {
    throw new Error('GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY is not set')
  }

  // Vercelでは改行が\\nとしてエスケープされるため、実際の改行に変換
  const formattedPrivateKey = privateKey.replace(/\\n/g, '\n')

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: formattedPrivateKey,
    },
  })
}

export interface PageView {
  pagePath: string
  views: number
}

/**
 * Google Analyticsから人気記事を取得
 * @param limit 取得する記事数
 * @param startDate 開始日（YYYY-MM-DD形式）デフォルト: 30日前
 * @param endDate 終了日（YYYY-MM-DD形式）デフォルト: 今日
 */
export async function getPopularPosts(
  limit: number = 10,
  startDate: string = '30daysAgo',
  endDate: string = 'today'
): Promise<PageView[]> {
  try {
    const analyticsDataClient = getAnalyticsClient()
    const propertyId = process.env.GA_PROPERTY_ID

    if (!propertyId) {
      throw new Error('GA_PROPERTY_ID is not set')
    }

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],
      dimensions: [
        {
          name: 'pagePath',
        },
      ],
      metrics: [
        {
          name: 'screenPageViews',
        },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: {
            matchType: 'BEGINS_WITH',
            value: '/posts/',
          },
        },
      },
      orderBys: [
        {
          metric: {
            metricName: 'screenPageViews',
          },
          desc: true,
        },
      ],
      limit,
    })

    const pageViews: PageView[] = []

    if (response.rows) {
      for (const row of response.rows) {
        const pagePath = row.dimensionValues?.[0]?.value || ''
        const views = parseInt(row.metricValues?.[0]?.value || '0', 10)

        pageViews.push({
          pagePath,
          views,
        })
      }
    }

    return pageViews
  } catch (error) {
    console.error('Error fetching popular posts from Google Analytics:', error)
    // エラーが発生した場合は空の配列を返す
    return []
  }
}
