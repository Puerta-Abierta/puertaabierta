'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

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
        answer: "For individual classes you can purchase them on the Puerta Abierta Page under \"Our Pricing\" section. For the packaged classes, navigate to Financial Literacy tab and select the desired class. On the class page, there is a \"Buy Now\" option, where you can purchase the entire course. All the payments are processed securely with stripe."
      },
      {
        question: "I am receiving a payment error.",
        answer: "Please email support@puertaabierta.io with any issues or concerns you are experiencing. We will accommodate your request as soon as we can!"
      }
    ]
  }
]

export default function FAQPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'FAQ Support Request')
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
    `)
    
    const mailtoLink = `mailto:support@puertaabierta.io?subject=${subject}&body=${body}`
    window.open(mailtoLink, '_blank')
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Frequently Asked <span className="text-yellow-300">Questions</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-indigo-100 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Find answers to common questions about our financial literacy programs and services.
            </motion.p>
          </div>
        </div>
      </div>

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

         {/* Contact Form */}
         <motion.div
           className="mt-16"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.6 }}
         >
           <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
             <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
               Still Have Questions?
             </h3>
             <p className="text-lg text-gray-600 mb-6 text-center">
               Can&apos;t find what you&apos;re looking for? Send us a message and we&apos;ll get back to you!
             </p>
             
             {isSubmitted ? (
               <div className="text-center py-8">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                   <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                   </svg>
                 </div>
                 <h4 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h4>
                 <p className="text-gray-600">Your email client should open with a pre-filled message. If it doesn&apos;t, please email us directly at support@puertaabierta.io</p>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                       Name *
                     </label>
                     <input
                       type="text"
                       id="name"
                       name="name"
                       value={formData.name}
                       onChange={handleChange}
                       required
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                       placeholder="Your name"
                     />
                   </div>
                   <div>
                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                       Email *
                     </label>
                     <input
                       type="email"
                       id="email"
                       name="email"
                       value={formData.email}
                       onChange={handleChange}
                       required
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                       placeholder="your@email.com"
                     />
                   </div>
                 </div>
                 
                 <div>
                   <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                     Subject
                   </label>
                   <input
                     type="text"
                     id="subject"
                     name="subject"
                     value={formData.subject}
                     onChange={handleChange}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                     placeholder="What's your question about?"
                   />
                 </div>
                 
                 <div>
                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                     Message *
                   </label>
                   <textarea
                     id="message"
                     name="message"
                     value={formData.message}
                     onChange={handleChange}
                     required
                     rows={4}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                     placeholder="Please describe your question or concern..."
                   />
                 </div>
                 
                 <div className="flex flex-col sm:flex-row gap-4">
                   <button
                     type="submit"
                     disabled={isSubmitting}
                     className="flex-1 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                   >
                     {isSubmitting ? 'Opening Email...' : 'Send Message'}
                   </button>
                   <a
                     href="/mentors"
                     className="flex-1 px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200 text-center"
                   >
                     Book Free Session
                   </a>
                 </div>
               </form>
             )}
           </div>
         </motion.div>
      </div>
    </div>
  )
}
