import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {schemaTypes} from './schemaTypes';

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'nbm85yy3';
export const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
export default defineConfig({
  name: 'portfolio', title: 'Revaldy · Portfolio Admin', projectId, dataset,
  plugins: [structureTool({structure: S => S.list().title('Portfolio').items([
    S.listItem().title('Profile & CV').child(S.document().schemaType('portfolioSettings').documentId('portfolio-settings')),
    ...['project', 'experience', 'volunteer', 'certification', 'skill'].map(type => S.documentTypeListItem(type)),
  ])})],
  schema: {types: schemaTypes},
  document: {
    newDocumentOptions: (options) => options.filter(option => option.templateId !== 'portfolioSettings'),
    actions: (actions, context) => context.schemaType === 'portfolioSettings' ? actions.filter(action => action.action !== 'delete' && action.action !== 'duplicate') : actions,
  },
});
