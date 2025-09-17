import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { 
      courseSlug, 
      courseTitle, 
      price, 
      pricingType, 
      hours, 
      customerEmail 
    } = await request.json()

    // Validate required fields
    if (!courseSlug || !courseTitle || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Calculate price in cents
    const priceInCents = Math.round(price * 100)

    // Create line items based on pricing type
    let lineItems: Array<{
      price_data: {
        currency: string
        product_data: {
          name: string
          description: string
          metadata?: Record<string, string>
        }
        unit_amount: number
      }
      quantity: number
    }> = []

    if (pricingType === 'individual') {
      lineItems = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: courseTitle,
            description: `Individual class: ${courseTitle}`,
          },
          unit_amount: priceInCents,
        },
        quantity: 1,
      }]
    } else if (pricingType === 'package') {
      lineItems = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${courseTitle} - Package`,
            description: `Package pricing: ${hours} hours at $50/hour`,
          },
          unit_amount: priceInCents,
        },
        quantity: 1,
      }]
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseSlug}?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseSlug}?payment=cancelled`,
      customer_email: customerEmail,
      metadata: {
        courseSlug,
        courseTitle,
        pricingType,
        hours: hours?.toString() || '',
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

