import { type SchemaTypeDefinition } from 'sanity'
import { contactForm } from './contactForm'
import { course } from './course'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contactForm, course],
}
