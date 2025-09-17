import { type SchemaTypeDefinition } from 'sanity'
import { contactForm } from './contactForm'
import { course } from './course'
import { homepage } from './homepage'
import { mentor } from './mentor'
import { stripeLink } from './stripeLink'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contactForm, course, homepage, mentor, stripeLink],
}
