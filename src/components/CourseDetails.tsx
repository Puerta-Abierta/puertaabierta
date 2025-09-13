import { Course } from '@/sanity/lib/courseTypes'

interface CourseDetailsProps {
  course: Course
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Course Details
      </h2>

      <div className="space-y-8">
        {/* Prerequisites */}
        {course.prerequisites && course.prerequisites.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Prerequisites
            </h3>
            <ul className="space-y-2">
              {course.prerequisites.map((prereq, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-700">{prereq}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Learning Outcomes */}
        {course.learningOutcomes && course.learningOutcomes.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              What You&apos;ll Learn
            </h3>
            <ul className="space-y-2">
              {course.learningOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Course Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Course Information
            </h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-600">Duration:</dt>
                <dd className="font-medium text-gray-900">{course.duration}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Lessons:</dt>
                <dd className="font-medium text-gray-900">{course.lessonsCount}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Difficulty:</dt>
                <dd className="font-medium text-gray-900 capitalize">{course.difficulty}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Category:</dt>
                <dd className="font-medium text-gray-900">
                  {course.category.charAt(0).toUpperCase() + course.category.slice(1).replace(/-/g, ' ')}
                </dd>
              </div>
            </dl>
          </div>

          {/* Tags */}
          {course.tags && course.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Topics Covered
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

