import Link from 'next/link'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, <span className="text-indigo-600">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the learning path that works best for you. All our courses are designed to give you real-world financial skills.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Individual Class */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col h-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Individual Class</h3>
            <p className="text-gray-600 mb-6 flex-grow">Perfect for trying out a course or focusing on a specific topic.</p>
            <div className="text-4xl font-extrabold text-indigo-600 mb-6">$59.99<span className="text-xl font-medium text-gray-500">/class</span></div>
            <ul className="text-gray-700 space-y-3 mb-8 flex-grow">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Lifetime access to course materials
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Interactive exercises & quizzes
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Certificate of completion
              </li>
            </ul>
            <Link
              href="/contact"
              className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-center"
            >
              Contact Us to Enroll
            </Link>
          </div>

          {/* Package Pricing */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 flex flex-col h-full text-white relative overflow-hidden">
            <span className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
              Best Value
            </span>
            <h3 className="text-2xl font-bold mb-4">Mentorship Package</h3>
            <p className="text-indigo-100 mb-6 flex-grow">
              Comprehensive learning with personalized mentorship sessions at $50/hour.
            </p>
            <div className="text-4xl font-extrabold mb-6">
              $50<span className="text-xl font-medium text-indigo-100">/hour</span>
            </div>
            <ul className="text-indigo-100 space-y-3 mb-8 flex-grow">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                All benefits of individual class
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Dedicated 1:1 mentor sessions
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Priority support
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Flexible scheduling options
              </li>
            </ul>
            <Link
              href="/contact"
              className="w-full bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors duration-200 text-center"
            >
              Contact Us for Package Pricing
            </Link>
          </div>
        </div>

        {/* Package Examples */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Package Examples</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2 Hours</h3>
              <p className="text-3xl font-bold text-indigo-600 mb-2">$100</p>
              <p className="text-gray-600">Perfect for a quick deep-dive into a specific topic</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">4 Hours</h3>
              <p className="text-3xl font-bold text-indigo-600 mb-2">$200</p>
              <p className="text-gray-600">Comprehensive learning for most topics</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">8 Hours</h3>
              <p className="text-3xl font-bold text-indigo-600 mb-2">$400</p>
              <p className="text-gray-600">Complete mastery and advanced concepts</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What&apos;s the difference between individual classes and packages?</h3>
              <p className="text-gray-600">Individual classes are perfect for specific topics at $59.99 each. Packages offer significant savings at $50 per hour, making them ideal for comprehensive learning or multiple students.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I mix different class lengths in a package?</h3>
              <p className="text-gray-600">Absolutely! Our package pricing is flexible. You can combine different class lengths and topics to create a custom learning plan that fits your needs.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">Yes, we offer a 30-day money-back guarantee for all our courses. If you&apos;re not satisfied with your learning experience, we&apos;ll provide a full refund.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I get started with a package?</h3>
              <p className="text-gray-600">Contact us to discuss your learning goals and we&apos;ll create a custom package that fits your schedule and budget. We&apos;ll work with you to design the perfect learning path.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Financial Journey?</h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-3xl mx-auto">
            Whether you choose an individual class or a comprehensive package, we&apos;re here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors duration-200"
            >
              Get Started Today
            </Link>
            <Link
              href="/courses"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transition-colors duration-200"
            >
              Browse All Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}