import { StripeLink } from './stripeTypes'

export interface CourseLesson {
  title: string
  duration: string
  objectives: string[]
}

export interface CourseMentor {
  name: string
}

export interface Course {
  _id: string
  _createdAt: string
  _updatedAt: string
  slug: {
    current: string
    _type: 'slug'
  }
  title: string
  description: string
  duration: string
  lessonsCount: number
  lessons: CourseLesson[]
  mentors: CourseMentor[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  prerequisites: string[]
  learningOutcomes: string[]
  isActive: boolean
  featured: boolean
  order: number
  thumbnail: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    _type: 'image'
  }
  tags: string[]
  stripeLinks?: StripeLink[]
}

export interface CourseFilters {
  category?: string
  difficulty?: string
  search?: string
  tags?: string[]
}

export interface CourseStats {
  totalCourses: number
  activeCourses: number
  featuredCourses: number
  categories: string[]
  difficulties: string[]
}

export interface PaginatedCourses {
  courses: Course[]
  total: number
  page: number
  limit: number
  totalPages: number
}

