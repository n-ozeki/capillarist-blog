import React from 'react'
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

export const mdxComponents = {
  h1: createHeadingComponent(1),
  h2: createHeadingComponent(2),
  h3: createHeadingComponent(3),
  h4: createHeadingComponent(4),
  h5: createHeadingComponent(5),
  h6: createHeadingComponent(6),
}