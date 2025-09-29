import { serverClient } from './serverClient'

export interface ContactLead {
  _id: string
  _createdAt: string
  _updatedAt: string
  name: string
  email: string
  phone?: string
  subscribedAt: string
  isActive: boolean
}

export interface ContactLeadFilters {
  isActive?: boolean
  limit?: number
  offset?: number
}

// Create a new contact lead
export async function createContactLead(data: {
  name: string
  email: string
  phone?: string
}): Promise<ContactLead | null> {
  try {
    const contactLead = {
      _type: 'contactLead',
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || '',
      subscribedAt: new Date().toISOString(),
      isActive: true,
    }

    const result = await serverClient.create(contactLead)
    return result as unknown as ContactLead
  } catch (error) {
    console.error('Error creating contact lead:', error)
    return null
  }
}

// Check if email already exists
export async function checkEmailExists(email: string): Promise<boolean> {
  const existingLead = await serverClient.fetch(`
    *[_type == "contactLead" && email == "${email.toLowerCase()}"][0]
  `)
  
  return !!existingLead
}

// Get all contact leads
export async function getAllContactLeads(): Promise<ContactLead[]> {
  return await serverClient.fetch(`
    *[_type == "contactLead"] | order(subscribedAt desc) {
      _id,
      _createdAt,
      _updatedAt,
      name,
      email,
      phone,
      subscribedAt,
      isActive
    }
  `)
}

// Get contact leads with filters
export async function getContactLeads(filters: ContactLeadFilters = {}): Promise<{
  leads: ContactLead[]
  total: number
}> {
  const { isActive, limit = 10, offset = 0 } = filters
  
  let query = '*[_type == "contactLead"]'
  
  const conditions = []
  if (isActive !== undefined) {
    conditions.push(`isActive == ${isActive}`)
  }
  
  if (conditions.length > 0) {
    query += `[${conditions.join(' && ')}]`
  }
  
  query += ` | order(subscribedAt desc) [${offset}...${offset + limit}] {
    _id,
    _createdAt,
    _updatedAt,
    name,
    email,
    phone,
    subscribedAt,
    isActive
  }`

  const leads = await serverClient.fetch(query)

  // Get total count
  let countQuery = '*[_type == "contactLead"]'
  if (conditions.length > 0) {
    countQuery += `[${conditions.join(' && ')}]`
  }
  countQuery = `count(${countQuery})`

  const total = await serverClient.fetch(countQuery)

  return { leads, total }
}
