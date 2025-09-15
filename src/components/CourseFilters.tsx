'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface CourseFiltersProps {
  categories: string[]
  difficulties: string[]
}

export default function CourseFilters({ categories, difficulties }: CourseFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [selectedDifficulty, setSelectedDifficulty] = useState(searchParams.get('difficulty') || '')
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')

  const updateFilters = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams)
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    router.push(`/courses?${params.toString()}`)
  }

  const handleCategoryChange = (category: string) => {
    const newCategory = category === selectedCategory ? '' : category
    setSelectedCategory(newCategory)
    updateFilters({ category: newCategory })
  }

  const handleDifficultyChange = (difficulty: string) => {
    const newDifficulty = difficulty === selectedDifficulty ? '' : difficulty
    setSelectedDifficulty(newDifficulty)
    updateFilters({ difficulty: newDifficulty })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      updateFilters({ search: value })
    }, 500)

    return () => clearTimeout(timeoutId)
  }

  const clearFilters = () => {
    setSelectedCategory('')
    setSelectedDifficulty('')
    setSearchTerm('')
    router.push('/courses')
  }

  const hasActiveFilters = selectedCategory || selectedDifficulty || searchTerm

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search courses
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by title or description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Category
          </label>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Difficulty
          </label>
          <div className="space-y-2">
            {difficulties.map((difficulty) => (
              <label key={difficulty} className="flex items-center">
                <input
                  type="radio"
                  name="difficulty"
                  value={difficulty}
                  checked={selectedDifficulty === difficulty}
                  onChange={() => handleDifficultyChange(difficulty)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}




