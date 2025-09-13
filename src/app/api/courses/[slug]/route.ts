import { NextRequest, NextResponse } from 'next/server'
import { 
  getCourseBySlug, 
  getCourseWithRelated,
  getCourseLessons,
  getCourseMentors
} from '@/sanity/lib/courseHelpers'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { searchParams } = new URL(request.url)
    
    const includeRelated = searchParams.get('includeRelated') === 'true'
    const lessonsOnly = searchParams.get('lessonsOnly') === 'true'
    const mentorsOnly = searchParams.get('mentorsOnly') === 'true'

    // Get specific data based on query parameters
    if (lessonsOnly) {
      const lessons = await getCourseLessons(slug)
      return NextResponse.json({
        success: true,
        data: lessons,
      })
    }

    if (mentorsOnly) {
      const mentors = await getCourseMentors(slug)
      return NextResponse.json({
        success: true,
        data: mentors,
      })
    }

    if (includeRelated) {
      const { course, relatedCourses } = await getCourseWithRelated(slug)
      
      if (!course) {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        data: {
          course,
          relatedCourses,
        },
      })
    }

    // Get single course
    const course = await getCourseBySlug(slug)

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: course,
    })
  } catch (error) {
    console.error('Error fetching course:', error)
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    )
  }
}
