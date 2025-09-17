import { groq } from 'next-sanity'

// Base course query with all fields
const courseFields = `
  _id,
  _createdAt,
  _updatedAt,
  slug,
  title,
  description,
  duration,
  lessonsCount,
  lessons[] {
    title,
    duration,
    objectives
  },
  mentors[] {
    name,
    session,
    bio,
    specialties,
    image
  },
  difficulty,
  category,
  prerequisites,
  learningOutcomes,
  isActive,
  featured,
  order,
  thumbnail,
  tags,
  "stripeLinks": *[_type == "stripeLink" && courseSlug == slug.current && isActive == true] {
    _id,
    courseSlug,
    stripeUrl,
    priceId,
    price,
    isActive,
    description,
    pricingType,
    hours
  }
`

// Get all courses
export const getAllCoursesQuery = groq`
  *[_type == "course"] | order(order asc, title asc) {
    ${courseFields}
  }
`

// Get active courses only
export const getActiveCoursesQuery = groq`
  *[_type == "course" && isActive == true] | order(order asc, title asc) {
    ${courseFields}
  }
`

// Get featured courses
export const getFeaturedCoursesQuery = groq`
  *[_type == "course" && featured == true && isActive == true] | order(order asc, title asc) {
    ${courseFields}
  }
`

// Get course by slug
export const getCourseBySlugQuery = groq`
  *[_type == "course" && slug.current == $slug][0] {
    ${courseFields}
  }
`

// Get course by ID
export const getCourseByIdQuery = groq`
  *[_type == "course" && _id == $id][0] {
    ${courseFields}
  }
`

// Get courses by category
export const getCoursesByCategoryQuery = groq`
  *[_type == "course" && category == $category && isActive == true] | order(order asc, title asc) {
    ${courseFields}
  }
`

// Get courses by difficulty
export const getCoursesByDifficultyQuery = groq`
  *[_type == "course" && difficulty == $difficulty && isActive == true] | order(order asc, title asc) {
    ${courseFields}
  }
`

// Search courses by title or description
export const searchCoursesQuery = groq`
  *[_type == "course" && (title match $searchTerm || description match $searchTerm) && isActive == true] | order(order asc, title asc) {
    ${courseFields}
  }
`

// Get courses with specific tags
export const getCoursesByTagsQuery = groq`
  *[_type == "course" && count(tags[@ in $tags]) > 0 && isActive == true] | order(order asc, title asc) {
    ${courseFields}
  }
`

// Get course statistics
export const getCourseStatsQuery = groq`
  {
    "totalCourses": count(*[_type == "course"]),
    "activeCourses": count(*[_type == "course" && isActive == true]),
    "featuredCourses": count(*[_type == "course" && featured == true && isActive == true]),
    "categories": array::unique(*[_type == "course" && isActive == true].category),
    "difficulties": array::unique(*[_type == "course" && isActive == true].difficulty)
  }
`

// Get courses with pagination
export const getCoursesWithPaginationQuery = groq`
  {
    "courses": *[_type == "course" && isActive == true] | order(order asc, title asc) [$start...$end] {
      ${courseFields}
    },
    "total": count(*[_type == "course" && isActive == true])
  }
`

// Get related courses (same category, excluding current course)
export const getRelatedCoursesQuery = groq`
  *[_type == "course" && category == $category && _id != $excludeId && isActive == true] | order(order asc, title asc) [0...3] {
    ${courseFields}
  }
`

// Get course lessons only
export const getCourseLessonsQuery = groq`
  *[_type == "course" && slug.current == $slug][0] {
    lessons[] {
      title,
      duration,
      objectives
    }
  }
`

// Get course mentors only
export const getCourseMentorsQuery = groq`
  *[_type == "course" && slug.current == $slug][0] {
    mentors[] {
      name,
      session,
      bio,
      specialties,
      image
    }
  }
`

// Get all unique categories
export const getCategoriesQuery = groq`
  array::unique(*[_type == "course" && isActive == true].category) | order(asc)
`

// Get all unique difficulties
export const getDifficultiesQuery = groq`
  array::unique(*[_type == "course" && isActive == true].difficulty) | order(asc)
`

// Get all unique tags
export const getTagsQuery = groq`
  array::unique(*[_type == "course" && isActive == true].tags[]) | order(asc)
`
