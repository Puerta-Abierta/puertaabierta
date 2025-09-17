import { groq } from 'next-sanity'

// Base mentor query with all fields
const mentorFields = `
  _id,
  _createdAt,
  _updatedAt,
  name,
  title,
  bio,
  picture {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    hotspot,
    crop
  },
  link,
  order
`

// Get all mentors
export const getAllMentorsQuery = groq`
  *[_type == "mentor"] | order(order asc, name asc) {
    ${mentorFields}
  }
`

// Get mentors by order
export const getMentorsByOrderQuery = groq`
  *[_type == "mentor"] | order(order asc, name asc) {
    ${mentorFields}
  }
`

// Get a single mentor by ID
export const getMentorByIdQuery = groq`
  *[_type == "mentor" && _id == $id][0] {
    ${mentorFields}
  }
`

// Get featured mentors (if you add a featured field later)
export const getFeaturedMentorsQuery = groq`
  *[_type == "mentor" && featured == true] | order(order asc, name asc) {
    ${mentorFields}
  }
`

// Search mentors by name or title
export const searchMentorsQuery = groq`
  *[_type == "mentor" && (name match $search || title match $search || bio match $search)] | order(order asc, name asc) {
    ${mentorFields}
  }
`

// Get mentors with pagination
export const getMentorsWithPaginationQuery = groq`
  {
    "mentors": *[_type == "mentor"] | order(order asc, name asc) [$start...$end] {
      ${mentorFields}
    },
    "total": count(*[_type == "mentor"])
  }
`

// Get mentor stats
export const getMentorStatsQuery = groq`
  {
    "totalMentors": count(*[_type == "mentor"]),
    "activeMentors": count(*[_type == "mentor"])
  }
`
