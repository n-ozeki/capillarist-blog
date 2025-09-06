export interface TOCItem {
  id: string
  title: string
  level: number
}

// ID生成関数 - 日本語対応の確実な方法
export function generateId(text: string): string {
  // 基本的なクリーニング
  let id = text
    .trim()
    .toLowerCase()
  
  // 日本語の特殊文字を変換
  id = id
    .replace(/？/g, 'question')
    .replace(/！/g, 'exclamation') 
    .replace(/＝/g, 'equal')
    .replace(/＋/g, 'plus')
    .replace(/、/g, '')
    .replace(/。/g, '')
    .replace(/「/g, '')
    .replace(/」/g, '')
    .replace(/『/g, '')
    .replace(/』/g, '')
    
  // 日本語文字をローマ字に変換するか、そのまま保持するための処理
  // ここでは簡単化のため、日本語文字も保持してBase64エンコード
  const cleanId = id
    .replace(/\s+/g, '-') // スペースをハイフンに
    .replace(/[^\w\-ぁ-んァ-ヶ一-龯]/g, '') // 日本語文字、英数字、ハイフンのみ保持
    .replace(/-+/g, '-') // 連続ハイフンを単一に
    .replace(/^-|-$/g, '') // 先頭末尾のハイフン除去
    
  // 日本語が含まれている場合、よりシンプルなIDに変換
  if (cleanId && /[ぁ-んァ-ヶ一-龯]/.test(cleanId)) {
    // 日本語が含まれる場合は、テキストのハッシュベースのIDを生成
    const hash = Array.from(text).reduce((acc, char) => {
      return ((acc << 5) - acc + char.charCodeAt(0)) & 0xffffffff
    }, 0)
    return `section-${Math.abs(hash)}`
  }
  
  return cleanId || ''
}

// マークダウンから見出しを抽出
export function extractHeadings(content: string): TOCItem[] {
  const headings: TOCItem[] = []
  const lines = content.split('\n')
  const usedIds = new Set<string>()
  
  for (const line of lines) {
    // ## または ### で始まる行を検出
    const match = line.match(/^(#{2,3})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const title = match[2].trim()
      
      // IDを生成
      let baseId = generateId(title)
      
      // 空のIDの場合はフォールバック
      if (!baseId) {
        baseId = `section-${headings.length + 1}`
      }
      
      // 重複回避
      let id = baseId
      let counter = 1
      while (usedIds.has(id)) {
        id = `${baseId}-${counter}`
        counter++
      }
      
      usedIds.add(id)
      
      headings.push({
        id,
        title,
        level
      })
    }
  }
  
  return headings
}