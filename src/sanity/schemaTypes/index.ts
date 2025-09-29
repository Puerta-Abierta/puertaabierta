import { type SchemaTypeDefinition } from 'sanity'
import { contactForm } from './contactForm'
import { contactLead } from './contactLead'
import { course } from './course'
import { homepage } from './homepage'
import { mentor } from './mentor'
import { pricing } from './pricing'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contactForm, contactLead, course, homepage, mentor, pricing],
}
