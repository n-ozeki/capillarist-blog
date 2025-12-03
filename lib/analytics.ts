import { BetaAnalyticsDataClient } from '@google-analytics/data'
import fs from 'fs'
import path from 'path'

// Google Analytics Data APIクライアントの初期化
function getAnalyticsClient() {
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS

  if (!credentialsPath) {
    throw new Error('GOOGLE_APPLICATION_CREDENTIALS is not set')
  }

  const fullPath = path.resolve(process.cwd(), credentialsPath)

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Credentials file not found: ${fullPath}`)
  }

  const credentials = JSON.parse(fs.readFileSync(fullPath, 'utf8'))

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key,
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
