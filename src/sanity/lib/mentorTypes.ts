export interface Mentor {
  _id: string
  _createdAt: string
  _updatedAt: string
  name: string
  title: string
  bio: string
  picture: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    _type: 'image'
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
  }
  link: string
  order?: number
}

export interface MentorFilters {
  search?: string
  featured?: boolean
}

export interface MentorStats {
  totalMentors: number
  activeMentors: number
}
