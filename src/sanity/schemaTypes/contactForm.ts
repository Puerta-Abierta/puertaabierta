import { defineField, defineType } from 'sanity'

export const contactForm = defineType({
  name: 'contactForm',
  title: 'Contact Form Submission',
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
      validation: (Rule) => Rule.regex(/^[\+]?[1-9][\d]{0,15}$/, {
        name: 'phone',
        invert: false,
      }),
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(200),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) => Rule.required().min(10).max(1000),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Resolved', value: 'resolved' },
          { title: 'Closed', value: 'closed' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      status: 'status',
      submittedAt: 'submittedAt',
    },
    prepare(selection) {
      const { title, subtitle, status, submittedAt } = selection
      const date = new Date(submittedAt).toLocaleDateString()
      return {
        title: title || 'Unnamed Contact',
        subtitle: `${subtitle} - ${status} (${date})`,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'oldestFirst',
      by: [{ field: 'submittedAt', direction: 'asc' }],
    },
    {
      title: 'Status',
      name: 'byStatus',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
})
