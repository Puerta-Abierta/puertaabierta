import { HomepageContent, Statistic, Testimonial, Partner, ContactMethod, PortableText } from './homepageTypes'
import { serverClient } from './serverClient'

/**
 * Convert PortableText to plain text
 */
export function portableTextToPlainText(portableText: PortableText | undefined): string {
  if (!portableText || !Array.isArray(portableText)) {
    return ''
  }
  
  return portableText
    .map(block => {
      if (block._type === 'block' && block.children) {
        return block.children
          .map(child => child.text || '')
          .join('')
      }
      return ''
    })
    .join('\n')
    .trim()
}

/**
 * Convert PortableText to HTML (basic implementation)
 */
export function portableTextToHTML(portableText: PortableText | undefined): string {
  if (!portableText || !Array.isArray(portableText)) {
    return ''
  }
  
  return portableText
    .map(block => {
      if (block._type === 'block' && block.children) {
        const text = block.children
          .map(child => {
            let text = child.text || ''
            
            // Apply marks
            if (child.marks) {
              child.marks.forEach(mark => {
                switch (mark) {
                  case 'strong':
                    text = `<strong>${text}</strong>`
                    break
                  case 'em':
                    text = `<em>${text}</em>`
                    break
                  case 'code':
                    text = `<code>${text}</code>`
                    break
                }
              })
            }
            
            return text
          })
          .join('')
        
        // Apply block styles
        switch (block.style) {
          case 'h2':
            return `<h2>${text}</h2>`
          case 'h3':
            return `<h3>${text}</h3>`
          case 'h4':
            return `<h4>${text}</h4>`
          case 'blockquote':
            return `<blockquote>${text}</blockquote>`
          default:
            return `<p>${text}</p>`
        }
      }
      return ''
    })
    .join('')
}

/**
 * Get the complete homepage content from Sanity
 */
export async function getHomepageContent(): Promise<HomepageContent | Partial<HomepageContent> | null> {
  try {
    const homepage = await serverClient.fetch(`
      *[_type == "homepage"][0] {
        ...,
        hero {
          ...,
          subtitle[] {
            ...,
            children[] {
              ...,
              marks[] {
                ...,
                _type == "link" => {
                  ...,
                  href
                }
              }
            }
          }
        },
        problem {
          ...,
          statistics[] {
            ...,
            description[] {
              ...,
              children[] {
                ...,
                marks[] {
                  ...,
                  _type == "link" => {
                    ...,
                    href
                  }
                }
              }
            }
          }
        },
        solution {
          ...,
          features[] {
            ...,
            description[] {
              ...,
              children[] {
                ...,
                marks[] {
                  ...,
                  _type == "link" => {
                    ...,
                    href
                  }
                }
              }
            }
          }
        },
        b2b {
          ...,
          challenges[] {
            ...,
            challenge[] {
              ...,
              children[] {
                ...,
                marks[] {
                  ...,
                  _type == "link" => {
                    ...,
                    href
                  }
                }
              }
            },
            solution[] {
              ...,
              children[] {
                ...,
                marks[] {
                  ...,
                  _type == "link" => {
                    ...,
                    href
                  }
                }
              }
            }
          }
        },
        testimonials {
          ...,
          testimonialList[] {
            ...,
            quote[] {
              ...,
              children[] {
                ...,
                marks[] {
                  ...,
                  _type == "link" => {
                    ...,
                    href
                  }
                }
              }
            }
          }
        },
        partners {
          ...,
          partnerLogos[] {
            ...,
            logo {
              ...,
              asset->
            }
          }
        },
        contact {
          ...,
          subtitle[] {
            ...,
            children[] {
              ...,
              marks[] {
                ...,
                _type == "link" => {
                  ...,
                  href
                }
              }
            }
          },
          description[] {
            ...,
            children[] {
              ...,
              marks[] {
                ...,
                _type == "link" => {
                  ...,
                  href
                }
              }
            }
          },
          contactInfo {
            ...,
            description[] {
              ...,
              children[] {
                ...,
                marks[] {
                  ...,
                  _type == "link" => {
                    ...,
                    href
                  }
                }
              }
            }
          }
        },
        seo {
          ...,
          metaDescription[] {
            ...,
            children[] {
              ...,
              marks[] {
                ...,
                _type == "link" => {
                  ...,
                  href
                }
              }
            }
          }
        }
      }
    `)
    
    return homepage || getDefaultHomepageContent()
  } catch (error) {
    console.error('Error fetching homepage content:', error)
    return getDefaultHomepageContent()
  }
}

