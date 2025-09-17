import React from 'react'
import { PortableTextBlock } from '@/sanity/lib/homepageTypes'

interface PortableTextRendererProps {
  content: PortableTextBlock[] | undefined
  className?: string
}

export default function PortableTextRenderer({ content, className = '' }: PortableTextRendererProps) {
  if (!content || !Array.isArray(content)) {
    return null
  }

  return (
    <div className={className}>
      {content.map((block, index) => {
        if (block._type !== 'block' || !block.children) {
          return null
        }

        const text = block.children
          .map((child: { text?: string }) => child.text || '')
          .join('')

        if (!text) return null

        // Handle different block styles
        const getBlockElement = () => {
          switch (block.style) {
            case 'h2':
              return <h2 className="text-2xl md:text-3xl font-bold mb-4">{text}</h2>
            case 'h3':
              return <h3 className="text-xl md:text-2xl font-bold mb-3">{text}</h3>
            case 'h4':
              return <h4 className="text-lg md:text-xl font-bold mb-2">{text}</h4>
            case 'blockquote':
              return <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">{text}</blockquote>
            case 'normal':
            default:
              return <p className="mb-4">{text}</p>
          }
        }

        // Handle marks (bold, italic, code, links)
        const renderTextWithMarks = (text: string, marks: string[] = []) => {
          if (!marks || marks.length === 0) {
            return text
          }

          let result: React.ReactNode = text
          
          marks.forEach((mark, index) => {
            switch (mark) {
              case 'strong':
                result = <strong key={`${mark}-${index}`}>{result}</strong>
                break
              case 'em':
                result = <em key={`${mark}-${index}`}>{result}</em>
                break
              case 'code':
                result = <code key={`${mark}-${index}`} className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{result}</code>
                break
              default:
                // Handle custom marks if needed
                break
            }
          })

          return result
        }

        // Render children with marks
        const renderChildren = () => {
          return block.children.map((child: { _type: string; text?: string; marks?: string[] }, childIndex: number) => {
            if (child._type !== 'span') return null

            const text = child.text || ''
            const marks = child.marks || []

            return (
              <span key={childIndex}>
                {renderTextWithMarks(text, marks)}
              </span>
            )
          })
        }

        return (
          <div key={index}>
            {block.style === 'normal' ? (
              <p className="mb-4">
                {renderChildren()}
              </p>
            ) : (
              getBlockElement()
            )}
          </div>
        )
      })}
    </div>
  )
}
