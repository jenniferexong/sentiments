'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemas';
import { structure } from './sanity/structure';
import { colorInput } from '@sanity/color-input';

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    colorInput(),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  form: {
    components: {
      input: (props: any) => {
        if (Array.isArray(props.groups) && props.groups.length > 0) {
          if (props.groups[0].name === 'all-fields') {
            props.groups.shift();
          }
        }
        return props.renderDefault(props);
      },
    },
  },
});
