/**
 * Script to deploy Sanity schema to the project
 * This ensures the homepage schema is available before running imports
 */

// Load environment variables from .env.local or .env
const dotenv = require('dotenv')
const fs = require('fs')

// Try .env.local first, then .env
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' })
  console.log('✅ Loaded environment variables from .env.local')
} else if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' })
  console.log('✅ Loaded environment variables from .env')
} else {
  console.log('⚠️  No .env.local or .env file found')
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

// Check if schema is already deployed
async function checkSchemaDeployment() {
  console.log('🔍 Checking if homepage schema is deployed...')
  
  try {
    // Try to fetch a homepage document to see if the schema is available
    const homepageDoc = await client.fetch('*[_type == "homepage"][0]')
    
    if (homepageDoc !== null) {
      console.log('✅ Homepage schema is already deployed (document exists)')
      return true
    }
    
    // If no document exists, try to check if we can query the type
    try {
      await client.fetch('*[_type == "homepage"]')
      console.log('✅ Homepage schema is already deployed (type available)')
      return true
    } catch (schemaError) {
      console.log('❌ Homepage schema not found')
      return false
    }
  } catch (error) {
    console.log('❌ Error checking schema:', error.message)
    return false
  }
}

// Deploy schema using Sanity CLI
async function deploySchema() {
  console.log('🚀 Deploying schema to Sanity...')
  
  const { spawn } = require('child_process')
  
  return new Promise((resolve, reject) => {
    const deployProcess = spawn('npx', ['sanity', 'schema', 'extract'], {
      stdio: 'inherit',
      shell: true
    })
    
    deployProcess.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Schema deployment completed')
        resolve(true)
      } else {
        console.log('❌ Schema deployment failed')
        reject(new Error(`Deploy process exited with code ${code}`))
      }
    })
    
    deployProcess.on('error', (error) => {
      console.log('❌ Error running schema deployment:', error.message)
      reject(error)
    })
  })
}

// Alternative: Create schema manually if CLI fails
async function createSchemaManually() {
  console.log('🔧 Creating homepage schema manually...')
  
  try {
    // Create the homepage document type
    const documentType = {
      _type: 'sanity.documentType',
      name: 'homepage',
      title: 'Homepage Content',
      icon: 'home',
      fields: [
        {
          name: 'hero',
          title: 'Hero Section',
          type: 'object'
        },
        {
          name: 'problem',
          title: 'Problem Section', 
          type: 'object'
        },
        {
          name: 'solution',
          title: 'Solution Section',
          type: 'object'
        },
        {
          name: 'testimonials',
          title: 'Testimonials Section',
          type: 'object'
        },
        {
          name: 'b2b',
          title: 'B2B Section',
          type: 'object'
        },
        {
          name: 'partners',
          title: 'Partners Section',
          type: 'object'
        },
        {
          name: 'contact',
          title: 'Contact Section',
          type: 'object'
        },
        {
          name: 'seo',
          title: 'SEO',
          type: 'object'
        }
      ]
    }
    
    await client.create(documentType)
    console.log('✅ Homepage schema created manually')
    return true
  } catch (error) {
    console.log('❌ Error creating schema manually:', error.message)
    return false
  }
}

// Main function
async function main() {
  console.log('📋 Sanity Schema Deployment')
  console.log('===========================')
  
  try {
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID environment variable is required')
    }
    
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('SANITY_API_TOKEN environment variable is required')
    }

    // Check if schema is already deployed
    const isDeployed = await checkSchemaDeployment()
    
    if (isDeployed) {
      console.log('\n🎉 Schema is already deployed!')
      console.log('You can now run: npm run setup-homepage')
      return
    }

    console.log('\n📝 Schema not found. Deploying...')
    
    // Try to deploy using Sanity CLI
    try {
      await deploySchema()
      
      // Wait a moment for deployment to complete
      console.log('⏳ Waiting for schema deployment to complete...')
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Check if deployment was successful
      const isNowDeployed = await checkSchemaDeployment()
      
      if (isNowDeployed) {
        console.log('\n🎉 Schema deployed successfully!')
        console.log('You can now run: npm run setup-homepage')
      } else {
        console.log('\n⚠️  Schema deployment may have failed. Trying manual creation...')
        await createSchemaManually()
      }
      
    } catch (error) {
      console.log('\n⚠️  CLI deployment failed. Trying manual creation...')
      await createSchemaManually()
    }
    
  } catch (error) {
    console.error('\n❌ Schema deployment failed:', error.message)
    console.log('\n📝 Manual steps:')
    console.log('1. Go to your Sanity Studio')
    console.log('2. Make sure your schema includes the homepage type')
    console.log('3. Deploy your schema from the Studio')
    console.log('4. Run: npm run setup-homepage')
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  main()
}

module.exports = {
  checkSchemaDeployment,
  deploySchema,
  createSchemaManually,
  main
}
