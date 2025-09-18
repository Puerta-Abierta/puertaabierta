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
  toast?: ToastSection
  hero: HeroSection
  problem: ProblemSection
  solution: SolutionSection
  testimonials: TestimonialsSection
  b2b: B2BSection
  partners: PartnersSection
  contact: ContactSection
  featuredImage?: {
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
  seo?: SEOFields
}

export interface ToastSection {
  enabled: boolean
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration: number
  position: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
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

// Pricing page types
export interface PricingContent {
  _id: string
  _type: 'pricing'
  hero: PricingHeroSection
  plans: PricingPlansSection
  packages: PricingPackagesSection
  faq: PricingFAQSection
}

export interface PricingHeroSection {
  title: string
  subtitle: string
  description: string
}

export interface PricingPlansSection {
  title: string
  subtitle: string
  plans: PricingPlan[]
}

export interface PricingPackagesSection {
  title: string
  packages: PricingPackage[]
}

export interface PricingPackage {
  hours: string
  price: number
  description: string
}

export interface PricingPlan {
  name: string
  price: number
  period: string
  description: string
  minStudents: string
  features: string[]
  cta: string
  ctaLink: string
  popular: boolean
}

export interface PricingFeaturesSection {
  title: string
  subtitle: string
  features: PricingFeature[]
}

export interface PricingFeature {
  icon: string
  title: string
  description: string
}

export interface PricingFAQSection {
  title: string
  subtitle: string
  faqs: PricingFAQ[]
}

export interface PricingFAQ {
  question: string
  answer: string
}

export interface PricingCTASection {
  title: string
  subtitle: string
  primaryButton: Button
  secondaryButton: Button
}

// Helper types for queries
export interface HomepageQueryResult {
  homepage: HomepageContent
}

export interface HomepagePreview {
  title: string
  subtitle: string
}
