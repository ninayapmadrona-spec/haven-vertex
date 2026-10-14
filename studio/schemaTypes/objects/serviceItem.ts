import {defineField, defineType} from 'sanity'

export const serviceItem = defineType({
  name: 'serviceItem',
  title: 'Service',
  type: 'object',
  fields: [
    defineField({
      name: 'hidden',
      title: 'Hide this service',
      type: 'boolean',
      initialValue: false,
      description: 'Turn on to hide this service from the live website without deleting it.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Globe (website)', value: 'globe'},
          {title: 'Megaphone (marketing)', value: 'megaphone'},
          {title: 'Briefcase (business)', value: 'briefcase'},
        ],
        layout: 'radio',
      },
      initialValue: 'globe',
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g. "$500 USD"',
    }),
    defineField({
      name: 'priceLabel',
      title: 'Price label',
      type: 'string',
      initialValue: 'Starting From',
    }),
    defineField({
      name: 'features',
      title: 'Features list',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'idealFor',
      title: '"Ideal For" text',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'price', hidden: 'hidden'},
    prepare({title, subtitle, hidden}) {
      return {title: hidden ? `${title} (hidden)` : title, subtitle}
    },
  },
})
