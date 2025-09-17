import { NextRequest, NextResponse } from 'next/server'
import { serverClient } from '@/sanity/lib/serverClient'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, email, subject, message } = body
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, subject, and message are required' },
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

    // Get client IP and user agent for tracking
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Create contact form submission in Sanity
    const contactSubmission = {
      _type: 'contactForm',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: body.phone?.trim() || '',
      subject: subject.trim(),
      message: message.trim(),
      status: 'new',
      submittedAt: new Date().toISOString(),
      ipAddress: ip,
      userAgent: userAgent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const result = await serverClient.create(contactSubmission)

    return NextResponse.json({
      success: true,
      data: {
        id: result._id,
        message: 'Contact form submitted successfully',
      },
    })
  } catch (error) {
    console.error('Error creating contact form submission:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = '*[_type == "contactForm"]'
    
    if (status) {
      query += `[status == "${status}"]`
    }
    
    query += ` | order(submittedAt desc) [${offset}...${offset + limit}] {
      _id,
      name,
      email,
      phone,
      subject,
      message,
      status,
      submittedAt,
      createdAt,
      updatedAt
    }`

    const contactSubmissions = await serverClient.fetch(query)

    // Get total count for pagination
    let countQuery = 'count(*[_type == "contactForm"]'
    if (status) {
      countQuery += `[status == "${status}"]`
    }
    countQuery += ')'

    const total = await serverClient.fetch(countQuery)

    return NextResponse.json({
      success: true,
      data: contactSubmissions,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    })
  } catch (error) {
    console.error('Error fetching contact form submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact form submissions' },
      { status: 500 }
    )
  }
}