/**
 * Get the main title from homepage content
 */
export function getHomepageTitle(homepage: HomepageContent): string {
  return homepage?.hero?.title || 'Puerta Abierta'
}

/**
 * Get the main subtitle from homepage content
 */
export function getHomepageSubtitle(homepage: HomepageContent): string {
  return portableTextToPlainText(homepage?.hero?.subtitle) || 'Join the thousands of students who use Puerta Abierta to build financial skills, gain mentorship, and unlock their potential for a brighter future.'
}

/**
 * Get the main subtitle as PortableText from homepage content
 */
export function getHomepageSubtitlePortableText(homepage: HomepageContent): PortableText {
  return homepage?.hero?.subtitle || []
}

/**
 * Get primary CTA button from homepage content
 */
export function getPrimaryButton(homepage: HomepageContent) {
  return homepage?.hero?.primaryButton || {
    text: 'Book Free Intro Session',
    link: '/mentors'
  }
}

/**
 * Get secondary CTA button from homepage content
 */
export function getSecondaryButton(homepage: HomepageContent) {
  return homepage?.hero?.secondaryButton || {
    text: 'Explore Services',
    link: '/services'
  }
}

/**
 * Get problem section statistics
 */
export function getProblemStatistics(homepage: HomepageContent): Statistic[] {
  return homepage?.problem?.statistics || []
}

/**
 * Get problem section statistics with plain text descriptions
 */
export function getProblemStatisticsWithPlainText(homepage: HomepageContent) {
  const statistics = getProblemStatistics(homepage)
  return statistics.map(stat => ({
    ...stat,
    description: portableTextToPlainText(stat.description)
  }))
}

/**
 * Get problem section title
 */
export function getProblemTitle(homepage: HomepageContent): string {
  return homepage?.problem?.title || 'Financial stress is the #1 reason for College Dropout'
}

/**
 * Get solution features
 */
export function getSolutionFeatures(homepage: HomepageContent) {
  return homepage?.solution?.features || []
}

/**
 * Get solution features with plain text descriptions
 */
export function getSolutionFeaturesWithPlainText(homepage: HomepageContent) {
  const features = getSolutionFeatures(homepage)
  return features.map(feature => ({
    ...feature,
    description: portableTextToPlainText(feature.description)
  }))
}

/**
 * Get solution section title
 */
export function getSolutionTitle(homepage: HomepageContent): string {
  return homepage?.solution?.title || 'We combine Intuit\'s trusted curriculum with mentorship that develops real-world skills in money management, career growth, and wellness.'
}

/**
 * Get testimonials
 */
export function getTestimonials(homepage: HomepageContent): Testimonial[] {
  return homepage?.testimonials?.testimonialList || []
}

/**
 * Get testimonials with plain text quotes
 */
export function getTestimonialsWithPlainText(homepage: HomepageContent) {
  const testimonials = getTestimonials(homepage)
  return testimonials.map(testimonial => ({
    ...testimonial,
    quote: portableTextToPlainText(testimonial.quote)
  }))
}

/**
 * Get testimonials section title
 */
export function getTestimonialsTitle(homepage: HomepageContent): string {
  return homepage?.testimonials?.title || 'College applications are simpler with someone to guide you'
}

/**
 * Get B2B challenges and solutions
 */
export function getB2BChallenges(homepage: HomepageContent) {
  return homepage?.b2b?.challenges || []
}

/**
 * Get B2B challenges and solutions with plain text
 */
export function getB2BChallengesWithPlainText(homepage: HomepageContent) {
  const challenges = getB2BChallenges(homepage)
  return challenges.map(challenge => ({
    ...challenge,
    challenge: portableTextToPlainText(challenge.challenge),
    solution: portableTextToPlainText(challenge.solution)
  }))
}

/**
 * Get B2B section title
 */
export function getB2BTitle(homepage: HomepageContent): string {
  return homepage?.b2b?.title || 'Why Partner With Puerta Abierta?'
}

/**
 * Get B2B CTA button
 */
export function getB2BCTAButton(homepage: HomepageContent) {
  return homepage?.b2b?.ctaButton || {
    text: 'Schedule a Consultation',
    link: '/mentors'
  }
}

/**
 * Get partner logos
 */
export function getPartnerLogos(homepage: HomepageContent): Partner[] {
  return homepage?.partners?.partnerLogos || []
}

