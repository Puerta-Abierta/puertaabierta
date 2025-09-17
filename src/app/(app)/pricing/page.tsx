import Link from 'next/link'
import PaymentButton from '@/components/PaymentButton'

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
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border-2 border-gray-100">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Individual Class</h3>
              <p className="text-gray-600 mb-6">Perfect for trying out our courses or focusing on specific topics</p>
              
              <div className="mb-8">
                <span className="text-5xl font-bold text-indigo-600">$59.99</span>
                <span className="text-gray-600 ml-2">per class</span>
              </div>

              <ul className="text-left space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  One hour of any course of your choice with a mentor
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Lifetime access to course materials
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Interactive exercises and quizzes
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Certificate of completion
                </li>
              </ul>

              <PaymentButton
                courseSlug="sample-course"
                courseTitle="Sample Financial Literacy Course"
                price={59.99}
                pricingType="individual"
                className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Try Individual Class - $59.99
              </PaymentButton>
            </div>
          </div>

          {/* Package Pricing */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 text-white relative overflow-hidden">
            {/* Popular Badge */}
            <div className="absolute top-0 right-0 bg-yellow-400 text-indigo-900 px-4 py-1 rounded-bl-lg text-sm font-bold">
              BEST VALUE
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Class Package</h3>
              <p className="text-indigo-100 mb-6">Save money when you buy multiple classes</p>
              
              <div className="mb-8">
                <span className="text-5xl font-bold">$50</span>
                <span className="text-indigo-100 ml-2">per hour</span>
                <div className="text-sm text-indigo-200 mt-2">
                  (4-Hour Course = $200)
                </div>
              </div>

              <ul className="text-left space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Significant savings on multiple classes
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  All individual class benefits included
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Priority support and mentorship
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Flexible scheduling options
                </li>
              </ul>

              <PaymentButton
                courseSlug="sample-course"
                courseTitle="Sample Financial Literacy Course"
                price={200}
                pricingType="package"
                hours={4}
                className="w-full bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
              >
                Try Package - $200 (4 hours)
              </PaymentButton>
            </div>
          </div>
        </div>

        {/* Pricing Examples */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Package Pricing Examples</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2-Lesson Course</h3>
              <div className="text-3xl font-bold text-indigo-600 mb-2">$100</div>
              <div className="text-sm text-gray-600">$50 × 2 hours</div>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4-Lesson Course</h3>
              <div className="text-3xl font-bold text-indigo-600 mb-2">$200</div>
              <div className="text-sm text-gray-600">$50 × 4 hours</div>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">8-Lesson Course</h3>
              <div className="text-3xl font-bold text-indigo-600 mb-2">$400</div>
              <div className="text-sm text-gray-600">$50 × 8 hours</div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What's the difference between individual classes and packages?</h3>
              <p className="text-gray-600">Individual classes are perfect for specific topics at $59.99 each. Packages offer significant savings at $50 per hour, making them ideal for comprehensive learning or multiple students.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I mix different class lengths in a package?</h3>
              <p className="text-gray-600">Absolutely! Our package pricing is flexible. You can combine different class lengths and topics to create a custom learning plan that fits your needs.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">Yes, we offer a 30-day money-back guarantee for all our courses. If you're not satisfied with your learning experience, we'll provide a full refund.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I get started with a package?</h3>
              <p className="text-gray-600">Contact us to discuss your learning goals and we'll create a custom package that fits your schedule and budget. We'll work with you to design the perfect learning path.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Financial Journey?</h2>
            <p className="text-xl text-indigo-100 mb-6 max-w-2xl mx-auto">
              Join thousands of students who are building their financial future with Puerta Abierta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors duration-200"
              >
                Browse All Courses
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-indigo-600 transition-colors duration-200"
              >
                Get Custom Package
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
