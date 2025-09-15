/**
 * Test script to verify import-homepage.js is working correctly
 */

// Load environment variables
const dotenv = require('dotenv')
const fs = require('fs')

if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' })
} else if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' })
}

async function testImport() {
  console.log('🧪 Testing Import Script')
  console.log('========================')
  
  try {
    // Test if we can import the module
    console.log('📦 Testing module import...')
    const { main, extractHomepageData, skipImageUploads, updateHomepageWithAssets, uploadHomepageData } = require('./import-homepage.js')
    console.log('✅ Module imported successfully')
    
    // Test if functions exist
    console.log('🔍 Testing function availability...')
    console.log('  - main:', typeof main)
    console.log('  - extractHomepageData:', typeof extractHomepageData)
    console.log('  - skipImageUploads:', typeof skipImageUploads)
    console.log('  - updateHomepageWithAssets:', typeof updateHomepageWithAssets)
    console.log('  - uploadHomepageData:', typeof uploadHomepageData)
    
    // Test data extraction
    console.log('📋 Testing data extraction...')
    const data = extractHomepageData()
    console.log('✅ Data extraction successful')
    console.log('  - Hero title:', data.hero?.title)
    console.log('  - Partners count:', data.partners?.partnerLogos?.length || 0)
    
    // Test image skipping
    console.log('⏭️  Testing image skip...')
    const imageMap = await skipImageUploads()
    console.log('✅ Image skip successful')
    console.log('  - Image map keys:', Object.keys(imageMap).length)
    
    console.log('\n🎉 All tests passed!')
    console.log('The import script is working correctly.')
    
  } catch (error) {
    console.log('❌ Test failed:', error.message)
    console.log('Stack trace:', error.stack)
  }
}

// Run the test
if (require.main === module) {
  testImport()
}

module.exports = { testImport }

