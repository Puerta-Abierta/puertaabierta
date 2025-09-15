'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Course } from '@/sanity/lib/courseTypes'

interface CoursesDropdownProps {
  courses: Course[]
}

export default function CoursesDropdown({ courses }: CoursesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger with bigger hover area */}
      <div className="py-2 px-4 -mx-4 rounded-md hover:bg-gray-100 md:hover:bg-transparent transition-colors">
        <Link
          href="/courses"
          className="block text-[15px] font-medium hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white"
        >
          COURSES
        </Link>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-96 bg-primary text-primary-foreground rounded-md shadow-xl border border-primary/20 z-50">
          <div className="p-4">
            {/* All Courses in Two Columns */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
              {courses.map((course, index) => (
                <div key={course._id} className="flex flex-col">
                  <Link
                    href={`/courses/${course.slug.current}`}
                    className="flex items-center space-x-3 py-2 px-3 hover:bg-primary-foreground/10 transition-colors group rounded-md"
                  >
                    <div className="w-2 h-2 bg-primary-foreground/60 rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-primary-foreground group-hover:text-primary-foreground/80 transition-colors truncate text-left">
                      {course.title}
                    </span>
                  </Link>
                  {/* Separator line */}
                  {index < courses.length - 1 && (
                    <div className="h-px bg-primary-foreground/20 mx-2 my-1"></div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-primary-foreground/20">
              <Link
                href="/courses"
                className="block w-full text-center text-xs font-medium text-primary-foreground/80 hover:text-primary-foreground py-2 px-3 rounded-md hover:bg-primary-foreground/10 transition-colors"
              >
                View All Courses →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}