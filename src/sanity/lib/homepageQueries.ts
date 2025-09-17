import { groq } from 'next-sanity'
import { HomepageContent, HomepageQueryResult } from './homepageTypes'

// Query to get all homepage content
export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    _id,
    _type,
    hero {
      title,
      subtitle,
      primaryButton {
        text,
        link
      },
      secondaryButton {
        text,
        link
      }
    },
    problem {
      title,
      statistics[] {
        value,
        description,
        type,
        chartData[] {
          name,
          value
        }
      }
    },
    solution {
      title,
      features[] {
        icon,
        title,
        description
      }
    },
    testimonials {
      title,
      testimonialList[] {
        name,
        title,
        quote,
        rating
      }
    },
    b2b {
      title,
      challenges[] {
        challenge,
        solution
      },
      ctaButton {
        text,
        link
      }
    },
    partners {
      partnerLogos[] {
        name,
        logo {
          _type,
          asset-> {
            _ref,
            _type
          },
          hotspot
        },
        website
      }
    },
    contact {
      title,
      subtitle,
      description,
      contactMethods[] {
        type,
        title,
        value,
        icon
      }
    },
    featuredImage {
      _type,
      asset-> {
        _ref,
        _type,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      hotspot
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        _type,
        asset-> {
          _ref,
          _type
        },
        hotspot
      }
    }
  }
`

// Query to get just the hero section
export const heroQuery = groq`
  *[_type == "homepage"][0] {
    hero {
      title,
      subtitle,
      primaryButton {
        text,
        link
      },
      secondaryButton {
        text,
        link
      }
    }
  }
`

// Query to get problem section with statistics
export const problemQuery = groq`
  *[_type == "homepage"][0] {
    problem {
      title,
      statistics[] {
        value,
        description,
        type,
        chartData[] {
          name,
          value
        }
      }
    }
  }
`

// Query to get solution section with features
export const solutionQuery = groq`
  *[_type == "homepage"][0] {
    solution {
      title,
      features[] {
        icon,
        title,
        description
      }
    }
  }
`

// Query to get testimonials
export const testimonialsQuery = groq`
  *[_type == "homepage"][0] {
    testimonials {
      title,
      testimonialList[] {
        name,
        title,
        quote,
        rating
      }
    }
  }
`

// Query to get B2B section
export const b2bQuery = groq`
  *[_type == "homepage"][0] {
    b2b {
      title,
      challenges[] {
        challenge,
        solution
      },
      ctaButton {
        text,
        link
      }
    }
  }
`

// Query to get partners
export const partnersQuery = groq`
  *[_type == "homepage"][0] {
    partners {
      partnerLogos[] {
        name,
        logo {
          _type,
          asset-> {
            _ref,
            _type
          },
          hotspot
        },
        website
      }
    }
  }
`

// Query to get contact section
export const contactQuery = groq`
  *[_type == "homepage"][0] {
    contact {
      title,
      subtitle,
      description,
      contactMethods[] {
        type,
        title,
        value,
        icon
      }
    }
  }
`

// Query to get SEO fields
export const seoQuery = groq`
  *[_type == "homepage"][0] {
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        _type,
        asset-> {
          _ref,
          _type
        },
        hotspot
      }
    }
  }
`

// Query to get homepage preview for admin
export const homepagePreviewQuery = groq`
  *[_type == "homepage"][0] {
    hero {
      title,
      subtitle
    }
  }
`

