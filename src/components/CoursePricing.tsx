'use client'

import { useState } from 'react'
import PaymentButton from './PaymentButton'

interface CoursePricingProps {
  courseSlug: string
  courseTitle: string
  customerEmail?: string
}

export default function CoursePricing({ 
  courseSlug, 
  courseTitle, 
  customerEmail 
}: CoursePricingProps) {
  const [selectedPricing, setSelectedPricing] = useState<'individual' | 'package'>('individual')
  const [packageHours, setPackageHours] = useState(4)

  const individualPrice = 59.99
  const packagePrice = packageHours * 50

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Pricing</h3>
      
      {/* Pricing Type Selector */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setSelectedPricing('individual')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            selectedPricing === 'individual'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Individual Class
        </button>
        <button
          onClick={() => setSelectedPricing('package')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            selectedPricing === 'package'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Package Pricing
        </button>
      </div>

      {/* Individual Pricing */}
      {selectedPricing === 'individual' && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">
              ${individualPrice}
            </div>
            <p className="text-gray-600">Per class</p>
          </div>
          
          <ul className="space-y-3">
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
            courseSlug={courseSlug}
            courseTitle={courseTitle}
            price={individualPrice}
            pricingType="individual"
            customerEmail={customerEmail}
            className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Purchase Individual Class - ${individualPrice}
          </PaymentButton>
        </div>
      )}

      {/* Package Pricing */}
      {selectedPricing === 'package' && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">
              ${packagePrice}
            </div>
            <p className="text-gray-600">Package pricing at $50/hour</p>
          </div>

          {/* Hours Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Hours
            </label>
            <select
              value={packageHours}
              onChange={(e) => setPackageHours(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value={2}>2 hours - $100</option>
              <option value={4}>4 hours - $200</option>
              <option value={6}>6 hours - $300</option>
              <option value={8}>8 hours - $400</option>
              <option value={10}>10 hours - $500</option>
            </select>
          </div>
          
          <ul className="space-y-3">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              All individual class benefits
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Significant savings over individual classes
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Priority support and mentorship
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Flexible scheduling options
            </li>
          </ul>

          <PaymentButton
            courseSlug={courseSlug}
            courseTitle={courseTitle}
            price={packagePrice}
            pricingType="package"
            hours={packageHours}
            customerEmail={customerEmail}
            className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Purchase Package - ${packagePrice} ({packageHours} hours)
          </PaymentButton>
        </div>
      )}
    </div>
  )
}

