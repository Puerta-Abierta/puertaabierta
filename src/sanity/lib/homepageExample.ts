/**
 * Example implementation of how to use the homepage schema and helpers
 * This file demonstrates how to fetch and use homepage content from Sanity
 */

import { client } from './client'
import { homepageQuery } from './homepageQueries'
import { 
  getHomepageTitle, 
  getHomepageSubtitle, 
  getPrimaryButton, 
  getSecondaryButton,
  getProblemStatistics,
  getProblemTitle,
  getSolutionFeatures,
  getSolutionTitle,
  getTestimonials,
  getTestimonialsTitle,
  getB2BChallenges,
  getB2BTitle,
  getB2BCTAButton,
  getPartnerLogos,
  getContactMethods,
  getContactTitle,
  getContactSubtitle,
  getContactDescription,
  getMetaTitle,
  getMetaDescription,
  getOGImage,
  isHomepageContentValid,
  getDefaultHomepageContent
} from './homepageHelpers'
import { HomepageContent } from './homepageTypes'

/**
 * Fetch homepage content from Sanity
 */
export async function fetchHomepageContent(): Promise<HomepageContent | null> {
  try {
    const homepage = await client.fetch(homepageQuery)
    return homepage
  } catch (error) {
    console.error('Error fetching homepage content:', error)
    return null
  }
}

/**
 * Get homepage content with fallbacks
 */
export async function getHomepageContent(): Promise<HomepageContent> {
  const homepage = await fetchHomepageContent()
  
  if (!homepage || !isHomepageContentValid(homepage)) {
    console.warn('Homepage content is invalid or missing, using defaults')
    return getDefaultHomepageContent() as HomepageContent
  }
  
  return homepage
}

/**
 * Example React component data fetching
 */
export async function getHomepageData() {
  const homepage = await getHomepageContent()
  
  return {
    // Hero section
    hero: {
      title: getHomepageTitle(homepage),
      subtitle: getHomepageSubtitle(homepage),
      primaryButton: getPrimaryButton(homepage),
      secondaryButton: getSecondaryButton(homepage),
    },
    
    // Problem section
    problem: {
      title: getProblemTitle(homepage),
      statistics: getProblemStatistics(homepage),
    },
    
    // Solution section
    solution: {
      title: getSolutionTitle(homepage),
      features: getSolutionFeatures(homepage),
    },
    
    // Testimonials section
    testimonials: {
      title: getTestimonialsTitle(homepage),
      testimonialList: getTestimonials(homepage),
    },
    
    // B2B section
    b2b: {
      title: getB2BTitle(homepage),
      challenges: getB2BChallenges(homepage),
      ctaButton: getB2BCTAButton(homepage),
    },
    
    // Partners section
    partners: {
      partnerLogos: getPartnerLogos(homepage),
    },
    
    // Contact section
    contact: {
      title: getContactTitle(homepage),
      subtitle: getContactSubtitle(homepage),
      description: getContactDescription(homepage),
      contactMethods: getContactMethods(homepage),
    },
    
    // SEO
    seo: {
      metaTitle: getMetaTitle(homepage),
      metaDescription: getMetaDescription(homepage),
      ogImage: getOGImage(homepage),
    },
  }
}

/**
 * Example of how to use in a Next.js page component
 */
export const examplePageUsage = `
// In your page component (e.g., src/app/(app)/page.tsx)
import { getHomepageData } from '@/sanity/lib/homepageExample'

export default async function HomePage() {
  const data = await getHomepageData()
  
  return (
    <>
      <Hero 
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        primaryButton={data.hero.primaryButton}
        secondaryButton={data.hero.secondaryButton}
      />
      <Problem 
        title={data.problem.title}
        statistics={data.problem.statistics}
      />
      <Solution 
        title={data.solution.title}
        features={data.solution.features}
      />
      <Testimonials 
        title={data.testimonials.title}
        testimonials={data.testimonials.testimonialList}
      />
      <B2B 
        title={data.b2b.title}
        challenges={data.b2b.challenges}
        ctaButton={data.b2b.ctaButton}
      />
      <Partners 
        partners={data.partners.partnerLogos}
      />
      <ContactSection 
        title={data.contact.title}
        subtitle={data.contact.subtitle}
        description={data.contact.description}
        contactMethods={data.contact.contactMethods}
      />
    </>
  )
}
`

/**
 * Example of how to use individual queries for specific sections
 */
export async function getHeroData() {
  const { client } = await import('./client')
  const { heroQuery } = await import('./homepageQueries')
  
  try {
    const data = await client.fetch(heroQuery)
    return data.hero
  } catch (error) {
    console.error('Error fetching hero data:', error)
    return null
  }
}

export async function getProblemData() {
  const { client } = await import('./client')
  const { problemQuery } = await import('./homepageQueries')
  
  try {
    const data = await client.fetch(problemQuery)
    return data.problem
  } catch (error) {
    console.error('Error fetching problem data:', error)
    return null
  }
}

/**
 * Example of how to create a homepage content in Sanity Studio
 */
export const exampleSanityContent = `
// To create homepage content in Sanity Studio:
// 1. Go to your Sanity Studio
// 2. Create a new "Homepage Content" document
// 3. Fill in the following structure:

{
  "hero": {
    "title": "Financial Literacy for the Next Generation",
    "subtitle": "Join the thousands of students who use Puerta Abierta to build financial skills, gain mentorship, and unlock their potential for a brighter future.",
    "primaryButton": {
      "text": "Book Free Intro Session",
      "link": "/mentors"
    },
    "secondaryButton": {
      "text": "Explore Services", 
      "link": "/services"
    }
  },
  "problem": {
    "title": "Financial stress is the #1 reason for College Dropout",
    "statistics": [
      {
        "value": "$352B",
        "description": "Lost by U.S. adults in 2021 due to financial illiteracy",
        "type": "number"
      },
      {
        "value": "73%",
        "description": "of U.S. Students not confident in their financial education",
        "type": "chart",
        "chartData": [
          { "name": "Need Education", "value": 73 },
          { "name": "No Access", "value": 27 }
        ]
      }
    ]
  }
  // ... continue with other sections
}
`

