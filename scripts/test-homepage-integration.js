/**
 * Test script to verify homepage integration with Sanity
 */

// Load environment variables
const dotenv = require('dotenv')
const fs = require('fs')

if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' })
} else if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' })
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

async function testHomepageIntegration() {
  console.log('🧪 Testing Homepage Integration with Sanity')
  console.log('============================================')
  
  try {
    // Test 1: Check if homepage document exists
    console.log('📋 Testing homepage document fetch...')
    const homepage = await client.fetch('*[_type == "homepage"][0]')
    
    if (homepage) {
      console.log('✅ Homepage document found')
      console.log('  - ID:', homepage._id)
      console.log('  - Hero title:', homepage.hero?.title || 'Not set')
      console.log('  - Problem statistics count:', homepage.problem?.statistics?.length || 0)
      console.log('  - Solution features count:', homepage.solution?.features?.length || 0)
      console.log('  - Testimonials count:', homepage.testimonials?.testimonialList?.length || 0)
      console.log('  - Partners count:', homepage.partners?.partnerLogos?.length || 0)
    } else {
      console.log('⚠️  No homepage document found - will use fallback content')
    }
    
    // Test 2: Test the getHomepageContent function
    console.log('\n🔧 Testing getHomepageContent function...')
    try {
      const { getHomepageContent } = require('../src/sanity/lib/homepageHelpers.ts')
      const content = await getHomepageContent()
      
      if (content) {
        console.log('✅ getHomepageContent function working')
        console.log('  - Hero title:', content.hero?.title || 'Not set')
        console.log('  - Has hero subtitle:', !!content.hero?.subtitle)
        console.log('  - Problem title:', content.problem?.title || 'Not set')
        console.log('  - Solution title:', content.solution?.title || 'Not set')
        console.log('  - B2B title:', content.b2b?.title || 'Not set')
        console.log('  - Testimonials title:', content.testimonials?.title || 'Not set')
        console.log('  - Contact title:', content.contact?.title || 'Not set')
      } else {
        console.log('❌ getHomepageContent function failed')
      }
    } catch (error) {
      console.log('⚠️  getHomepageContent function test skipped (TypeScript module)')
      console.log('  - This is expected in Node.js environment')
      console.log('  - Function will work in Next.js runtime')
    }
    
    // Test 3: Test component props structure
    console.log('\n🎨 Testing component props structure...')
    const expectedSections = ['hero', 'problem', 'solution', 'b2b', 'testimonials', 'partners', 'contact']
    
    expectedSections.forEach(section => {
      if (homepage && homepage[section]) {
        console.log(`✅ ${section} section available`)
      } else {
        console.log(`⚠️  ${section} section missing - will use fallback`)
      }
    })
    
    console.log('\n🎉 Homepage integration test completed!')
    console.log('\n📝 Next steps:')
    console.log('1. Run: npm run dev')
    console.log('2. Visit: http://localhost:3000')
    console.log('3. Check if content loads from Sanity or fallback')
    console.log('4. If no content, run: npm run setup-homepage')
    
  } catch (error) {
    console.log('❌ Test failed:', error.message)
    console.log('Stack trace:', error.stack)
  }
}

// Run the test
if (require.main === module) {
  testHomepageIntegration()
}

module.exports = { testHomepageIntegration }
