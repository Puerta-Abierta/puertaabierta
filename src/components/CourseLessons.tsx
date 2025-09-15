'use client'

import { useState } from 'react'
import { CourseLesson } from '@/sanity/lib/courseTypes'

interface CourseLessonsProps {
  lessons: CourseLesson[]
}

export default function CourseLessons({ lessons }: CourseLessonsProps) {
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null)

  const toggleLesson = (index: number) => {
    setExpandedLesson(expandedLesson === index ? null : index)
  }

  if (!lessons || lessons.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Course Lessons ({lessons.length})
      </h2>

      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleLesson(index)}
              className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Duration: {lesson.duration}
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedLesson === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {expandedLesson === index && (
              <div className="px-6 pb-4 border-t border-gray-200 bg-gray-50">
                <div className="pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Learning Objectives:
                  </h4>
                  <ul className="space-y-2">
                    {lesson.objectives.map((objective, objIndex) => (
                      <li key={objIndex} className="flex items-start">
                        <svg
                          className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
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
                        <span className="text-sm text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}




