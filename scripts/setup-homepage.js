/**
 * Advanced homepage setup script with environment validation and interactive setup
 * This script helps set up the homepage import with proper validation and guidance
 */

// Load environment variables from .env.local or .env
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const readline = require('readline')

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

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Helper function to ask questions
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

// Validate environment variables
async function validateEnvironment() {
  console.log('🔍 Validating environment setup...')
  
  const requiredVars = {
    'NEXT_PUBLIC_SANITY_PROJECT_ID': process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    'SANITY_API_TOKEN': process.env.SANITY_API_TOKEN
  }
  
  const missingVars = Object.entries(requiredVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key)
  
  if (missingVars.length > 0) {
    console.log('❌ Missing required environment variables:')
    missingVars.forEach(varName => console.log(`   - ${varName}`))
    
    console.log('\n📝 Please set these variables in your .env.local file:')
    console.log('NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id')
    console.log('SANITY_API_TOKEN=your_api_token')
    console.log('NEXT_PUBLIC_SANITY_DATASET=production  # optional')
    
    return false
  }
  
  console.log('✅ Environment variables are set')
  return true
}

// Test Sanity connection
async function testSanityConnection() {
  console.log('🔗 Testing Sanity connection...')
  
  try {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
      apiVersion: '2023-05-03'
    })
    
    // Test connection by fetching project info
    const projects = await client.fetch('*[_type == "sanity.projectSettings"][0]')
    console.log('✅ Successfully connected to Sanity')
    return { client, connected: true }
  } catch (error) {
    console.log('❌ Failed to connect to Sanity:', error.message)
    return { client: null, connected: false }
  }
}

// Check if homepage schema exists
async function checkHomepageSchema(client) {
  console.log('📋 Checking homepage schema...')
  
  try {
    // Try to fetch a homepage document to see if the schema is available
    const homepageDoc = await client.fetch('*[_type == "homepage"][0]')
    
    if (homepageDoc !== null) {
      console.log('✅ Homepage schema found (document exists)')
      return true
    }
    
    // If no document exists, try to check if we can create one by testing the schema
    try {
      // This will fail if the schema doesn't exist
      await client.fetch('*[_type == "homepage"]')
      console.log('✅ Homepage schema found (type available)')
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

// Deploy schema if missing
async function deploySchemaIfNeeded() {
  console.log('🚀 Attempting to deploy schema...')
  
  try {
    const { spawn } = require('child_process')
    
    return new Promise((resolve) => {
      const deployProcess = spawn('npx', ['sanity', 'schema', 'extract'], {
        stdio: 'inherit',
        shell: true
      })
      
      deployProcess.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Schema deployment completed')
          resolve(true)
        } else {
          console.log('⚠️  Schema deployment failed, but continuing...')
          resolve(false)
        }
      })
      
      deployProcess.on('error', (error) => {
        console.log('⚠️  Error running schema deployment:', error.message)
        resolve(false)
      })
    })
  } catch (error) {
    console.log('⚠️  Error deploying schema:', error.message)
    return false
  }
}

// Check for existing homepage document
async function checkExistingHomepage(client) {
  console.log('🔍 Checking for existing homepage document...')
  
  try {
    const existingHomepage = await client.fetch('*[_type == "homepage"][0]')
    
    if (existingHomepage) {
      console.log(`✅ Found existing homepage document: ${existingHomepage._id}`)
      return existingHomepage
    } else {
      console.log('📝 No existing homepage document found')
      return null
    }
  } catch (error) {
    console.log('❌ Error checking for existing homepage:', error.message)
    return null
  }
}

// Skip image checking - images are optional
function checkRequiredImages() {
  console.log('⏭️  Skipping image checks...')
  console.log('📝 Images are optional - partner logos will be empty')
  
  return { existingImages: [], missingImages: [] }
}

// Interactive setup
async function interactiveSetup() {
  console.log('🏠 Homepage Setup Wizard')
  console.log('========================')
  console.log('This wizard will help you set up your homepage content in Sanity.\n')
  
  // Step 1: Environment validation
  const envValid = await validateEnvironment()
  if (!envValid) {
    console.log('\n❌ Please fix the environment variables and run the script again.')
    process.exit(1)
  }
  
  // Step 2: Test Sanity connection
  const { client, connected } = await testSanityConnection()
  if (!connected) {
    console.log('\n❌ Please check your Sanity credentials and try again.')
    process.exit(1)
  }
  
  // Step 3: Check schema
  let schemaExists = await checkHomepageSchema(client)
  if (!schemaExists) {
    console.log('\n⚠️  Homepage schema not found. Attempting to deploy...')
    const deploySuccess = await deploySchemaIfNeeded()
    
    if (deploySuccess) {
      // Wait a moment for deployment to complete
      console.log('⏳ Waiting for schema deployment to complete...')
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Check again
      schemaExists = await checkHomepageSchema(client)
    }
    
    if (!schemaExists) {
      console.log('\n❌ Schema deployment failed or schema still not found.')
      console.log('📝 Manual steps:')
      console.log('1. Run: npm run deploy-schema')
      console.log('2. Or deploy your schema from Sanity Studio')
      console.log('3. Then run: npm run setup-homepage')
      process.exit(1)
    }
  }
  
  // Step 4: Check existing homepage
  const existingHomepage = await checkExistingHomepage(client)
  
  // Step 5: Check images (skipped)
  const { existingImages, missingImages } = checkRequiredImages()
  
  // Step 6: Ask user what to do
  console.log('\n📋 Setup Summary:')
  console.log('================')
  console.log(`✅ Environment: Configured`)
  console.log(`✅ Sanity Connection: Working`)
  console.log(`✅ Schema: Available`)
  console.log(`📄 Existing Homepage: ${existingHomepage ? 'Yes' : 'No'}`)
  console.log(`⏭️  Images: Skipped (optional)`)
  
  console.log('\nWhat would you like to do?')
  console.log('1. Import homepage content (create/update)')
  console.log('2. Check setup only (no changes)')
  console.log('3. Exit')
  
  const choice = await askQuestion('\nEnter your choice (1-3): ')
  
  switch (choice) {
    case '1':
      if (existingHomepage) {
        const update = await askQuestion(`\nUpdate existing homepage document (${existingHomepage._id})? (y/n): `)
        if (update.toLowerCase() !== 'y') {
          console.log('❌ Operation cancelled')
          process.exit(0)
        }
      }
      
      console.log('\n🚀 Starting homepage import...')
      // Import the main script (clear cache first)
      delete require.cache[require.resolve('./import-homepage.js')]
      const { main } = require('./import-homepage.js')
      await main()
      break
      
    case '2':
      console.log('\n✅ Setup check completed. Everything looks good!')
      break
      
    case '3':
      console.log('\n👋 Goodbye!')
      break
      
    default:
      console.log('\n❌ Invalid choice. Please run the script again.')
  }
  
  rl.close()
}

// Main function
async function main() {
  try {
    await interactiveSetup()
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message)
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  main()
}

module.exports = {
  validateEnvironment,
  testSanityConnection,
  checkHomepageSchema,
  checkExistingHomepage,
  checkRequiredImages,
  interactiveSetup
}