/**
 * Get contact methods
 */
export function getContactMethods(homepage: HomepageContent): ContactMethod[] {
  return homepage?.contact?.contactMethods || []
}

/**
 * Get contact section title
 */
export function getContactTitle(homepage: HomepageContent): string {
  return homepage?.contact?.title || 'Ready to Get Started?'
}

/**
 * Get contact section subtitle
 */
export function getContactSubtitle(homepage: HomepageContent): string {
  return portableTextToPlainText(homepage?.contact?.subtitle) || 'Have questions about our programs or want to learn more? Send us a message and we\'ll get back to you within 24 hours.'
}

/**
 * Get contact section subtitle as PortableText
 */
export function getContactSubtitlePortableText(homepage: HomepageContent): PortableText {
  return homepage?.contact?.subtitle || []
}

/**
 * Get contact section description
 */
export function getContactDescription(homepage: HomepageContent): string {
  return portableTextToPlainText(homepage?.contact?.description) || 'We\'re here to help you on your financial literacy journey. Whether you\'re a student, parent, or educator, we\'d love to hear from you.'
}

/**
 * Get contact section description as PortableText
 */
export function getContactDescriptionPortableText(homepage: HomepageContent): PortableText {
  return homepage?.contact?.description || []
}

/**
 * Get SEO meta title
 */
export function getMetaTitle(homepage: HomepageContent): string {
  return homepage?.seo?.metaTitle || getHomepageTitle(homepage)
}

/**
 * Get SEO meta description
 */
export function getMetaDescription(homepage: HomepageContent): string {
  return portableTextToPlainText(homepage?.seo?.metaDescription) || getHomepageSubtitle(homepage)
}

/**
 * Get SEO meta description as PortableText
 */
export function getMetaDescriptionPortableText(homepage: HomepageContent): PortableText {
  return homepage?.seo?.metaDescription || []
}

/**
 * Get Open Graph image
 */
export function getOGImage(homepage: HomepageContent) {
  return homepage?.seo?.ogImage
}

/**
 * Check if homepage content exists and has required fields
 */
export function isHomepageContentValid(homepage: HomepageContent | null): boolean {
  if (!homepage) return false
  
  return !!(
    homepage.hero?.title &&
    homepage.hero?.subtitle &&
    homepage.problem?.title &&
    homepage.solution?.title &&
    homepage.testimonials?.title &&
    homepage.b2b?.title &&
    homepage.contact?.title
  )
}

/**
 * Get default homepage content structure
 */
