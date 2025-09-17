import { serverClient } from './serverClient'
import {
  getAllCoursesQuery,
  getActiveCoursesQuery,
  getFeaturedCoursesQuery,
  getCourseBySlugQuery,
  getCourseByIdQuery,
  getCoursesByCategoryQuery,
  getCoursesByDifficultyQuery,
  searchCoursesQuery,
  getCoursesByTagsQuery,
  getCourseStatsQuery,
  getCoursesWithPaginationQuery,
  getRelatedCoursesQuery,
  getCourseLessonsQuery,
  getCourseMentorsQuery,
  getCategoriesQuery,
  getDifficultiesQuery,
  getTagsQuery
} from './courseQueries'
import { Course, CourseFilters, CourseStats, PaginatedCourses, CourseLesson, CourseMentor } from './courseTypes'
import { getActiveStripeLinksByCourse, getCoursePricingOptions } from './stripeHelpers'

// Get all courses
export async function getAllCourses(): Promise<Course[]> {
  return await serverClient.fetch(getAllCoursesQuery)
}

// Get active courses only
export async function getActiveCourses(): Promise<Course[]> {
  return await serverClient.fetch(getActiveCoursesQuery)
}

// Get featured courses
export async function getFeaturedCourses(): Promise<Course[]> {
  return await serverClient.fetch(getFeaturedCoursesQuery)
}

// Get course by slug
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  return await serverClient.fetch(getCourseBySlugQuery, { slug })
}

// Get course by ID
export async function getCourseById(id: string): Promise<Course | null> {
  return await serverClient.fetch(getCourseByIdQuery, { id })
}

// Get courses by category
export async function getCoursesByCategory(category: string): Promise<Course[]> {
  return await serverClient.fetch(getCoursesByCategoryQuery, { category })
}

// Get courses by difficulty
export async function getCoursesByDifficulty(difficulty: string): Promise<Course[]> {
  return await serverClient.fetch(getCoursesByDifficultyQuery, { difficulty })
}

// Search courses
export async function searchCourses(searchTerm: string): Promise<Course[]> {
  return await serverClient.fetch(searchCoursesQuery, { searchTerm: `*${searchTerm}*` })
}

// Get courses by tags
export async function getCoursesByTags(tags: string[]): Promise<Course[]> {
  return await serverClient.fetch(getCoursesByTagsQuery, { tags })
}

// Get course statistics
export async function getCourseStats(): Promise<CourseStats> {
  return await serverClient.fetch(getCourseStatsQuery)
}

// Get courses with pagination
export async function getCoursesWithPagination(
  page: number = 1,
  limit: number = 12
): Promise<PaginatedCourses> {
  const start = (page - 1) * limit
  const end = start + limit

  const result = await serverClient.fetch(getCoursesWithPaginationQuery, { start, end })
  
  return {
    ...result,
    page,
    limit,
    totalPages: Math.ceil(result.total / limit)
  }
}

// Get related courses
export async function getRelatedCourses(category: string, excludeId: string): Promise<Course[]> {
  return await serverClient.fetch(getRelatedCoursesQuery, { category, excludeId })
}

// Get course with related courses
export async function getCourseWithRelated(slug: string): Promise<{
  course: Course | null
  relatedCourses: Course[]
}> {
  const course = await getCourseBySlug(slug)
  
  if (!course) {
    return { course: null, relatedCourses: [] }
  }

  const relatedCourses = await getRelatedCourses(course.category, course._id)
  
  return { course, relatedCourses }
}

// Get course lessons only
export async function getCourseLessons(slug: string): Promise<CourseLesson[]> {
  const result = await serverClient.fetch(getCourseLessonsQuery, { slug })
  return result?.lessons || []
}

// Get course mentors only
export async function getCourseMentors(slug: string): Promise<CourseMentor[]> {
  const result = await serverClient.fetch(getCourseMentorsQuery, { slug })
  return result?.mentors || []
}

// Get all categories
export async function getCategories(): Promise<string[]> {
  return await serverClient.fetch(getCategoriesQuery)
}

// Get all difficulties
export async function getDifficulties(): Promise<string[]> {
  return await serverClient.fetch(getDifficultiesQuery)
}

// Get all tags
export async function getTags(): Promise<string[]> {
  return await serverClient.fetch(getTagsQuery)
}

// Filter courses based on filters
export async function filterCourses(filters: CourseFilters): Promise<Course[]> {
  let courses = await getActiveCourses()

  if (filters.category) {
    courses = courses.filter(course => course.category === filters.category)
  }

  if (filters.difficulty) {
    courses = courses.filter(course => course.difficulty === filters.difficulty)
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    courses = courses.filter(course => 
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm)
    )
  }

  if (filters.tags && filters.tags.length > 0) {
    courses = courses.filter(course => 
      course.tags.some(tag => filters.tags!.includes(tag))
    )
  }

  return courses
}

// Utility functions
export function getDifficultyLabel(difficulty: string): string {
  const labels: Record<string, string> = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced'
  }
  return labels[difficulty] || difficulty
}

export function getCategoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')
}

// Get courses with their Stripe links
export async function getCoursesWithStripeLinks(): Promise<Course[]> {
  const courses = await getAllCourses()
  return courses
}

// Get a single course with its Stripe links
export async function getCourseWithStripeLinks(slug: string): Promise<Course | null> {
  const course = await getCourseBySlug(slug)
  return course
}

// Get pricing options for a specific course
export async function getCoursePricing(slug: string) {
  return await getCoursePricingOptions(slug)
}

// Get the primary (lowest price) Stripe link for a course
export async function getPrimaryStripeLinkForCourse(slug: string) {
  const stripeLinks = await getActiveStripeLinksByCourse(slug)
  if (stripeLinks.length === 0) return null
  
  return stripeLinks.reduce((lowest, current) => 
    current.price < lowest.price ? current : lowest
  )
}

