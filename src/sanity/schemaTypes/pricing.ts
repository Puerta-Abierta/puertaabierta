import { defineField, defineType } from 'sanity'

export const pricing = defineType({
  name: 'pricing',
  title: 'Pricing Page Content',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
          initialValue: 'Simple, Transparent Pricing for Educational Partners',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: 'Empower your students with financial literacy at just $25 per student. Perfect for schools, nonprofits, and academies.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'Join hundreds of educational institutions already using Puerta Abierta to build financial confidence in their students.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // Pricing Plans Section
    defineField({
      name: 'plans',
      title: 'Pricing Plans Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Choose Your Plan',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'string',
          initialValue: 'Flexible pricing that scales with your institution',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'pricingPlans',
          title: 'Pricing Plans',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'pricingPlan',
              title: 'Pricing Plan',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Plan Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'price',
                  title: 'Price',
                  type: 'number',
                  validation: (Rule) => Rule.required().min(0),
                }),
                defineField({
                  name: 'period',
                  title: 'Period',
                  type: 'string',
                  initialValue: 'per student',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'minStudents',
                  title: 'Minimum Students',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'features',
                  title: 'Features',
                  type: 'array',
                  of: [{ type: 'string' }],
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'cta',
                  title: 'CTA Button Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'ctaLink',
                  title: 'CTA Button Link',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'popular',
                  title: 'Popular Plan',
                  type: 'boolean',
                  initialValue: false,
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // Package Examples Section
    defineField({
      name: 'packages',
      title: 'Package Examples Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Package Examples',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'packageList',
          title: 'Packages',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'package',
              title: 'Package',
              fields: [
                defineField({
                  name: 'hours',
                  title: 'Hours',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'price',
                  title: 'Price',
                  type: 'number',
                  validation: (Rule) => Rule.required().min(0),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // FAQ Section
    defineField({
      name: 'faq',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Frequently Asked Questions',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'string',
          initialValue: 'Everything you need to know about our pricing and programs',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'faqList',
          title: 'FAQs',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'faq',
              title: 'FAQ',
              fields: [
                defineField({
                  name: 'question',
                  title: 'Question',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'answer',
                  title: 'Answer',
                  type: 'text',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

  ],
  preview: {
    select: {
      title: 'hero.title',
      subtitle: 'hero.subtitle',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Pricing Page Content',
        subtitle: subtitle || 'B2B pricing information',
      }
    },
  },
})
