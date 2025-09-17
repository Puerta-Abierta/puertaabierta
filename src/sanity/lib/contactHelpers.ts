import { serverClient } from './serverClient'

export interface ContactSubmission {
  _id: string
  _createdAt: string
  _updatedAt: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'new' | 'in_progress' | 'resolved' | 'closed'
  submittedAt: string
  ipAddress?: string
  userAgent?: string
}

export interface ContactFilters {
  status?: 'new' | 'in_progress' | 'resolved' | 'closed'
  limit?: number
  offset?: number
}

// Get all contact form submissions
export async function getAllContactSubmissions(): Promise<ContactSubmission[]> {
  return await serverClient.fetch(`
    *[_type == "contactForm"] | order(submittedAt desc) {
      _id,
      _createdAt,
      _updatedAt,
      name,
      email,
      phone,
      subject,
      message,
      status,
      submittedAt,
      ipAddress,
      userAgent
    }
  `)
}

// Get contact submissions with filters
export async function getContactSubmissions(filters: ContactFilters = {}): Promise<{
  submissions: ContactSubmission[]
  total: number
}> {
  const { status, limit = 10, offset = 0 } = filters
  
  let query = '*[_type == "contactForm"]'
  
  if (status) {
    query += `[status == "${status}"]`
  }
  
  query += ` | order(submittedAt desc) [${offset}...${offset + limit}] {
    _id,
    _createdAt,
    _updatedAt,
    name,
    email,
    phone,
    subject,
    message,
    status,
    submittedAt,
    ipAddress,
    userAgent
  }`

  const submissions = await serverClient.fetch(query)

  // Get total count
  let countQuery = 'count(*[_type == "contactForm"]'
  if (status) {
    countQuery += `[status == "${status}"]`
  }
  countQuery += ')'

  const total = await serverClient.fetch(countQuery)

  return { submissions, total }
}

// Get a single contact submission by ID
export async function getContactSubmissionById(id: string): Promise<ContactSubmission | null> {
  const submission = await serverClient.fetch(`
    *[_type == "contactForm" && _id == "${id}"][0] {
      _id,
      _createdAt,
      _updatedAt,
      name,
      email,
      phone,
      subject,
      message,
      status,
      submittedAt,
      ipAddress,
      userAgent
    }
  `)
  
  return submission || null
}

// Update contact submission status
export async function updateContactSubmissionStatus(
  id: string, 
  status: 'new' | 'in_progress' | 'resolved' | 'closed',
  notes?: string
): Promise<ContactSubmission | null> {
  try {
    const updateData: Record<string, string> = {
      status,
      updatedAt: new Date().toISOString(),
    }

    if (notes) {
      updateData.notes = notes
    }

    const result = await serverClient
      .patch(id)
      .set(updateData)
      .commit()

    return result as unknown as ContactSubmission
  } catch (error) {
    console.error('Error updating contact submission:', error)
    return null
  }
}

// Get contact submission statistics
export async function getContactSubmissionStats(): Promise<{
  total: number
  new: number
  inProgress: number
  resolved: number
  closed: number
}> {
  const stats = await serverClient.fetch(`
    {
      "total": count(*[_type == "contactForm"]),
      "new": count(*[_type == "contactForm" && status == "new"]),
      "inProgress": count(*[_type == "contactForm" && status == "in_progress"]),
      "resolved": count(*[_type == "contactForm" && status == "resolved"]),
      "closed": count(*[_type == "contactForm" && status == "closed"])
    }
  `)

  return stats
}

// Search contact submissions
export async function searchContactSubmissions(searchTerm: string): Promise<ContactSubmission[]> {
  return await serverClient.fetch(`
    *[_type == "contactForm" && (
      name match "*${searchTerm}*" ||
      email match "*${searchTerm}*" ||
      subject match "*${searchTerm}*" ||
      message match "*${searchTerm}*"
    )] | order(submittedAt desc) {
      _id,
      _createdAt,
      _updatedAt,
      name,
      email,
      phone,
      subject,
      message,
      status,
      submittedAt,
      ipAddress,
      userAgent
    }
  `)
}
