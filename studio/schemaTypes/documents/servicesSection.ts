import {defineField, defineType} from 'sanity'

export const servicesSection = defineType({
  name: 'servicesSection',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Small label', type: 'string', initialValue: 'Services'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
    defineField({
      name: 'items',
      title: 'Services',
      type: 'array',
      of: [{type: 'serviceItem'}],
      description: 'Drag the handle to reorder. Use "Hide this service" to take one offline without deleting it.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Services section'}
    },
  },
})
