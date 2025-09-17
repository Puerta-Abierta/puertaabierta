export interface StripeLink {
  _id: string
  _createdAt: string
  _updatedAt: string
  courseSlug: string
  stripeUrl: string
  priceId: string
  price: number
  isActive: boolean
  description?: string
  pricingType: 'individual' | 'package' | 'custom'
  hours?: number
}

export interface StripeLinkFilters {
  courseSlug?: string
  isActive?: boolean
  pricingType?: 'individual' | 'package' | 'custom'
}

export interface StripeLinkStats {
  totalLinks: number
  activeLinks: number
  totalRevenue: number
}

