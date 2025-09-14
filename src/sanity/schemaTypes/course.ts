import { defineField, defineType } from 'sanity'

export const course = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lessonsCount',
      title: 'Number of Lessons',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'lesson',
          title: 'Lesson',
          fields: [
            defineField({
              name: 'title',
              title: 'Lesson Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'duration',
              title: 'Duration',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'objectives',
              title: 'Learning Objectives',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mentors',
      title: 'Course Mentors',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'mentor',
          title: 'Mentor',
          fields: [
            defineField({
              name: 'name',
              title: 'Mentor Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Course Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      duration: 'duration',
      lessonsCount: 'lessonsCount',
      media: 'thumbnail',
    },
    prepare(selection) {
      const { title, duration, lessonsCount } = selection
      return {
        title: title || 'Untitled Course',
        subtitle: `${duration} • ${lessonsCount} lessons`,
      }
    },
  },
})
