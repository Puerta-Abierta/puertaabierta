/**
 * Script to extract homepage content from components and upload to Sanity
 * This script reads the current homepage components and creates a homepage document in Sanity
 */

// Load environment variables from .env.local or .env
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

// Try .env.local first, then .env
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' })
  console.log('✅ Loaded environment variables from .env.local')
} else if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' })
  console.log('✅ Loaded environment variables from .env')
} else {
  console.log('⚠️  No .env.local or .env file found. Make sure to set environment variables.')
}

const { createClient } = require('@sanity/client')

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03'
})

// Helper function to create PortableText blocks
function createPortableTextBlock(text, key) {
  return [
    {
      _type: 'block',
      _key: key,
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: `${key}-text`,
          text: text
        }
      ]
    }
  ]
}

// Extract data from components
function extractHomepageData() {
  console.log('📋 Extracting homepage data from components...')

  const homepageData = {
    _type: 'homepage',
    hero: {
      title: 'Puerta Abierta',
      subtitle: createPortableTextBlock(
        'Join the thousands of students who use Puerta Abierta to build financial skills, gain mentorship, and unlock their potential for a brighter future.',
        'hero-subtitle'
      ),
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
          description: createPortableTextBlock(
            'Lost by U.S. adults in 2021 due to financial illiteracy',
            'stat-1-desc'
          ),
          type: 'number'
        },
        {
          value: '73%',
          description: createPortableTextBlock(
            'of U.S. Students not confident in their financial education',
            'stat-2-desc'
          ),
          type: 'chart',
          chartData: [
            { name: 'Need Education', value: 73 },
            { name: 'No Access', value: 27 }
          ]
        },
        {
          value: '59%',
          description: createPortableTextBlock(
            'Of College students considered dropping out due to financial stress.',
            'stat-3-desc'
          ),
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
          description: createPortableTextBlock(
            'Powered by Intuit\'s proven curriculum for real-world money management skills',
            'feature-1-desc'
          )
        },
        {
          icon: '🎯',
          title: 'Holistic Mentorship',
          description: createPortableTextBlock(
            'Career guidance and personal growth support for comprehensive development',
            'feature-2-desc'
          )
        },
        {
          icon: '🤝',
          title: 'Enterprise Partnerships',
          description: createPortableTextBlock(
            'Working with schools, centers, and organizations to reach students where they are',
            'feature-3-desc'
          )
        }
      ]
    },
    testimonials: {
      title: 'College applications are simpler with someone to guide you',
      testimonialList: [
        {
          name: 'Ben',
          title: 'High School Student',
          quote: createPortableTextBlock(
            'Puerta Abierta gave me the confidence and structure I needed for my college applications. I went from feeling completely overwhelmed to checking items off my application list step by step. It\'s exactly what I needed!',
            'testimonial-1-quote'
          ),
          rating: 5
        },
        {
          name: 'Carlos Mendez',
          title: 'College Student',
          quote: createPortableTextBlock(
            'The guidance and support from Puerta Abierta helped me navigate the entire college application process with confidence. I finally understood what I needed to do and when to do it. Highly recommend!',
            'testimonial-2-quote'
          ),
          rating: 5
        },
        {
          name: 'Sofia Garcia',
          title: 'Recent Graduate',
          quote: createPortableTextBlock(
            'Puerta Abierta broke down the complex college application process into manageable steps that I could actually follow. Thanks to their support, I got accepted to my dream school!',
            'testimonial-3-quote'
          ),
          rating: 5
        }
      ]
    },
    b2b: {
      title: 'Why Partner With Puerta Abierta?',
      challenges: [
        {
          challenge: createPortableTextBlock(
            'Students lack access to practical financial literacy education that prepares them for real-world challenges.',
            'b2b-challenge-1'
          ),
          solution: createPortableTextBlock(
            'We provide ready-to-use curriculum with measurable results, backed by Intuit\'s proven methodology.',
            'b2b-solution-1'
          )
        },
        {
          challenge: createPortableTextBlock(
            'Institutions need credible partners they can trust to deliver quality financial education programs.',
            'b2b-challenge-2'
          ),
          solution: createPortableTextBlock(
            'Our programs are backed by Intuit and trusted by UCI and NextUp, providing institutional credibility.',
            'b2b-solution-2'
          )
        }
      ],
      ctaButton: {
        text: 'Schedule a Consultation',
        link: '/mentors'
      }
    },
    partners: {
      partnerLogos: [
        {
          name: 'UCI',
          website: 'https://uci.edu'
        },
        {
          name: 'Intuit',
          website: 'https://intuit.com'
        },
        {
          name: 'Hayward Unified School District',
          website: 'https://husd.k12.ca.us'
        },
        {
          name: 'Latina Center',
          website: 'https://latinxcenter.org'
        },
        {
          name: 'Blackstone',
          website: 'https://blackstone.com'
        }
      ]
    },
    contact: {
      title: 'Ready to Get Started?',
      subtitle: createPortableTextBlock(
        'Have questions about our programs or want to learn more? Send us a message and we\'ll get back to you within 24 hours.',
        'contact-subtitle'
      ),
      description: createPortableTextBlock(
        'We\'re here to help you on your financial literacy journey. Whether you\'re a student, parent, or educator, we\'d love to hear from you.',
        'contact-description'
      ),
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
    },
    seo: {
      metaTitle: 'Puerta Abierta | Financial Literacy for the Next Generation',
      metaDescription: createPortableTextBlock(
        'Join thousands of students using Puerta Abierta to build financial skills, gain mentorship, and unlock their potential for a brighter future.',
        'seo-meta-description'
      )
    }
  }

  console.log('✅ Homepage data extracted successfully')
  return homepageData
}

