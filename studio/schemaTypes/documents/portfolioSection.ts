import {defineField, defineType} from 'sanity'

export const portfolioSection = defineType({
  name: 'portfolioSection',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Small label', type: 'string', initialValue: 'Experience'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'note', title: 'Side note', type: 'string', description: 'e.g. "Available samples upon request"'}),
    defineField({
      name: 'items',
      title: 'Projects',
      type: 'array',
      of: [{type: 'portfolioItemObj'}],
      description: 'Drag the handle to reorder. Use "Hide this item" to take one offline without deleting it.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Portfolio section'}
    },
  },
})
