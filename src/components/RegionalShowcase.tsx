'use client'

import Image from 'next/image'

export default function RegionalShowcase() {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Born in the Bay, Built in OC
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bridging two of California&apos;s most innovative regions to bring you world-class financial education
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Bay Area Section */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-6">
              {/* <Image
                src="/bay-area-logo.png"
                alt="Bay Area"
                fill
                className="object-contain"
                onError={(e) => {
                  // Fallback to a placeholder if image doesn't exist
                  e.currentTarget.style.display = 'none'
                }}
              /> */}
              {/* Fallback icon if image doesn't exist */}
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                SF
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Bay Area Roots</h3>
            <p className="text-gray-600 max-w-xs">
              Born from the innovation and entrepreneurial spirit of Silicon Valley
            </p>
          </div>

          {/* Connecting Arrow */}
          <div className="hidden md:block">
            <svg
              className="w-8 h-8 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>

          {/* Orange County Section */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-6">
              <Image
                src="/ucirvine.png"
                alt="UC Irvine"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Orange County Growth</h3>
            <p className="text-gray-600 max-w-xs">
              Built and refined through partnerships with UC Irvine and the OC community
            </p>
          </div>
        </div>

        {/* Additional Info */}
        {/* <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              Why This Matters
            </h4>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Innovation</h5>
                <p>Leveraging Bay Area's tech expertise for cutting-edge educational solutions</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Community</h5>
                <p>Rooted in Orange County's diverse and vibrant student community</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Excellence</h5>
                <p>Combining the best of both regions for superior educational outcomes</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  )
}