// Skip image uploads - create placeholder references
async function skipImageUploads() {
  console.log('⏭️  Skipping image uploads...')
  console.log('📝 Partner logos will be empty - you can add them later in Sanity Studio')
  
  // Return empty image map
  return {}
}

// Update homepage data with actual asset references
function updateHomepageWithAssets(homepageData, imageMap) {
  console.log('🔗 Updating homepage data...')
  
  // If no images were uploaded, partners will have no logo references
  if (Object.keys(imageMap).length === 0) {
    console.log('📝 Partner logos will be empty - add them later in Sanity Studio')
  } else {
    // Update partner logos with actual asset references
    homepageData.partners.partnerLogos.forEach(partner => {
      const filename = partner.name.toLowerCase().replace(/\s+/g, '')
      const assetId = imageMap[`${filename}.png`] || imageMap[`${filename}.jpg`] || imageMap[`${filename}.jpeg`]
      
      if (assetId) {
        partner.logo.asset._ref = assetId
      } else {
        console.log(`⚠️  No asset found for ${partner.name}`)
      }
    })
  }

  return homepageData
}

// Upload homepage data to Sanity
async function uploadHomepageData(homepageData) {
  console.log('🚀 Uploading homepage data to Sanity...')
  
  try {
    // Check if homepage document already exists
    const existingHomepage = await client.fetch('*[_type == "homepage"][0]')
    
    if (existingHomepage) {
      console.log('📝 Updating existing homepage document...')
      const updatedHomepage = await client
        .patch(existingHomepage._id)
        .set(homepageData)
        .commit()
      
      console.log('✅ Homepage updated successfully:', updatedHomepage._id)
      return updatedHomepage
    } else {
      console.log('📝 Creating new homepage document...')
      const newHomepage = await client.create(homepageData)
      
      console.log('✅ Homepage created successfully:', newHomepage._id)
      return newHomepage
    }
  } catch (error) {
    console.error('❌ Error uploading homepage data:', error.message)
    throw error
  }
}

// Main function
async function main() {
  console.log('🏠 Starting homepage data import...')
  console.log('=====================================')
  
  try {
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID environment variable is required')
    }
    
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('SANITY_API_TOKEN environment variable is required')
    }

    // Extract homepage data
    const homepageData = extractHomepageData()
    
    // Skip image uploads
    const imageMap = await skipImageUploads()
    
    // Update homepage data (no asset references needed)
    const updatedHomepageData = updateHomepageWithAssets(homepageData, imageMap)
    
    // Upload to Sanity
    const result = await uploadHomepageData(updatedHomepageData)
    
    console.log('=====================================')
    console.log('🎉 Homepage import completed successfully!')
    console.log(`📄 Document ID: ${result._id}`)
    console.log('🌐 You can now view and edit the homepage content in Sanity Studio')
    
  } catch (error) {
    console.error('=====================================')
    console.error('❌ Homepage import failed:', error.message)
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  main()
}

module.exports = {
  extractHomepageData,
  skipImageUploads,
  updateHomepageWithAssets,
  uploadHomepageData,
  main
}
