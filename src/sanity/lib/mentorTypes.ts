export interface Mentor {
  _id: string
  _createdAt: string
  _updatedAt: string
  name: string
  title: string
  bio: string
  picture: {
    asset: {
      _id: string
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    _type: 'image'
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
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
