'use client'

import Link from 'next/link'
import { Course } from '@/sanity/lib/courseTypes'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface CoursesDropdownProps {
  courses: Course[]
}

export default function CoursesDropdown({ courses }: CoursesDropdownProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="/courses"
          className="block text-[15px] rounded-full md:p-0 py-3 px-3 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          COURSES
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <div className="max-w-sm">
          <p className="mb-2 font-medium">Available Courses</p>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {courses.map((course) => (
              <Link
                key={course._id}
                href={`/courses/${course.slug.current}`}
                className="block text-xs hover:text-primary-foreground/80 transition-colors"
              >
                • {course.title}
              </Link>
            ))}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}