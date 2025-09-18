'use client'

import { motion } from 'framer-motion'
import { TestimonialsSection } from '@/sanity/lib/homepageTypes'
import PortableTextRenderer from './PortableTextRenderer'

interface Testimonial {
  id: number
  name: string
  title: string
  quote: string
  rating: number
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ben",
    title: "High School Student",
    quote: "Puerta Abierta gave me the confidence and structure I needed for my college applications. I went from feeling completely overwhelmed to checking items off my application list step by step. It's exactly what I needed!",
    rating: 5
  },
  {
    id: 2,
    name: "Carlos Mendez",
    title: "College Student",
    quote: "The guidance and support from Puerta Abierta helped me navigate the entire college application process with confidence. I finally understood what I needed to do and when to do it. Highly recommend!",
    rating: 5
  },
  {
    id: 3,
    name: "Sofia Garcia",
    title: "Recent Graduate",
    quote: "Puerta Abierta broke down the complex college application process into manageable steps that I could actually follow. Thanks to their support, I got accepted to my dream school!",
    rating: 5
  }
]

interface TestimonialsProps {
  content?: TestimonialsSection
}

export default function Testimonials({ content }: TestimonialsProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-8 px-2">
            {content?.title || 'College applications are simpler with someone to guide you'}
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {(content?.testimonialList || fallbackTestimonials).map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-100 rounded-lg p-4 sm:p-6 md:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Stars*/}
              <div className="flex space-x-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <div className="text-sm sm:text-base font-bold text-gray-800 mb-3 sm:mb-4">
                {typeof testimonial.quote === 'string' ? (
                  testimonial.quote
                ) : (
                  <PortableTextRenderer content={testimonial.quote} />
                )}
              </div>
              
              <div className="text-gray-800">
                <p className="text-sm font-semibold">{testimonial.name}</p>
                <p className="text-xs text-gray-600">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}