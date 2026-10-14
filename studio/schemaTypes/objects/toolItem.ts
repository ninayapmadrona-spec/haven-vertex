import {defineField, defineType} from 'sanity'

export const toolItem = defineType({
  name: 'toolItem',
  title: 'Tool / Platform',
  type: 'object',
  fields: [
    defineField({
      name: 'hidden',
      title: 'Hide this tool',
      type: 'boolean',
      initialValue: false,
      description: 'Turn on to hide this tool from the live website without deleting it.',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Blocks (builders, e.g. WordPress)', value: 'blocks'},
          {title: 'Layout (site builders, e.g. Wix)', value: 'layout'},
          {title: 'Brush (design, e.g. Canva)', value: 'brush'},
          {title: 'Mail (email tools)', value: 'mail'},
          {title: 'Calendar (planning / productivity)', value: 'calendar'},
          {title: 'Chart (analytics / reporting)', value: 'chart'},
          {title: 'Search (SEO tools)', value: 'search'},
          {title: 'Film (video)', value: 'film'},
          {title: 'Shopping bag (e-commerce)', value: 'shopping'},
        ],
      },
      initialValue: 'layout',
    }),
  ],
  preview: {
    select: {title: 'name', hidden: 'hidden'},
    prepare({title, hidden}) {
      return {title: hidden ? `${title} (hidden)` : title}
    },
  },
})
