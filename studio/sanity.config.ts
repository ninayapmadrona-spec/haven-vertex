import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, SINGLETON_TYPES} from './schemaTypes'
import {structure} from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

if (!projectId) {
  throw new Error(
    'Missing SANITY_STUDIO_PROJECT_ID. Create a .env file in /studio (see .env.example) with your Sanity project ID before running the Studio.',
  )
}

export default defineConfig({
  name: 'haven-vertex-studio',
  title: 'Haven Vertex Editor',

  projectId,
  dataset,

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    // Singleton sections: hide them from the generic "create new" menu
    // so Nina can never accidentally create a second Hero/About/etc.
    templates: (templates) =>
      templates.filter(({schemaType}) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    // Singleton sections: remove "Duplicate" and "Delete" so the one
    // document per section can't be removed or doubled by mistake.
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({action}) => action !== 'duplicate' && action !== 'delete')
        : input,
  },
})
