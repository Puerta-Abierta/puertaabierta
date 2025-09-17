import { serverClient } from './serverClient'
import {
  getAllStripeLinksQuery,
  getActiveStripeLinksQuery,
  getStripeLinksByCourseQuery,
  getActiveStripeLinksByCourseQuery,
  getStripeLinkByIdQuery,
  getStripeLinksByPricingTypeQuery,
  searchStripeLinksQuery,
  getStripeLinkStatsQuery
} from './stripeQueries'
import { StripeLink, StripeLinkFilters, StripeLinkStats } from './stripeTypes'

// Get all Stripe links
export async function getAllStripeLinks(): Promise<StripeLink[]> {
  return await serverClient.fetch(getAllStripeLinksQuery)
}

// Get active Stripe links only
export async function getActiveStripeLinks(): Promise<StripeLink[]> {
  return await serverClient.fetch(getActiveStripeLinksQuery)
}

// Get Stripe links by course slug
export async function getStripeLinksByCourse(courseSlug: string): Promise<StripeLink[]> {
  return await serverClient.fetch(getStripeLinksByCourseQuery, { courseSlug })
}

// Get active Stripe links by course slug
export async function getActiveStripeLinksByCourse(courseSlug: string): Promise<StripeLink[]> {
  return await serverClient.fetch(getActiveStripeLinksByCourseQuery, { courseSlug })
}

// Get a single Stripe link by ID
export async function getStripeLinkById(id: string): Promise<StripeLink | null> {
  const stripeLink = await serverClient.fetch(getStripeLinkByIdQuery, { id })
  return stripeLink || null
}

// Get Stripe links by pricing type
export async function getStripeLinksByPricingType(pricingType: 'individual' | 'package' | 'custom'): Promise<StripeLink[]> {
  return await serverClient.fetch(getStripeLinksByPricingTypeQuery, { pricingType })
}

// Search Stripe links
export async function searchStripeLinks(searchTerm: string): Promise<StripeLink[]> {
  return await serverClient.fetch(searchStripeLinksQuery, { 
    search: `*${searchTerm}*` 
  })
}

// Get Stripe link statistics
export async function getStripeLinkStats(): Promise<StripeLinkStats> {
  return await serverClient.fetch(getStripeLinkStatsQuery)
}

// Filter Stripe links based on criteria
export async function filterStripeLinks(filters: StripeLinkFilters): Promise<StripeLink[]> {
  let stripeLinks = await getAllStripeLinks()
  
  if (filters.courseSlug) {
    stripeLinks = stripeLinks.filter(link => 
      link.courseSlug === filters.courseSlug
    )
  }
  
  if (filters.isActive !== undefined) {
    stripeLinks = stripeLinks.filter(link => 
      link.isActive === filters.isActive
    )
  }
  
  if (filters.pricingType) {
    stripeLinks = stripeLinks.filter(link => 
      link.pricingType === filters.pricingType
    )
  }
  
  return stripeLinks
}

// Get primary Stripe link for a course (lowest price active link)
export async function getPrimaryStripeLinkForCourse(courseSlug: string): Promise<StripeLink | null> {
  const activeLinks = await getActiveStripeLinksByCourse(courseSlug)
  if (activeLinks.length === 0) return null
  
  return activeLinks.reduce((lowest, current) => 
    current.price < lowest.price ? current : lowest
  )
}

// Get all Stripe links grouped by course
export async function getStripeLinksGroupedByCourse(): Promise<Record<string, StripeLink[]>> {
  const stripeLinks = await getAllStripeLinks()
  
  return stripeLinks.reduce((grouped, link) => {
    if (!grouped[link.courseSlug]) {
      grouped[link.courseSlug] = []
    }
    grouped[link.courseSlug].push(link)
    return grouped
  }, {} as Record<string, StripeLink[]>)
}

// Get pricing options for a course
export async function getCoursePricingOptions(courseSlug: string): Promise<{
  individual?: StripeLink
  packages: StripeLink[]
  custom?: StripeLink
}> {
  const activeLinks = await getActiveStripeLinksByCourse(courseSlug)
  
  const individual = activeLinks.find(link => link.pricingType === 'individual')
  const packages = activeLinks.filter(link => link.pricingType === 'package')
  const custom = activeLinks.find(link => link.pricingType === 'custom')
  
  return {
    individual,
    packages,
    custom
  }
}

// Validate Stripe link data
export function validateStripeLink(stripeLink: Partial<StripeLink>): string[] {
  const errors: string[] = []
  
  if (!stripeLink.courseSlug) {
    errors.push('Course slug is required')
  }
  
  if (!stripeLink.stripeUrl) {
    errors.push('Stripe URL is required')
  } else if (!stripeLink.stripeUrl.startsWith('https://')) {
    errors.push('Stripe URL must be HTTPS')
  }
  
  if (!stripeLink.priceId) {
    errors.push('Price ID is required')
  }
  
  if (stripeLink.price === undefined || stripeLink.price < 0) {
    errors.push('Price must be a positive number')
  }
  
  if (!stripeLink.pricingType) {
    errors.push('Pricing type is required')
  }
  
  if (stripeLink.pricingType === 'package' && (!stripeLink.hours || stripeLink.hours <= 0)) {
    errors.push('Hours must be specified for package pricing')
  }
  
  return errors
}

