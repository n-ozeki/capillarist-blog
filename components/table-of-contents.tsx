"use client"

import React, { useEffect, useState } from "react"
import { TOCItem } from "@/lib/toc-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TableOfContentsProps {
  headings: TOCItem[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  
  // 見出しの情報をログ出力
  useEffect(() => {
    console.log('目次の見出し一覧:', headings.length, '個')
  }, [headings])

  useEffect(() => {
    if (typeof window === 'undefined' || headings.length === 0) return

    // アクティブな見出しを監視
    const observer = new IntersectionObserver(
      (entries) => {
        // 表示中の見出しの中で一番上にあるものをアクティブにする
        let topEntry: IntersectionObserverEntry | null = null
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!topEntry || entry.boundingClientRect.top < topEntry.boundingClientRect.top) {
              topEntry = entry
            }
          }
        })
        
        if (topEntry) {
          setActiveId((topEntry.target as HTMLElement).id)
        }
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0.1
      }
    )

    // 見出し要素を監視
    const observeElements = () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) {
          observer.observe(element)
        }
      })
    }

    // 要素の描画を待つ
    setTimeout(observeElements, 500)

    return () => observer.disconnect()
  }, [headings])

  // 見出しクリック時のスクロール
  const handleClick = (id: string) => {
    console.log(`クリックされた見出しID: ${id}`)
    
    const element = document.getElementById(id)
    if (!element) {
      console.error(`要素が見つかりません: ${id}`)
      console.log('利用可能な要素:', Array.from(document.querySelectorAll('[id]')).map(el => el.id))
      return
    }

    console.log(`要素が見つかりました:`, element)
    
    const headerHeight = 120 // ヘッダーの高さ
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const targetPosition = elementPosition - headerHeight

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    })

    // URLハッシュを更新
    window.history.replaceState(null, '', `#${id}`)
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <Card className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">目次</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <nav>
          <ul className="space-y-1">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => handleClick(heading.id)}
                  className={`
                    w-full text-left text-sm py-2 px-3 rounded-md transition-all
                    hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${heading.level === 3 ? 'ml-4 text-gray-600 text-xs' : 'text-gray-800'}
                    ${activeId === heading.id 
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500 font-medium' 
                      : 'border-l-4 border-transparent'
                    }
                  `}
                >
                  {heading.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  )
}