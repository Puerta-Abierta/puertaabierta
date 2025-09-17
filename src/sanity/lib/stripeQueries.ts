import { groq } from 'next-sanity'

// Base Stripe link query with all fields
const stripeLinkFields = `
  _id,
  _createdAt,
  _updatedAt,
  courseSlug,
  stripeUrl,
  priceId,
  price,
  isActive,
  description,
  pricingType,
  hours
`

// Get all Stripe links
export const getAllStripeLinksQuery = groq`
  *[_type == "stripeLink"] | order(courseSlug asc, price asc) {
    ${stripeLinkFields}
  }
`

// Get active Stripe links only
export const getActiveStripeLinksQuery = groq`
  *[_type == "stripeLink" && isActive == true] | order(courseSlug asc, price asc) {
    ${stripeLinkFields}
  }
`

// Get Stripe links by course slug
export const getStripeLinksByCourseQuery = groq`
  *[_type == "stripeLink" && courseSlug == $courseSlug] | order(price asc) {
    ${stripeLinkFields}
  }
`

// Get active Stripe links by course slug
export const getActiveStripeLinksByCourseQuery = groq`
  *[_type == "stripeLink" && courseSlug == $courseSlug && isActive == true] | order(price asc) {
    ${stripeLinkFields}
  }
`

// Get Stripe link by ID
export const getStripeLinkByIdQuery = groq`
  *[_type == "stripeLink" && _id == $id][0] {
    ${stripeLinkFields}
  }
`

// Get Stripe links by pricing type
export const getStripeLinksByPricingTypeQuery = groq`
  *[_type == "stripeLink" && pricingType == $pricingType && isActive == true] | order(price asc) {
    ${stripeLinkFields}
  }
`

// Search Stripe links
export const searchStripeLinksQuery = groq`
  *[_type == "stripeLink" && (courseSlug match $search || description match $search)] | order(courseSlug asc, price asc) {
    ${stripeLinkFields}
  }
`

// Get Stripe link statistics
export const getStripeLinkStatsQuery = groq`
  {
    "totalLinks": count(*[_type == "stripeLink"]),
    "activeLinks": count(*[_type == "stripeLink" && isActive == true]),
    "totalRevenue": sum(*[_type == "stripeLink" && isActive == true].price)
  }
`

