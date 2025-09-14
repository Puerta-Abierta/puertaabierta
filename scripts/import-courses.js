import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read JSON file
const pagesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/content/pages.json'), 'utf8'))

// Load environment variables
dotenv.config({ path: '.env.local' })

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need to add this to your .env
  apiVersion: '2024-01-01'
})

async function importCourses() {
  console.log('🚀 Starting course import...')
  
  try {
    // Convert JSON data to Sanity format
    const courses = Object.entries(pagesData).map(([slug, course]) => ({
      _type: 'course',
      title: course.title,
      slug: { 
        current: slug, 
        _type: 'slug' 
      },
      description: course.description,
      duration: course.duration,
      lessonsCount: course.lessonsCount,
      lessons: course.lessons.map(lesson => ({
        _type: 'lesson',
        title: lesson.title,
        duration: lesson.duration,
        objectives: lesson.objectives
      })),
      mentors: course.mentors.map(mentor => ({
        _type: 'mentor',
        name: mentor.name,
        session: mentor.session
      })),
      // Note: thumbnail will need to be added manually in Sanity Studio
      // since we can't upload images via API without the actual image files
    }))

    console.log(`📚 Found ${courses.length} courses to import:`)
    courses.forEach(course => {
      console.log(`  - ${course.title} (${course.slug.current})`)
    })

    // Import courses one by one
    const results = []
    for (const course of courses) {
      try {
        console.log(`⏳ Importing: ${course.title}...`)
        
        // Check if course already exists
        const existing = await client.fetch(
          `*[_type == "course" && slug.current == "${course.slug.current}"][0]`
        )
        
        if (existing) {
          console.log(`⚠️  Course "${course.title}" already exists, skipping...`)
          continue
        }
        
        // Create the course
        const result = await client.create(course)
        results.push(result)
        console.log(`✅ Successfully imported: ${course.title}`)
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100))
        
      } catch (error) {
        console.error(`❌ Failed to import ${course.title}:`, error.message)
      }
    }

    console.log(`\n🎉 Import completed!`)
    console.log(`✅ Successfully imported: ${results.length} courses`)
    console.log(`⚠️  Skipped: ${courses.length - results.length} courses (already exist or failed)`)
    
    if (results.length > 0) {
      console.log(`\n📝 Next steps:`)
      console.log(`1. Go to your Sanity Studio at /studio`)
      console.log(`2. Add thumbnail images to each course`)
      console.log(`3. Review and publish the courses`)
    }

  } catch (error) {
    console.error('❌ Import failed:', error)
    process.exit(1)
  }
}

// Run the import
importCourses()
