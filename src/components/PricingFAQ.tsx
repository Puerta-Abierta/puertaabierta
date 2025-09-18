"use client";
import { useState } from 'react'
import { PricingFAQSection } from '@/sanity/lib/homepageTypes'

interface PricingFAQProps {
  content?: PricingFAQSection
}

export default function PricingFAQ({ content }: PricingFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const defaultFAQs = [
    {
      question: "What's the difference between individual classes and packages?",
      answer: "Individual classes are perfect for specific topics at $59.99 each. Packages offer significant savings at $50 per hour, making them ideal for comprehensive learning or multiple students."
    },
    {
      question: "Can I mix different class lengths in a package?",
      answer: "Absolutely! Our package pricing is flexible. You can combine different class lengths and topics to create a custom learning plan that fits your needs."
    }
  ]

  const faqs = content?.faqs || defaultFAQs

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {content?.title || "Frequently Asked Questions"}
          </h2>
          <p className="text-xl text-gray-600">
            {content?.subtitle || "Everything you need to know about our pricing and programs"}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help.
          </p>
          <a
            href="/contact"
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            Contact our team →
          </a>
        </div>
      </div>
    </section>
  )
}
