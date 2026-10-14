import type {StructureResolver} from 'sanity/structure'

/**
 * The Studio menu mirrors the website's pages: Home, About, Services,
 * Portfolio, Testimonials, Contact. Each entry edits a single document, so
 * nobody can accidentally create a second Hero/About/etc.
 *
 * The "Closing banner & contact details" document feeds two places on the
 * site: the big "Book a call" banner at the bottom of Home, and the Contact
 * page — it's listed once, under Home, to avoid editing it from two menus.
 */
const singleton = (S: Parameters<StructureResolver>[0], title: string, type: string) =>
  S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Haven Vertex Content')
    .items([
      singleton(S, 'Site Settings (Logo)', 'siteSettings'),
      S.divider(),
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(
          S.list()
            .title('Home Page')
            .items([
              singleton(S, 'Hero (top of the page)', 'hero'),
              singleton(S, 'Platforms & Tools', 'toolsBanner'),
              singleton(S, 'Closing banner & contact details', 'finalCtaContact'),
            ]),
        ),
      singleton(S, 'About Page', 'about'),
      singleton(S, 'Services Page', 'servicesSection'),
      singleton(S, 'Portfolio Page', 'portfolioSection'),
      singleton(S, 'Testimonials Page', 'testimonialsSection'),
    ])
