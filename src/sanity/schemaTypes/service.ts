import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (1, 2, 3, 4…)',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Used on both the homepage service list and the full Services page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'deliverables',
      title: 'Deliverables',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Shown as tags on the Services page. Drag to reorder.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Center', value: 'object-center' },
          { title: 'Top',    value: 'object-top' },
          { title: 'Bottom', value: 'object-bottom' },
        ],
        layout: 'radio',
      },
      initialValue: 'object-center',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      media: 'image',
      deliverables: 'deliverables',
    },
    prepare({ title, order, media, deliverables }) {
      return {
        title: `[${order ?? '?'}] ${title}`,
        subtitle: Array.isArray(deliverables) ? deliverables.join(', ') : '',
        media,
      }
    },
  },
})
