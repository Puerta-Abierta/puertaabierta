import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { CourseMentor } from '@/sanity/lib/courseTypes'

interface CourseMentorsProps {
  mentors: CourseMentor[]
}

export default function CourseMentors({ mentors }: CourseMentorsProps) {
  if (!mentors || mentors.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Course Mentors ({mentors.length})
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {mentors.map((mentor, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            {/* Mentor Avatar */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 text-xl font-semibold">
                  {mentor.name.charAt(0)}
                </span>
              </div>
            </div>

            {/* Mentor Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900">
                {mentor.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


