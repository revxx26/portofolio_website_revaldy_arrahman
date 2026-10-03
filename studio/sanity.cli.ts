import {defineCliConfig} from 'sanity/cli';
export default defineCliConfig({
  api: {projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'nbm85yy3', dataset: process.env.SANITY_STUDIO_DATASET || 'production'},
  deployment: {appId: 'fowql9p64ix17gvmx3rd5ew3'},
});
