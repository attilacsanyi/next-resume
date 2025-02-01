import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * This is the environment variables for the application.
 * It is used to validate the environment variables and provide type safety.
 *
 * @see https://create.t3.gg/en/usage/env-variables
 */
export const env = createEnv({
  // emptyStringAsUndefined: true,
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),

    CONTENTFUL_SPACE_ID: z.string(),
    CONTENTFUL_ENVIRONMENT: z.enum(['master', 'preview']),
    CONTENTFUL_CPA_TOKEN: z.string(),
    CONTENTFUL_CDA_TOKEN: z.string(),
    CONTENTFUL_GRAPHQL_URL: z.string(),
  },
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
    CONTENTFUL_CPA_TOKEN: process.env.CONTENTFUL_CPA_TOKEN,
    CONTENTFUL_CDA_TOKEN: process.env.CONTENTFUL_CDA_TOKEN,
    CONTENTFUL_GRAPHQL_URL: process.env.CONTENTFUL_GRAPHQL_URL,
  },
});
