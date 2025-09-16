import { type SchemaTypeDefinition } from 'sanity'
import { contactForm } from './contactForm'
import { course } from './course'
import { homepage } from './homepage'
import { mentor } from './mentor'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contactForm, course, homepage, mentor],
}
