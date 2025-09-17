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

        {/* Course Information */}
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              formation
            </h3>
            <dl className="">
              <div className="flex justify-between">
                <dt className="text-gray-600">Duration:</dt>
                <dd className="font-medium text-gray-900">{course.duration}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Lessons:</dt>
                <dd className="font-medium text-gray-900">{course.lessonsCount} Lessons</dd>
              </div>
            </dl>
          </div>

          {/* Course Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              About This Course
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {course.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


