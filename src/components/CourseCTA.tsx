import Link from 'next/link'
import { Course } from '@/sanity/lib/courseTypes'

interface CourseCTAProps {
  course: Course
}

export default function CourseCTA({ course }: CourseCTAProps) {
  return (
    <div className="bg-indigo-50 rounded-lg p-6 sticky top-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Ready to Get Started?
      </h3>

      <div className="space-y-4 mb-6">
        <div className="flex items-center text-gray-700">
          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm">Free to enroll</span>
        </div>
        
        <div className="flex items-center text-gray-700">
          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm">Self-paced learning</span>
        </div>
        
        <div className="flex items-center text-gray-700">
          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm">Expert mentorship</span>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href="/mentors"
          className="w-full bg-indigo-300 text-white px-6 py-3 rounded-full font-bold text-center hover:bg-indigo-400 transition-colors duration-400 block"
        >
          Enroll Now
        </Link>
        
        <Link
          href="/contact"
          className="w-full border-2 border-indigo-300 text-indigo-700 px-6 py-3 rounded-full font-semibold text-center hover:bg-indigo-50 transition-colors duration-400 block"
        >
          Ask Questions
        </Link>
      </div>

      <div className="mt-6 pt-6 border-t border-indigo-200">
        <p className="text-sm text-gray-600 text-center">
          Questions about this course?{' '}
          <Link href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Contact our team
          </Link>
        </p>
      </div>
    </div>
  )
}

