import { type SchemaTypeDefinition } from 'sanity'
import { contactForm } from './contactForm'
import { course } from './course'
import { homepage } from './homepage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contactForm, course, homepage],
}
