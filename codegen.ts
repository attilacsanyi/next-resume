import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GRAPHQL_URL,
  documents: './graphql/**/*.graphql',
  ignoreNoDocuments: true,
  generates: {
    // Example of how to generate a client
    // './graphql/': {
    //   preset: 'client',
    //   config: {
    //     documentMode: 'string',
    //   },
    // },
    'features/contentful/contentful.types.ts': {
      plugins: [
        {
          // https://www.graphql-code-generator.com/docs/plugins/add
          add: {
            content: '/* eslint-disable */',
          },
        },
        // https://www.graphql-code-generator.com/docs/plugins/typescript
        'typescript',
        // https://www.graphql-code-generator.com/docs/plugins/typescript-operations
        'typescript-operations',
        // https://www.graphql-code-generator.com/docs/plugins/typescript-graphql-request
        'typescript-graphql-request',
      ],
      config: {
        preResolveTypes: true,
        maybeValue: 'T',
        avoidOptionals: false,
        declarationKind: 'type',
      },
    },
    'features/contentful/contentful.hooks.ts': {
      plugins: [
        {
          // https://www.graphql-code-generator.com/docs/plugins/add
          add: {
            content: [
              '/* eslint-disable */',
              "import * as types from './contentful.types';",
            ],
          },
        },
        // https://www.graphql-code-generator.com/docs/plugins/typescript-react-apollo
        'typescript-react-apollo',
      ],
      config: {
        noExport: false,
        importOperationTypesFrom: 'types',
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;
