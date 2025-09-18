import { PricingPackagesSection } from '@/sanity/lib/homepageTypes'

interface PricingPackagesProps {
  content?: PricingPackagesSection
}

export default function PricingPackages({ content }: PricingPackagesProps) {
  const defaultPackages = [
    {
      hours: "2 Hours",
      price: 100,
      description: "Perfect for a quick deep-dive into a specific topic"
    },
    {
      hours: "4 Hours", 
      price: 200,
      description: "Comprehensive learning for most topics"
    },
    {
      hours: "8 Hours",
      price: 400,
      description: "Complete mastery and advanced concepts"
    }
  ]

  const packages = content?.packages || defaultPackages

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {content?.title || "Package Examples"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 text-center"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">{pkg.hours}</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">${pkg.price}</div>
              <p className="text-gray-600">{pkg.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
