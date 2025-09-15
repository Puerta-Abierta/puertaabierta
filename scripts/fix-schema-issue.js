/**
 * Quick fix script for schema deployment issues
 * This script addresses the "Homepage schema not found" error
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

async function fixSchemaIssue() {
  console.log('🔧 Fixing Schema Issue')
  console.log('======================')
  
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

    // Check if homepage schema exists
    console.log('📋 Checking for homepage schema...')
    
    try {
      // Try to fetch a homepage document to see if the schema is available
      const homepageDoc = await client.fetch('*[_type == "homepage"][0]')
      
      if (homepageDoc !== null) {
        console.log('✅ Homepage schema already exists! (document found)')
        console.log('You can now run: npm run setup-homepage')
        return
      }
      
      // If no document exists, try to check if we can query the type
      await client.fetch('*[_type == "homepage"]')
      console.log('✅ Homepage schema already exists! (type available)')
      console.log('You can now run: npm run setup-homepage')
      return
      
    } catch (schemaError) {
      console.log('❌ Homepage schema not found')
    }

    console.log('❌ Homepage schema not found. Deploying...')
    
    // Try to deploy schema using Sanity CLI
    const { spawn } = require('child_process')
    
    console.log('🚀 Running: npx sanity schema extract')
    
    const deployProcess = spawn('npx', ['sanity', 'schema', 'extract'], {
      stdio: 'inherit',
      shell: true
    })
    
    deployProcess.on('close', async (code) => {
      if (code === 0) {
        console.log('✅ Schema deployment completed')
        
        // Wait for deployment to propagate
        console.log('⏳ Waiting for schema to be available...')
        await new Promise(resolve => setTimeout(resolve, 5000))
        
        // Check again
        const homepageTypeAfter = await client.fetch('*[_type == "sanity.documentType" && name == "homepage"][0]')
        
        if (homepageTypeAfter) {
          console.log('🎉 Schema deployed successfully!')
          console.log('You can now run: npm run setup-homepage')
        } else {
          console.log('⚠️  Schema deployment may need more time')
          console.log('Try running: npm run setup-homepage')
        }
      } else {
        console.log('❌ Schema deployment failed')
        console.log('Try running: npm run deploy-schema')
        console.log('Or deploy manually from Sanity Studio')
      }
    })
    
    deployProcess.on('error', (error) => {
      console.log('❌ Error running schema deployment:', error.message)
      console.log('Try running: npm run deploy-schema')
    })
    
  } catch (error) {
    console.log('❌ Error:', error.message)
    
    if (error.message.includes('Unauthorized')) {
      console.log('🔑 Check your SANITY_API_TOKEN has Editor permissions')
    } else if (error.message.includes('Project not found')) {
      console.log('🆔 Check your NEXT_PUBLIC_SANITY_PROJECT_ID is correct')
    }
    
    console.log('\n📝 Next steps:')
    console.log('1. Run: npm run create-env')
    console.log('2. Run: npm run test-env')
    console.log('3. Run: npm run setup-homepage')
  }
}

// Run the fix
if (require.main === module) {
  fixSchemaIssue()
}

module.exports = { fixSchemaIssue }
