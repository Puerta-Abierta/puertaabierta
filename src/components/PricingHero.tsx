import { PricingHeroSection } from '@/sanity/lib/homepageTypes'

interface PricingHeroProps {
  content?: PricingHeroSection
}

export default function PricingHero({ content }: PricingHeroProps) {
  const defaultContent = {
    title: "Simple, Transparent Pricing",
    subtitle: "Choose the learning path that works best for you. All our courses are designed to give you real-world financial skills.",
    description: ""
  }

  const hero = content || defaultContent

  return (
    <section className="bg-white pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {hero.title.split(' ').map((word, index) => 
              word === 'Transparent' ? (
                <span key={index} className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {word}{' '}
                </span>
              ) : (
                <span key={index}>{word}{' '}</span>
              )
            )}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
