import { defineField, defineType } from 'sanity'

// Content block configuration for rich text editing
const contentBlock = {
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule: any) => Rule.uri({
                  allowRelative: true,
                  scheme: ['http', 'https', 'mailto', 'tel']
                })
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: true
              }
            ]
          }
        ]
      }
    }
  ]
}

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage Content',
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
          initialValue: 'Puerta Abierta',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          ...contentBlock,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),

    // Problem Section
    defineField({
      name: 'problem',
      title: 'Problem Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'statistics',
          title: 'Statistics',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'statistic',
              title: 'Statistic',
              fields: [
                defineField({
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  ...contentBlock,
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'type',
                  title: 'Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Number', value: 'number' },
                      { title: 'Percentage', value: 'percentage' },
                      { title: 'Chart', value: 'chart' },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'chartData',
                  title: 'Chart Data (if type is chart)',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      name: 'chartItem',
                      title: 'Chart Item',
                      fields: [
                        defineField({
                          name: 'name',
                          title: 'Name',
                          type: 'string',
                        }),
                        defineField({
                          name: 'value',
                          title: 'Value',
                          type: 'number',
                        }),
                      ],
                    },
                  ],
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // Solution Section
    defineField({
      name: 'solution',
      title: 'Solution Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'feature',
              title: 'Feature',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon (Emoji)',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'title',
                  title: 'Feature Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Feature Description',
                  ...contentBlock,
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // Testimonials Section
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'testimonialList',
          title: 'Testimonials',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'testimonial',
              title: 'Testimonial',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'title',
                  title: 'Title/Position',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'quote',
                  title: 'Quote',
                  ...contentBlock,
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'rating',
                  title: 'Rating (1-5)',
                  type: 'number',
                  validation: (Rule) => Rule.required().min(1).max(5),
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // B2B Section
    defineField({
      name: 'b2b',
      title: 'B2B Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'challenges',
          title: 'Challenges & Solutions',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'challengeSolution',
              title: 'Challenge & Solution',
              fields: [
                defineField({
                  name: 'challenge',
                  title: 'Challenge',
                  ...contentBlock,
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'solution',
                  title: 'Solution',
                  ...contentBlock,
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ctaButton',
          title: 'Call to Action Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),

    // Partners Section
    defineField({
      name: 'partners',
      title: 'Partners Section',
      type: 'object',
      fields: [
        defineField({
          name: 'partnerLogos',
          title: 'Partner Logos',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'partner',
              title: 'Partner',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Partner Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'logo',
                  title: 'Partner Logo',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
                defineField({
                  name: 'website',
                  title: 'Website URL',
                  type: 'url',
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // Contact Section
    defineField({
      name: 'contact',
      title: 'Contact Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          ...contentBlock,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          ...contentBlock,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'contactMethods',
          title: 'Contact Methods',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'contactMethod',
              title: 'Contact Method',
              fields: [
                defineField({
                  name: 'type',
                  title: 'Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Email', value: 'email' },
                      { title: 'Phone', value: 'phone' },
                      { title: 'Consultation', value: 'consultation' },
                      { title: 'Response Time', value: 'response' },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'value',
                  title: 'Value/Description',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Email', value: 'email' },
                      { title: 'Phone', value: 'phone' },
                      { title: 'Users', value: 'users' },
                      { title: 'Clock', value: 'clock' },
                    ],
                  },
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // SEO Fields
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          ...contentBlock,
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          options: {
            hotspot: true,
          },
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
        title: title || 'Homepage Content',
        subtitle: subtitle || 'Main page content',
      }
    },
  },
})
