import React from 'react'
import Link from 'next/link'
import { generateId } from '@/lib/toc-utils'

function createHeadingComponent(level: number) {
  const HeadingComponent = ({ children, ...props }: any) => {
    const text = React.Children.toArray(children).join('')
    let id = generateId(text)

    // 空のIDの場合はフォールバック
    if (!id) {
      id = `heading-${level}-${Date.now()}`
    }

    // console.log(`MDX見出し生成 - レベル${level}: "${text}" -> ID: "${id}"`)

    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements

    return React.createElement(Tag, {
      id,
      ...props,
      className: `scroll-mt-28 ${props.className || ''}`, // スクロール時のオフセット
    }, children)
  }

  HeadingComponent.displayName = `H${level}`
  return HeadingComponent
}

const CustomLink = ({ href, children, ...props }: any) => {
  // 内部リンクかどうかを判定
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))
  const isCapillaristLink = href && href.includes('capillarist.com')

  // capillarist.comのリンクの場合、相対パスに変換
  if (isCapillaristLink) {
    const url = new URL(href)
    href = url.pathname
  }

  // 内部リンクの場合はNext.js Linkを使用
  if (isInternalLink || isCapillaristLink) {
    return (
      <Link href={href} {...props} className="text-blue-600 hover:text-blue-800 underline">
        {children}
      </Link>
    )
  }

  // 外部リンクの場合は通常のaタグ
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props} className="text-blue-600 hover:text-blue-800 underline">
      {children}
    </a>
  )
}

export const mdxComponents = {
  h1: createHeadingComponent(1),
  h2: createHeadingComponent(2),
  h3: createHeadingComponent(3),
  h4: createHeadingComponent(4),
  h5: createHeadingComponent(5),
  h6: createHeadingComponent(6),
  a: CustomLink,
}