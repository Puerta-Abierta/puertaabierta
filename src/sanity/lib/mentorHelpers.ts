import { serverClient } from './serverClient'
import {
  getAllMentorsQuery,
  getMentorsByOrderQuery,
  getMentorByIdQuery,
  getFeaturedMentorsQuery,
  searchMentorsQuery,
  getMentorsWithPaginationQuery,
  getMentorStatsQuery
} from './mentorQueries'
import { Mentor, MentorFilters, MentorStats } from './mentorTypes'

// Get all mentors
export async function getAllMentors(): Promise<Mentor[]> {
  return await serverClient.fetch(getAllMentorsQuery)
}

// Get mentors ordered by display order
export async function getMentorsByOrder(): Promise<Mentor[]> {
  return await serverClient.fetch(getMentorsByOrderQuery)
}

// Get a single mentor by ID
export async function getMentorById(id: string): Promise<Mentor | null> {
  const mentor = await serverClient.fetch(getMentorByIdQuery, { id })
  return mentor || null
}

// Get featured mentors
export async function getFeaturedMentors(): Promise<Mentor[]> {
  return await serverClient.fetch(getFeaturedMentorsQuery)
}

// Search mentors
export async function searchMentors(searchTerm: string): Promise<Mentor[]> {
  return await serverClient.fetch(searchMentorsQuery, { 
    search: `*${searchTerm}*` 
  })
}

// Get mentors with pagination
export async function getMentorsWithPagination(
  page: number = 1, 
  limit: number = 10
): Promise<{ mentors: Mentor[], total: number, page: number, limit: number, totalPages: number }> {
  const start = (page - 1) * limit
  const end = start + limit
  
  const result = await serverClient.fetch(getMentorsWithPaginationQuery, { start, end })
  
  return {
    mentors: result.mentors,
    total: result.total,
    page,
    limit,
    totalPages: Math.ceil(result.total / limit)
  }
}

// Get mentor statistics
export async function getMentorStats(): Promise<MentorStats> {
  return await serverClient.fetch(getMentorStatsQuery)
}

// Filter mentors based on criteria
export async function filterMentors(filters: MentorFilters): Promise<Mentor[]> {
  let mentors = await getAllMentors()
  
  if (filters.search) {
    mentors = mentors.filter(mentor => 
      mentor.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
      mentor.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
      mentor.bio.toLowerCase().includes(filters.search!.toLowerCase())
    )
  }
  
  return mentors
}

// Get mentor by name (case-insensitive)
export async function getMentorByName(name: string): Promise<Mentor | null> {
  const mentors = await getAllMentors()
  return mentors.find(mentor => 
    mentor.name.toLowerCase() === name.toLowerCase()
  ) || null
}

// Get random mentors
export async function getRandomMentors(count: number = 3): Promise<Mentor[]> {
  const mentors = await getAllMentors()
  const shuffled = mentors.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
