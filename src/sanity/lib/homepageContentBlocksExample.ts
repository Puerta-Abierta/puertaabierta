/**
 * Example implementation showing how to use content blocks in the homepage schema
 * This demonstrates the rich text editing capabilities and how to work with PortableText
 */

import React from 'react'
import { client } from './client'
import { homepageQuery } from './homepageQueries'
import { 
  getHomepageTitle, 
  getHomepageSubtitle, 
  getHomepageSubtitlePortableText,
  getProblemStatisticsWithPlainText,
  getSolutionFeaturesWithPlainText,
  getTestimonialsWithPlainText,
  getB2BChallengesWithPlainText,
  getContactSubtitlePortableText,
  getContactDescriptionPortableText,
  portableTextToPlainText,
  portableTextToHTML
} from './homepageHelpers'
import { HomepageContent, PortableText } from './homepageTypes'

/**
 * Example: Fetch homepage content and work with content blocks
 */
export async function getHomepageContentWithBlocks(): Promise<HomepageContent | null> {
  try {
    const homepage = await client.fetch(homepageQuery)
    return homepage
  } catch (error) {
    console.error('Error fetching homepage content:', error)
    return null
  }
}

/**
 * Example: Render content blocks in React components
 */
export const contentBlockRenderingExamples = {
  // Example 1: Simple text rendering
  renderSimpleText: (portableText: PortableText) => {
    const plainText = portableTextToPlainText(portableText)
    return <p>{plainText}</p>
  },

  // Example 2: HTML rendering with formatting
  renderHTML: (portableText: PortableText) => {
    const html = portableTextToHTML(portableText)
    return <div dangerouslySetInnerHTML={{ __html: html }} />
  },

  // Example 3: Custom React component rendering
  renderCustom: (portableText: PortableText) => {
    return (
      <div className="content-blocks">
        {portableText.map((block, index) => {
          if (block._type === 'block') {
            const text = block.children
              ?.map(child => child.text || '')
              .join('') || ''

            switch (block.style) {
              case 'h2':
                return <h2 key={block._key || index}>{text}</h2>
              case 'h3':
                return <h3 key={block._key || index}>{text}</h3>
              case 'h4':
                return <h4 key={block._key || index}>{text}</h4>
              case 'blockquote':
                return <blockquote key={block._key || index}>{text}</blockquote>
              default:
                return <p key={block._key || index}>{text}</p>
            }
          }
          return null
        })}
      </div>
    )
  }
}

/**
 * Example: Complete homepage data with content blocks
 */
export async function getHomepageDataWithContentBlocks() {
  const homepage = await getHomepageContentWithBlocks()
  
  if (!homepage) {
    throw new Error('Failed to fetch homepage content')
  }

  return {
    // Hero section with content blocks
    hero: {
      title: getHomepageTitle(homepage),
      subtitle: getHomepageSubtitlePortableText(homepage), // Returns PortableText
      subtitlePlainText: getHomepageSubtitle(homepage), // Returns plain text
      primaryButton: homepage.hero.primaryButton,
      secondaryButton: homepage.hero.secondaryButton,
    },
    
    // Problem section with statistics
    problem: {
      title: homepage.problem.title,
      statistics: getProblemStatisticsWithPlainText(homepage), // Converts to plain text
      statisticsRaw: homepage.problem.statistics, // Raw PortableText data
    },
    
    // Solution section with features
    solution: {
      title: homepage.solution.title,
      features: getSolutionFeaturesWithPlainText(homepage), // Converts to plain text
      featuresRaw: homepage.solution.features, // Raw PortableText data
    },
    
    // Testimonials section
    testimonials: {
      title: homepage.testimonials.title,
      testimonialList: getTestimonialsWithPlainText(homepage), // Converts to plain text
      testimonialListRaw: homepage.testimonials.testimonialList, // Raw PortableText data
    },
    
    // B2B section
    b2b: {
      title: homepage.b2b.title,
      challenges: getB2BChallengesWithPlainText(homepage), // Converts to plain text
      challengesRaw: homepage.b2b.challenges, // Raw PortableText data
      ctaButton: homepage.b2b.ctaButton,
    },
    
    // Contact section
    contact: {
      title: homepage.contact.title,
      subtitle: getContactSubtitlePortableText(homepage), // Returns PortableText
      subtitlePlainText: getContactSubtitle(homepage), // Returns plain text
      description: getContactDescriptionPortableText(homepage), // Returns PortableText
      descriptionPlainText: getContactDescription(homepage), // Returns plain text
      contactMethods: homepage.contact.contactMethods,
    },
  }
}

