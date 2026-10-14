import {defineField, defineType} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About / Meet Nina',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Small label', type: 'string', initialValue: 'About'}),
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'bodyParagraphs',
      title: 'Body paragraphs',
      type: 'array',
      of: [{type: 'text', rows: 3}],
      description: 'Each entry is one paragraph. The last paragraph is shown emphasized/bold.',
    }),
    defineField({
      name: 'points',
      title: 'Highlight points (with checkmarks)',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      description: 'Optional — photo(s) of Nina or the team.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About section'}
    },
  },
})
