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
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                {course.category.charAt(0).toUpperCase() + course.category.slice(1).replace(/-/g, ' ')}
              </span>
              {course.featured && (
                <span className="inline-block ml-2 px-3 py-1 bg-indigo-300 text-indigo-900 text-sm font-medium rounded-full">
                  Featured
                </span>
              )}
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

              <div className="flex items-center text-white/90">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-medium capitalize">{course.difficulty}</span>
              </div>
            </div>

            {/* Tags */}
            {course.tags && course.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/20 text-white text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail */}
          <div className="relative">
            {course.thumbnail ? (
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={urlFor(course.thumbnail).width(800).height(450).url()}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center">
                <div className="text-white text-6xl">📚</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

