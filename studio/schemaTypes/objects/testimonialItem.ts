import {defineField, defineType} from 'sanity'

export const testimonialItem = defineType({
  name: 'testimonialItem',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({
      name: 'hidden',
      title: 'Hide this testimonial',
      type: 'boolean',
      initialValue: false,
      description: 'Turn on to hide this testimonial from the live website without deleting it.',
    }),
    defineField({
      name: 'type',
      title: 'Testimonial type',
      type: 'string',
      options: {
        list: [
          {title: '🎥 Video', value: 'video'},
          {title: '✍️ Written', value: 'written'},
          {title: '💼 LinkedIn recommendation', value: 'linkedin'},
        ],
        layout: 'radio',
      },
      initialValue: 'written',
      validation: (Rule) => Rule.required(),
    }),

    // Common client info
    defineField({
      name: 'clientName',
      title: 'Client name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'clientPhoto',
      title: 'Client photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company logo',
      type: 'image',
      options: {hotspot: true},
    }),

    // Video-specific
    defineField({
      name: 'videoUrl',
      title: 'Video URL (YouTube or Vimeo)',
      type: 'url',
      description: 'Paste a YouTube or Vimeo link. Do not upload video files directly.',
      hidden: ({parent}) => parent?.type !== 'video',
    }),

    // Written-specific
    defineField({
      name: 'writtenText',
      title: 'Written testimonial text',
      type: 'text',
      rows: 4,
      hidden: ({parent}) => parent?.type !== 'written',
    }),

    // LinkedIn-specific
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn post/profile URL',
      type: 'url',
      hidden: ({parent}) => parent?.type !== 'linkedin',
    }),
    defineField({
      name: 'linkedinScreenshot',
      title: 'LinkedIn recommendation screenshot',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.type !== 'linkedin',
    }),
    defineField({
      name: 'linkedinText',
      title: 'LinkedIn recommendation text (optional, in addition to screenshot)',
      type: 'text',
      rows: 3,
      hidden: ({parent}) => parent?.type !== 'linkedin',
    }),
  ],
  preview: {
    select: {name: 'clientName', company: 'company', type: 'type', hidden: 'hidden'},
    prepare({name, company, type, hidden}) {
      const icon = type === 'video' ? '🎥' : type === 'linkedin' ? '💼' : '✍️'
      const title = `${icon} ${name || 'Untitled'}`
      return {title: hidden ? `${title} (hidden)` : title, subtitle: company}
    },
  },
})
