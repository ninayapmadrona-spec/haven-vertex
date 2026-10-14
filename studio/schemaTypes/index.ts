import {hero} from './documents/hero'
import {about} from './documents/about'
import {servicesSection} from './documents/servicesSection'
import {testimonialsSection} from './documents/testimonialsSection'
import {portfolioSection} from './documents/portfolioSection'
import {finalCtaContact} from './documents/finalCtaContact'
import {siteSettings} from './documents/siteSettings'

import {serviceItem} from './objects/serviceItem'
import {testimonialItem} from './objects/testimonialItem'
import {portfolioItemObj} from './objects/portfolioItemObj'

export const schemaTypes = [
  // Singleton page sections (one document each)
  siteSettings,
  hero,
  about,
  servicesSection,
  testimonialsSection,
  portfolioSection,
  finalCtaContact,
  // Reusable objects used inside the sections above
  serviceItem,
  testimonialItem,
  portfolioItemObj,
]

// Document types that should only ever have exactly one instance.
export const SINGLETON_TYPES = new Set([
  'siteSettings',
  'hero',
  'about',
  'servicesSection',
  'testimonialsSection',
  'portfolioSection',
  'finalCtaContact',
])
