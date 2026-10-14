import {defineField, defineType} from 'sanity'

export const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Small label', type: 'string', initialValue: 'Kind Words'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'description', title: 'Description (shown when list is empty)', type: 'text', rows: 2}),
    defineField({
      name: 'items',
      title: 'Testimonials',
      type: 'array',
      of: [{type: 'testimonialItem'}],
      description: 'Drag the handle to reorder. Use "Hide this testimonial" to take one offline without deleting it.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Testimonials section'}
    },
  },
})
