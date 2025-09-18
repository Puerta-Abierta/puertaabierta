import { PricingPlansSection } from '@/sanity/lib/homepageTypes'

interface PricingPlansProps {
  content?: PricingPlansSection
}

export default function PricingPlans({ content }: PricingPlansProps) {
  const defaultPlans = [
    {
      name: "Individual Class",
      price: 59.99,
      period: "/class",
      description: "Perfect for trying out a course or focusing on a specific topic.",
      features: [
        "Lifetime access to course materials",
        "Interactive exercises & quizzes",
        "Certificate of completion"
      ],
      cta: "Contact Us to Enroll",
      ctaLink: "/contact",
      popular: false,
      gradient: false
    },
    {
      name: "Mentorship Package",
      price: 50,
      period: "/hour",
      description: "Comprehensive learning with personalized mentorship sessions at $50/hour.",
      features: [
        "All benefits of individual class",
        "Dedicated 1:1 mentor sessions",
        "Priority support",
        "Flexible scheduling options"
      ],
      cta: "Contact Us for Package Pricing",
      ctaLink: "/contact",
      popular: true,
      gradient: true
    },
    {
      name: "B2B Educational",
      price: 25,
      period: "/student",
      description: "Perfect for schools, nonprofits, and educational institutions. Empower your students with financial literacy.",
      features: [
        "Bulk pricing for educational institutions",
        "Custom curriculum integration",
        "Teacher training and support",
        "Progress tracking and reporting",
        "Flexible payment terms"
      ],
      cta: "Contact Us for B2B Pricing",
      ctaLink: "/contact",
      popular: false,
      gradient: false
    }
  ]

  const plans = content?.plans || defaultPlans

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl shadow-lg p-8 ${
                plan.gradient
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 -right-3">
                  <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded text-sm font-semibold">
                    Best Value
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <p className={`mb-6 ${plan.gradient ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className={`text-5xl font-bold ${plan.gradient ? 'text-white' : 'bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-xl ml-2 ${plan.gradient ? 'text-blue-100' : 'text-gray-600'}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg
                      className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${plan.gradient ? 'text-white' : 'text-green-500'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={plan.gradient ? 'text-blue-100' : 'text-gray-700'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaLink}
                className={`w-full block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.gradient
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
