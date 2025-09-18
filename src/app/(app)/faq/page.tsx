'use client'

import { motion } from 'framer-motion'
import PageHero from '@/components/PageHero'

const faqData = [
  {
    category: "About Financial Clarity",
    questions: [
      {
        question: "What is Financial Clarity?",
        answer: "Financial Clarity's Mission is to empower and educate young adults on the 12 essential financial literacy topics and support them with their first steps of their financial journey."
      },
      {
        question: "How can I try Financial Clarity?",
        answer: "Meet with our mentors Ruby and Daniyal during a first free session. Take a quiz to find out your learning style, explore the 12 financial literacy topics available and build your own curriculum!"
      },
      {
        question: "How do I access Financial Clarity Curriculum?",
        answer: "Once you purchase a class or a packaged curriculum, you will receive an email with the invitation to the canvas course page. For any issues or inquiries contact support@puertaabierta.io"
      }
    ]
  },
  {
    category: "Purchase and Payments",
    questions: [
      {
        question: "How can I pay for the course?",
        answer: "For individual classes you can contact us through our pricing page. For the packaged classes, navigate to the courses section and select the desired class. Contact us to discuss pricing and enrollment options for any course."
      },
      {
        question: "I am receiving a payment error.",
        answer: "Please email support@puertaabierta.io with any issues or concerns you are experiencing. We will accommodate your request as soon as we can!"
      }
    ]
  }
]

export default function FAQPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <PageHero 
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our financial literacy programs and services."
      />

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {faqData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="bg-white rounded-2xl shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                {category.category}
              </h2>
              
              <div className="space-y-6">
                {category.questions.map((faq, questionIndex) => (
                  <motion.div
                    key={faq.question}
                    className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (questionIndex * 0.05) }}
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

         {/* Contact Information */}
         <motion.div
           className="mt-16"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.6 }}
         >
           <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto text-center">
             <h3 className="text-2xl font-bold text-gray-900 mb-4">
               Still Have Questions?
             </h3>
             <p className="text-lg text-gray-600 mb-6">
               Can&apos;t find what you&apos;re looking for? For all other inquiries, please email us at:
             </p>
             <a 
               href="mailto:support@puertaabierta.io"
               className="inline-block text-xl font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
             >
               support@puertaabierta.io
             </a>
           </div>
         </motion.div>
      </div>
    </div>
  )
}
