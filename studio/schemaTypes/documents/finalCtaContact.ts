import {defineField, defineType} from 'sanity'

export const finalCtaContact = defineType({
  name: 'finalCtaContact',
  title: 'Final CTA / Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'ctaHeading',
      title: 'Final CTA heading',
      type: 'string',
      description: 'The big banner right before the contact section.',
    }),
    defineField({name: 'ctaDescription', title: 'Final CTA description', type: 'text', rows: 2}),
    defineField({name: 'ctaButtonLabel', title: 'Final CTA button label', type: 'string'}),
    defineField({
      name: 'calendlyUrl',
      title: 'Calendly booking URL',
      type: 'url',
      description: 'Used by every "Book a Call" button across the site.',
    }),

    defineField({name: 'contactHeading', title: 'Contact section heading', type: 'string'}),
    defineField({name: 'contactDescription', title: 'Contact section description', type: 'text', rows: 2}),
    defineField({name: 'email', title: 'Contact email', type: 'string'}),
    defineField({name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url'}),
    defineField({name: 'linkedinLabel', title: 'LinkedIn display name', type: 'string'}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'locationNote', title: 'Location note', type: 'string'}),
  ],
  preview: {
    prepare() {
      return {title: 'Final CTA / Contact'}
    },
  },
})
