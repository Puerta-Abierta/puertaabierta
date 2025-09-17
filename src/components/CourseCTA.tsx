export default function CourseCTA() {
  return (
    <div className="bg-indigo-50 rounded-lg p-6 sticky top-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Ready to Start Learning?
        </h3>
        <p className="text-gray-600 mb-6">
          Join thousands of students building their financial literacy skills
        </p>
        
        <div className="space-y-3">
          <a
            href="/mentors"
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full font-bold text-center hover:bg-indigo-700 transition-colors duration-400 block"
          >
            Book Free Intro Session
          </a>
          
          <a
            href="/contact"
            className="w-full border-2 border-indigo-600 text-indigo-700 px-6 py-3 rounded-full font-semibold text-center hover:bg-indigo-50 transition-colors duration-400 block"
          >
            Contact Us
          </a>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>✓ Free introductory session</p>
          <p>✓ Expert mentorship</p>
          <p>✓ Self-paced learning</p>
        </div>
      </div>
    </div>
  )
}