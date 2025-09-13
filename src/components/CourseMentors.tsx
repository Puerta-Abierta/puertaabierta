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
          <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
            {/* Mentor Image */}
            <div className="flex-shrink-0">
              {mentor.image ? (
                <div className="w-16 h-16 relative rounded-full overflow-hidden">
                  <Image
                    src={urlFor(mentor.image).width(64).height(64).url()}
                    alt={mentor.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 text-xl font-semibold">
                    {mentor.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Mentor Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {mentor.name}
              </h3>
              
              <p className="text-sm text-indigo-600 font-medium mb-2">
                {mentor.session}
              </p>

              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {mentor.bio}
              </p>

              {/* Specialties */}
              {mentor.specialties && mentor.specialties.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {mentor.specialties.map((specialty, specIndex) => (
                    <span
                      key={specIndex}
                      className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

