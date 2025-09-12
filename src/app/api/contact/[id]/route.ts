import { NextRequest, NextResponse } from 'next/server'
import { serverClient } from '@/sanity/lib/serverClient'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contactSubmission = await serverClient.fetch(
      `*[_type == "contactForm" && _id == "${params.id}"][0]`
    )

    if (!contactSubmission) {
      return NextResponse.json(
        { error: 'Contact form not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: contactSubmission,
    })
  } catch (error) {
    console.error('Error fetching contact form:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact form' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Only allow updating status and add a note
    const allowedFields = ['status', 'notes']
    const updateData: Record<string, unknown> = {}
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      )
    }

    // Add updatedAt timestamp
    updateData.updatedAt = new Date().toISOString()

    const updatedSubmission = await serverClient
      .patch(params.id)
      .set(updateData)
      .commit()

    return NextResponse.json({
      success: true,
      data: updatedSubmission,
      message: 'Contact form updated successfully',
    })
  } catch (error) {
    console.error('Error updating contact form:', error)
    return NextResponse.json(
      { error: 'Failed to update contact form' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await serverClient.delete(params.id)

    return NextResponse.json({
      success: true,
      message: 'Contact form deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting contact form:', error)
    return NextResponse.json(
      { error: 'Failed to delete contact form' },
      { status: 500 }
    )
  }
}
