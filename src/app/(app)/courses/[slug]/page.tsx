import { notFound } from 'next/navigation'
import { getCourseBySlug, getRelatedCourses } from '@/sanity/lib/courseHelpers'
import CourseHero from '@/components/CourseHero'
import CourseDetails from '@/components/CourseDetails'
import CourseLessons from '@/components/CourseLessons'
import CourseMentors from '@/components/CourseMentors'
import CourseCTA from '@/components/CourseCTA'
import RelatedCourses from '@/components/RelatedCourses'

interface CoursePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const { getAllCourses } = await import('@/sanity/lib/courseHelpers')
    const courses = await getAllCourses()
    
    return courses.map((course) => ({
      slug: course.slug.current,
    }))
  } catch (error) {
    console.warn('Failed to generate static params for courses:', error);
    return []
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params
  
  // Fetch course data with error handling
  let course = null;
  let relatedCourses = [];
  
  try {
    course = await getCourseBySlug(slug);
    if (course) {
      relatedCourses = await getRelatedCourses(course.category, course._id);
    }
  } catch (error) {
    console.warn('Failed to fetch course data from Sanity:', error);
  }
  
  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Course Hero Section */}
      <CourseHero course={course} />
      
      {/* Course Details Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <CourseDetails course={course} />
        </div>
      </section>

      {/* Course Lessons Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <CourseLessons lessons={course.lessons} />
        </div>
      </section>

      {/* Course Mentors Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <CourseMentors mentors={course.mentors} />
        </div>
      </section>


      {/* Course CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <CourseCTA />
        </div>
      </section>

      {/* Related Courses Section */}
      {relatedCourses.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <RelatedCourses courses={relatedCourses} />
          </div>
        </section>
      )}
    </div>
  )
}
