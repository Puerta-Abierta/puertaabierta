/**
 * Test script to verify environment variables are loaded correctly
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

// Check required environment variables
const requiredVars = {
  'NEXT_PUBLIC_SANITY_PROJECT_ID': process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'SANITY_API_TOKEN': process.env.SANITY_API_TOKEN
}

const optionalVars = {
  'NEXT_PUBLIC_SANITY_DATASET': process.env.NEXT_PUBLIC_SANITY_DATASET || 'production (default)',
  'NEXT_PUBLIC_SANITY_API_VERSION': process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03 (default)'
}

console.log('\n🔍 Environment Variables Check')
console.log('==============================')

console.log('\n📋 Required Variables:')
Object.entries(requiredVars).forEach(([key, value]) => {
  if (value) {
    console.log(`✅ ${key}: ${value.substring(0, 10)}...`)
  } else {
    console.log(`❌ ${key}: Not set`)
  }
})

console.log('\n📋 Optional Variables:')
Object.entries(optionalVars).forEach(([key, value]) => {
  console.log(`ℹ️  ${key}: ${value}`)
})

// Check if all required variables are set
const missingVars = Object.entries(requiredVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key)

if (missingVars.length === 0) {
  console.log('\n🎉 All required environment variables are set!')
  console.log('You can now run: npm run setup-homepage')
} else {
  console.log('\n❌ Missing required environment variables:')
  missingVars.forEach(varName => console.log(`   - ${varName}`))
  console.log('\nRun: npm run create-env')
}

