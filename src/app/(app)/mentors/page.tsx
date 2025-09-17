import { getAllMentors } from '@/sanity/lib/mentorHelpers'
import Image from 'next/image'
import Link from 'next/link'

export default async function MentorsPage() {
  const mentors = await getAllMentors()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Meet Your <span className="text-yellow-300">Mentors</span>
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Learn from experienced professionals who are passionate about helping you succeed in your financial journey. Book a free session with a mentor to get personalized guidance.
            </p>
          </div>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <div
              key={mentor._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Mentor Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={mentor.picture.asset.url}
                  alt={mentor.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Mentor Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {mentor.name}
                </h3>
                <p className="text-indigo-600 font-semibold mb-4">
                  {mentor.title}
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {mentor.bio}
                </p>
                
                {/* CTA Button */}
                <Link
                  href={mentor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 group"
                >
                  Free Intro Session with {mentor.name.split(' ')[0]}
                  <svg
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Book a free introductory session with any of our mentors and take the first step towards financial success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Explore Courses
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