export function getDefaultHomepageContent(): Partial<HomepageContent> {
  return {
    hero: {
      title: 'Puerta Abierta',
      subtitle: [
        {
          _type: 'block',
          _key: 'hero-subtitle',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'hero-subtitle-text',
              text: 'Join the thousands of students who use Puerta Abierta to build financial skills, gain mentorship, and unlock their potential for a brighter future.'
            }
          ]
        }
      ],
      primaryButton: {
        text: 'Book Free Intro Session',
        link: '/mentors'
      },
      secondaryButton: {
        text: 'Explore Services',
        link: '/services'
      }
    },
    problem: {
      title: 'Financial stress is the #1 reason for College Dropout',
      statistics: [
        {
          value: '$352B',
          description: [
            {
              _type: 'block',
              _key: 'stat-1-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'stat-1-desc-text',
                  text: 'Lost by U.S. adults in 2021 due to financial illiteracy'
                }
              ]
            }
          ],
          type: 'number'
        },
        {
          value: '73%',
          description: [
            {
              _type: 'block',
              _key: 'stat-2-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'stat-2-desc-text',
                  text: 'of U.S. Students not confident in their financial education'
                }
              ]
            }
          ],
          type: 'chart',
          chartData: [
            { name: 'Need Education', value: 73 },
            { name: 'No Access', value: 27 }
          ]
        },
        {
          value: '59%',
          description: [
            {
              _type: 'block',
              _key: 'stat-3-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'stat-3-desc-text',
                  text: 'Of College students considered dropping out due to financial stress.'
                }
              ]
            }
          ],
          type: 'percentage'
        }
      ]
    },
    solution: {
      title: 'We combine Intuit\'s trusted curriculum with mentorship that develops real-world skills in money management, career growth, and wellness.',
      features: [
        {
          icon: '📘',
          title: 'Financial Literacy',
          description: [
            {
              _type: 'block',
              _key: 'feature-1-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'feature-1-desc-text',
                  text: 'Powered by Intuit\'s proven curriculum for real-world money management skills'
                }
              ]
            }
          ]
        },
        {
          icon: '🎯',
          title: 'Holistic Mentorship',
          description: [
            {
              _type: 'block',
              _key: 'feature-2-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'feature-2-desc-text',
                  text: 'Career guidance and personal growth support for comprehensive development'
                }
              ]
            }
          ]
        },
        {
          icon: '🤝',
          title: 'Enterprise Partnerships',
          description: [
            {
              _type: 'block',
              _key: 'feature-3-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'feature-3-desc-text',
                  text: 'Working with schools, centers, and organizations to reach students where they are'
                }
              ]
            }
          ]
        }
      ]
    },
    testimonials: {
      title: 'College applications are simpler with someone to guide you',
      testimonialList: [
        {
          name: 'Ben',
          title: 'High School Student',
          quote: [
            {
              _type: 'block',
              _key: 'testimonial-1-quote',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'testimonial-1-quote-text',
                  text: 'Puerta Abierta gave me the confidence and structure I needed for my college applications. I went from feeling completely overwhelmed to checking items off my application list step by step. It\'s exactly what I needed!'
                }
              ]
            }
          ],
          rating: 5
        },
        {
          name: 'Carlos Mendez',
          title: 'College Student',
          quote: [
            {
              _type: 'block',
              _key: 'testimonial-2-quote',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'testimonial-2-quote-text',
                  text: 'The guidance and support from Puerta Abierta helped me navigate the entire college application process with confidence. I finally understood what I needed to do and when to do it. Highly recommend!'
                }
              ]
            }
          ],
          rating: 5
        },
        {
          name: 'Sofia Garcia',
          title: 'Recent Graduate',
          quote: [
            {
              _type: 'block',
              _key: 'testimonial-3-quote',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'testimonial-3-quote-text',
                  text: 'Puerta Abierta broke down the complex college application process into manageable steps that I could actually follow. Thanks to their support, I got accepted to my dream school!'
                }
              ]
            }
          ],
          rating: 5
        }
      ]
    },
    b2b: {
      title: 'Why Partner With Puerta Abierta?',
      challenges: [
        {
          challenge: [
            {
              _type: 'block',
              _key: 'b2b-challenge-1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'b2b-challenge-1-text',
                  text: 'Students lack access to practical financial literacy education that prepares them for real-world challenges.'
                }
              ]
            }
          ],
          solution: [
            {
              _type: 'block',
              _key: 'b2b-solution-1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'b2b-solution-1-text',
                  text: 'We provide ready-to-use curriculum with measurable results, backed by Intuit\'s proven methodology.'
                }
              ]
            }
          ]
        },
        {
          challenge: [
            {
              _type: 'block',
              _key: 'b2b-challenge-2',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'b2b-challenge-2-text',
                  text: 'Institutions need credible partners they can trust to deliver quality financial education programs.'
                }
              ]
            }
          ],
          solution: [
            {
              _type: 'block',
              _key: 'b2b-solution-2',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'b2b-solution-2-text',
                  text: 'Our programs are backed by Intuit and trusted by UCI and NextUp, providing institutional credibility.'
                }
              ]
            }
          ]
        }
      ],
      ctaButton: {
        text: 'Schedule a Consultation',
        link: '/mentors'
      }
    },
    contact: {
      title: 'Ready to Get Started?',
      subtitle: [
        {
          _type: 'block',
          _key: 'contact-subtitle',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'contact-subtitle-text',
              text: 'Have questions about our programs or want to learn more? Send us a message and we\'ll get back to you within 24 hours.'
            }
          ]
        }
      ],
      description: [
        {
          _type: 'block',
          _key: 'contact-description',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'contact-description-text',
              text: 'We\'re here to help you on your financial literacy journey. Whether you\'re a student, parent, or educator, we\'d love to hear from you.'
            }
          ]
        }
      ],
      contactMethods: [
        {
          type: 'email',
          title: 'Email Us',
          value: 'support@puertaabierta.io',
          icon: 'email'
        },
        {
          type: 'consultation',
          title: 'Free Consultation',
          value: 'Book a free session',
          icon: 'users'
        },
        {
          type: 'response',
          title: 'Response Time',
          value: 'Within 24 hours',
          icon: 'clock'
        }
      ]
    }
  }
}
