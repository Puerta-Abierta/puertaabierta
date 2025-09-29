import { NextRequest, NextResponse } from 'next/server'
import { createContactLead, checkEmailExists } from '@/sanity/lib/contactLeadHelpers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, email, phone } = body
    
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const emailExists = await checkEmailExists(email)
    if (emailExists) {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 409 }
      )
    }

    // Create contact lead in Sanity
    const contactLead = await createContactLead({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
    })

    if (!contactLead) {
      return NextResponse.json(
        { error: 'Failed to create contact lead' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: contactLead._id,
        message: 'Thank you for subscribing! We\'ll keep you updated.',
      },
    })
  } catch (error) {
    console.error('Error creating contact lead:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}
