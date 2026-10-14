import {defineField, defineType} from 'sanity'

export const toolsBanner = defineType({
  name: 'toolsBanner',
  title: 'Platforms & Tools',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Small label', type: 'string', initialValue: 'Digital Toolkit'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
    defineField({
      name: 'items',
      title: 'Tools',
      type: 'array',
      of: [{type: 'toolItem'}],
      description: 'Drag the handle to reorder. Use "Hide this tool" to take one offline without deleting it.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Platforms & Tools section'}
    },
  },
})