/**
 * Example: React component using content blocks
 */
export const HomepageComponentExample = `
// Example React component using content blocks
import { getHomepageDataWithContentBlocks } from '@/sanity/lib/homepageContentBlocksExample'
import { PortableText } from '@portabletext/react'

export default async function HomePage() {
  const data = await getHomepageDataWithContentBlocks()
  
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>{data.hero.title}</h1>
        <PortableText value={data.hero.subtitle} />
        {/* Or use plain text: <p>{data.hero.subtitlePlainText}</p> */}
      </section>
      
      {/* Problem Section */}
      <section className="problem">
        <h2>{data.problem.title}</h2>
        {data.problem.statistics.map((stat, index) => (
          <div key={index}>
            <h3>{stat.value}</h3>
            <p>{stat.description}</p>
          </div>
        ))}
      </section>
      
      {/* Solution Section */}
      <section className="solution">
        <h2>{data.solution.title}</h2>
        {data.solution.features.map((feature, index) => (
          <div key={index}>
            <span>{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>{data.testimonials.title}</h2>
        {data.testimonials.testimonialList.map((testimonial, index) => (
          <div key={index}>
            <p>"{testimonial.quote}"</p>
            <p><strong>{testimonial.name}</strong> - {testimonial.title}</p>
            <div>Rating: {'★'.repeat(testimonial.rating)}</div>
          </div>
        ))}
      </section>
      
      {/* B2B Section */}
      <section className="b2b">
        <h2>{data.b2b.title}</h2>
        {data.b2b.challenges.map((challenge, index) => (
          <div key={index}>
            <h3>Challenge</h3>
            <p>{challenge.challenge}</p>
            <h3>Solution</h3>
            <p>{challenge.solution}</p>
          </div>
        ))}
      </section>
      
      {/* Contact Section */}
      <section className="contact">
        <h2>{data.contact.title}</h2>
        <PortableText value={data.contact.subtitle} />
        <PortableText value={data.contact.description} />
        {/* Or use plain text versions */}
      </section>
    </div>
  )
}
`

/**
 * Example: Using @portabletext/react for rich rendering
 */
export const portableTextReactExample = `
// Install: npm install @portabletext/react
import { PortableText } from '@portabletext/react'

// Basic usage
<PortableText value={homepage.hero.subtitle} />

// With custom components
<PortableText 
  value={homepage.hero.subtitle}
  components={{
    block: {
      h2: ({children}) => <h2 className="text-2xl font-bold">{children}</h2>,
      h3: ({children}) => <h3 className="text-xl font-semibold">{children}</h3>,
      normal: ({children}) => <p className="text-gray-600">{children}</p>,
      blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic">{children}</blockquote>
    },
    marks: {
      strong: ({children}) => <strong className="font-bold">{children}</strong>,
      em: ({children}) => <em className="italic">{children}</em>,
      code: ({children}) => <code className="bg-gray-100 px-1 rounded">{children}</code>,
      link: ({children, value}) => (
        <a href={value.href} target={value.blank ? '_blank' : '_self'} className="text-blue-600 hover:underline">
          {children}
        </a>
      )
    }
  }}
/>
`

/**
 * Example: Content block validation
 */
export function validateContentBlocks(portableText: PortableText): boolean {
  if (!Array.isArray(portableText)) return false
  
  return portableText.every(block => {
    if (block._type !== 'block') return false
    if (!block.children || !Array.isArray(block.children)) return false
    
    return block.children.every(child => {
      return child._type === 'span' && typeof child.text === 'string'
    })
  })
}

/**
 * Example: Content block utilities
 */
export const contentBlockUtils = {
  // Get word count from content blocks
  getWordCount: (portableText: PortableText): number => {
    const text = portableTextToPlainText(portableText)
    return text.split(/\s+/).filter(word => word.length > 0).length
  },
  
  // Get character count from content blocks
  getCharacterCount: (portableText: PortableText): number => {
    return portableTextToPlainText(portableText).length
  },
  
  // Check if content blocks are empty
  isEmpty: (portableText: PortableText): boolean => {
    return portableTextToPlainText(portableText).trim().length === 0
  },
  
  // Extract all links from content blocks
  extractLinks: (portableText: PortableText): string[] => {
    const links: string[] = []
    
    portableText.forEach(block => {
      if (block._type === 'block' && block.markDefs) {
        block.markDefs.forEach(markDef => {
          if (markDef._type === 'link') {
            links.push(markDef.href)
          }
        })
      }
    })
    
    return links
  }
}
