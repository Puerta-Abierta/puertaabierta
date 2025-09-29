import { defineField, defineType } from 'sanity'

export const contactLead = defineType({
  name: 'contactLead',
  title: 'Contact Lead',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^[\+]?[1-9][\d]{0,15}$/, {
        name: 'phone',
        invert: false,
      }),
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this contact lead is still active and should receive communications',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      subscribedAt: 'subscribedAt',
    },
    prepare(selection) {
      const { title, subtitle, subscribedAt } = selection
      const date = new Date(subscribedAt).toLocaleDateString()
      return {
        title: title || 'Unnamed Lead',
        subtitle: `${subtitle} (${date})`,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{ field: 'subscribedAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'oldestFirst',
      by: [{ field: 'subscribedAt', direction: 'asc' }],
    },
    {
      title: 'Name A-Z',
      name: 'byName',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
