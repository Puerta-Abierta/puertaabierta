'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useContactLeadPopup } from '@/hooks/useContactLeadPopup'
import ContactLeadPopup from './ContactLeadPopup'

interface ContactLeadContextType {
  isOpen: boolean
  openPopup: () => void
  closePopup: () => void
}

const ContactLeadContext = createContext<ContactLeadContextType | undefined>(undefined)

export function useContactLead() {
  const context = useContext(ContactLeadContext)
  if (context === undefined) {
    throw new Error('useContactLead must be used within a ContactLeadProvider')
  }
  return context
}

interface ContactLeadProviderProps {
  children: ReactNode
}

export default function ContactLeadProvider({ children }: ContactLeadProviderProps) {
  const { isOpen, openPopup, closePopup } = useContactLeadPopup()

  return (
    <ContactLeadContext.Provider value={{ isOpen, openPopup, closePopup }}>
      {children}
      <ContactLeadPopup isOpen={isOpen} onClose={closePopup} />
    </ContactLeadContext.Provider>
  )
}
