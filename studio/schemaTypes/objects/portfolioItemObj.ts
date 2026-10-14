import {defineField, defineType} from 'sanity'

export const portfolioItemObj = defineType({
  name: 'portfolioItemObj',
  title: 'Portfolio item',
  type: 'object',
  fields: [
    defineField({
      name: 'hidden',
      title: 'Hide this item',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag / category',
      type: 'string',
      description: 'Short label shown above the title, e.g. "Websites"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'url',
      title: 'Project URL (optional)',
      type: 'url',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'tag', media: 'image', hidden: 'hidden'},
    prepare({title, subtitle, media, hidden}) {
      return {title: hidden ? `${title} (hidden)` : title, subtitle, media}
    },
  },
})
