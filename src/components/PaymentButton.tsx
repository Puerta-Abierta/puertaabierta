'use client'

import { useState } from 'react'
import { getStripe } from '@/lib/stripe-client'

interface PaymentButtonProps {
  courseSlug: string
  courseTitle: string
  price: number
  pricingType: 'individual' | 'package'
  hours?: number
  customerEmail?: string
  className?: string
  children: React.ReactNode
}

export default function PaymentButton({
  courseSlug,
  courseTitle,
  price,
  pricingType,
  hours,
  customerEmail,
  className = '',
  children
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseSlug,
          courseTitle,
          price,
          pricingType,
          hours,
          customerEmail,
        }),
      })

      const { sessionId } = await response.json()

      if (sessionId) {
        const stripe = await getStripe()
        await stripe?.redirectToCheckout({ sessionId })
      } else {
        throw new Error('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className={`${className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? 'Processing...' : children}
    </button>
  )
}

