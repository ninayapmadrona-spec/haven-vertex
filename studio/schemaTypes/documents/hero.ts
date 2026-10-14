import {defineField, defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Small badge text', type: 'string'}),
    defineField({name: 'brandLine', title: 'Brand line (above headline)', type: 'string'}),
    defineField({name: 'headline', title: 'Headline', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'description',
      title: 'Description paragraphs',
      type: 'array',
      of: [{type: 'text', rows: 3}],
      description: 'Each entry is one paragraph under the headline.',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlight list (with checkmarks)',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({name: 'primaryCtaLabel', title: 'Primary button label', type: 'string'}),
    defineField({
      name: 'useCalendlyForPrimaryCta',
      title: 'Primary button opens Calendly booking',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({name: 'secondaryCtaLabel', title: 'Secondary button label', type: 'string'}),
    defineField({name: 'secondaryCtaUrl', title: 'Secondary button link', type: 'string'}),
    defineField({name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'statBadgeNumber', title: 'Floating stat number', type: 'string', description: 'e.g. "12+"'}),
    defineField({name: 'statBadgeLabel', title: 'Floating stat label', type: 'string'}),
    defineField({
      name: 'tags',
      title: 'Tag row (under the buttons)',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Hero section'}
    },
  },
})
