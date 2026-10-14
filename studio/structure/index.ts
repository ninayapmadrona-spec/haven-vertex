import type {StructureResolver} from 'sanity/structure'

/**
 * Haven Vertex only has six content screens, each editing a single document.
 * This gives a fixed, named menu instead of generic "by type" lists, and
 * prevents anyone from accidentally creating a second Hero/About/etc.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Haven Vertex Content')
    .items([
      S.listItem()
        .title('Site Settings (Logo)')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Hero')
        .id('hero')
        .child(S.document().schemaType('hero').documentId('hero')),
      S.listItem()
        .title('About / Meet Nina')
        .id('about')
        .child(S.document().schemaType('about').documentId('about')),
      S.listItem()
        .title('Services')
        .id('servicesSection')
        .child(S.document().schemaType('servicesSection').documentId('servicesSection')),
      S.listItem()
        .title('Testimonials')
        .id('testimonialsSection')
        .child(S.document().schemaType('testimonialsSection').documentId('testimonialsSection')),
      S.listItem()
        .title('Portfolio')
        .id('portfolioSection')
        .child(S.document().schemaType('portfolioSection').documentId('portfolioSection')),
      S.listItem()
        .title('Final CTA / Contact')
        .id('finalCtaContact')
        .child(S.document().schemaType('finalCtaContact').documentId('finalCtaContact')),
    ])
