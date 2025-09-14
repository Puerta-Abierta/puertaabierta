import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Course } from '@/sanity/lib/courseTypes'

interface CourseHeroProps {
  course: Course
}

export default function CourseHero({ course }: CourseHeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-900">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-16 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                Financial Literacy
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {course.title}
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {course.description}
            </p>

            {/* Course Stats */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center text-white/90">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{course.duration}</span>
              </div>
              
              <div className="flex items-center text-white/90">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium">{course.lessonsCount} lessons</span>
              </div>

            </div>

          </div>

          {/* Thumbnail */}
          <div className="relative max-w-md mx-auto lg:mx-0">
            {course.thumbnail ? (
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={urlFor(course.thumbnail).width(400).height(225).url()}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center">
                <div className="text-white text-4xl">📚</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


