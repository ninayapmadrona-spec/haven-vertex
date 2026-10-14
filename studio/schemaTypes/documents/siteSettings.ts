import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
      description: 'Shown in the top navigation bar. Use an image with a transparent background for best results.',
    }),
    defineField({
      name: 'siteName',
      title: 'Site name (shown if no logo is set)',
      type: 'string',
      initialValue: 'Haven Vertex',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings (logo, etc.)'}
    },
  },
})
