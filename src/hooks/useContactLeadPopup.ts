'use client'

import { useState, useEffect } from 'react'

export function useContactLeadPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  // Show popup after 2 seconds on every page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 2000) // Show after 2 seconds

    return () => clearTimeout(timer)
  }, [])

  // Show popup after scrolling if not shown yet
  useEffect(() => {
    if (hasShown) return

    let scrollTimer: NodeJS.Timeout

    const handleScroll = () => {
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        const hasSeenPopup = localStorage.getItem('puerta-contact-lead-popup-seen')
        if (!hasSeenPopup && !isOpen) {
          setIsOpen(true)
        }
      }, 500) // Show after 0.5 seconds of scrolling
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimer)
    }
  }, [hasShown, isOpen])

  const openPopup = () => {
    setIsOpen(true)
  }

  const closePopup = () => {
    setIsOpen(false)
    setHasShown(true)
    // Mark as seen for this session
    localStorage.setItem('puerta-contact-lead-popup-seen', 'true')
  }

  return {
    isOpen,
    openPopup,
    closePopup,
  }
}
