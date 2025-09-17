import { defineField, defineType } from 'sanity'

export const stripeLink = defineType({
  name: 'stripeLink',
  title: 'Stripe Payment Link',
  type: 'document',
  fields: [
    defineField({
      name: 'courseSlug',
      title: 'Course Slug',
      type: 'string',
      description: 'The slug of the course this Stripe link belongs to (must match course slug)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stripeUrl',
      title: 'Stripe Payment URL',
      type: 'url',
      description: 'The full Stripe payment link URL',
      validation: (Rule) => Rule.required().uri({
        scheme: ['https']
      }),
    }),
    defineField({
      name: 'priceId',
      title: 'Stripe Price ID',
      type: 'string',
      description: 'The Stripe Price ID for this product',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      description: 'The price in USD (e.g., 59.99)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this payment link is currently active',
      initialValue: true,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional description of what this payment is for',
      rows: 3,
    }),
    defineField({
      name: 'pricingType',
      title: 'Pricing Type',
      type: 'string',
      options: {
        list: [
          { title: 'Individual Class', value: 'individual' },
          { title: 'Package (per hour)', value: 'package' },
          { title: 'Custom Package', value: 'custom' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hours',
      title: 'Hours (for packages)',
      type: 'number',
      description: 'Number of hours for package pricing (leave empty for individual classes)',
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: 'courseSlug',
      subtitle: 'price',
      description: 'description',
    },
    prepare(selection) {
      const { title, subtitle, description } = selection
      return {
        title: title || 'Untitled Stripe Link',
        subtitle: `$${subtitle}${description ? ` - ${description}` : ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Course Slug A-Z',
      name: 'courseSlugAsc',
      by: [{ field: 'courseSlug', direction: 'asc' }],
    },
    {
      title: 'Price Low to High',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
    {
      title: 'Active First',
      name: 'activeFirst',
      by: [{ field: 'isActive', direction: 'desc' }],
    },
  ],
})

