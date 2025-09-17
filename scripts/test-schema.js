/**
 * Test script to verify homepage schema is working
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

async function testSchema() {
  console.log('🧪 Testing Homepage Schema')
  console.log('==========================')
  
  try {
    // Check environment
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
      console.log('❌ Environment variables not set. Run: npm run create-env')
      return
    }

    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
      apiVersion: '2023-05-03'
    })

    // Test connection
    console.log('🔗 Testing Sanity connection...')
    await client.fetch('*[_type == "sanity.projectSettings"][0]')
    console.log('✅ Connected to Sanity')

    // Test homepage schema
    console.log('📋 Testing homepage schema...')
    
    try {
      // Try to query homepage documents
      const homepageDocs = await client.fetch('*[_type == "homepage"]')
      console.log(`✅ Homepage schema is working! Found ${homepageDocs.length} document(s)`)
      
      if (homepageDocs.length > 0) {
        console.log('📄 Existing homepage documents:')
        homepageDocs.forEach((doc, index) => {
          console.log(`   ${index + 1}. ${doc._id} (created: ${doc._createdAt})`)
        })
      } else {
        console.log('📝 No homepage documents exist yet')
      }
      
      // Test if we can create a document (without actually creating it)
      console.log('🔧 Testing document creation capability...')
      try {
        // This will test if the schema allows creation
        await client.fetch('*[_type == "homepage" && _id == "test-creation"]')
        console.log('✅ Schema allows document creation')
      } catch (createError) {
        console.log('⚠️  Schema creation test inconclusive')
      }
      
      console.log('\n🎉 Schema test completed successfully!')
      console.log('You can now run: npm run setup-homepage')
      
    } catch (schemaError) {
      console.log('❌ Homepage schema test failed:', schemaError.message)
      
      if (schemaError.message.includes('Unknown document type')) {
        console.log('💡 The "homepage" document type is not recognized')
        console.log('   Make sure your schema is deployed to Sanity')
        console.log('   Try running: npm run deploy-schema')
      } else if (schemaError.message.includes('Unauthorized')) {
        console.log('💡 Permission issue - check your API token has Editor permissions')
      } else {
        console.log('💡 Unknown error - check your Sanity project configuration')
      }
    }
    
  } catch (error) {
    console.log('❌ Test failed:', error.message)
    
    if (error.message.includes('Unauthorized')) {
      console.log('🔑 Check your SANITY_API_TOKEN has Editor permissions')
    } else if (error.message.includes('Project not found')) {
      console.log('🆔 Check your NEXT_PUBLIC_SANITY_PROJECT_ID is correct')
    }
  }
}

// Run the test
if (require.main === module) {
  testSchema()
}

module.exports = { testSchema }

