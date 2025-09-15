// Portable Text types for content blocks
export interface PortableTextBlock {
  _type: 'block'
  _key: string
  style?: 'normal' | 'h2' | 'h3' | 'h4' | 'blockquote'
  children: PortableTextChild[]
  markDefs?: PortableTextMarkDef[]
  listItem?: 'bullet' | 'number'
  level?: number
}

export interface PortableTextChild {
  _type: 'span'
  _key: string
  text: string
  marks?: string[]
}

export interface PortableTextMarkDef {
  _type: 'link'
  _key: string
  href: string
  blank?: boolean
}

export type PortableText = PortableTextBlock[]

export interface HomepageContent {
  _id: string
  _type: 'homepage'
  hero: HeroSection
  problem: ProblemSection
  solution: SolutionSection
  testimonials: TestimonialsSection
  b2b: B2BSection
  partners: PartnersSection
  contact: ContactSection
  seo?: SEOFields
}

export interface HeroSection {
  title: string
  subtitle: PortableText
  primaryButton: Button
  secondaryButton: Button
}

export interface ProblemSection {
  title: string
  statistics: Statistic[]
}

export interface Statistic {
  value: string
  description: PortableText
  type: 'number' | 'percentage' | 'chart'
  chartData?: ChartItem[]
}

export interface ChartItem {
  name: string
  value: number
}

export interface SolutionSection {
  title: string
  features: Feature[]
}

export interface Feature {
  icon: string
  title: string
  description: PortableText
}

export interface TestimonialsSection {
  title: string
  testimonialList: Testimonial[]
}

export interface Testimonial {
  name: string
  title: string
  quote: PortableText
  rating: number
}

export interface B2BSection {
  title: string
  challenges: ChallengeSolution[]
  ctaButton: Button
}

export interface ChallengeSolution {
  challenge: PortableText
  solution: PortableText
}

export interface PartnersSection {
  partnerLogos: Partner[]
}

export interface Partner {
  name: string
  logo?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
  }
  website?: string
}

export interface ContactSection {
  title: string
  subtitle: PortableText
  description: PortableText
  contactMethods: ContactMethod[]
}

export interface ContactMethod {
  type: 'email' | 'phone' | 'consultation' | 'response'
  title: string
  value: string
  icon?: 'email' | 'phone' | 'users' | 'clock'
}

export interface Button {
  text: string
  link: string
}

export interface SEOFields {
  metaTitle?: string
  metaDescription?: PortableText
  ogImage?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
  }
}

// Helper types for queries
export interface HomepageQueryResult {
  homepage: HomepageContent
}

export interface HomepagePreview {
  title: string
  subtitle: string
}
