import { env } from '@/env';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: env.CONTENTFUL_GRAPHQL_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      /**
       * The default is 'cache-first'.
       * Docs: https://www.apollographql.com/docs/react/data/queries/#cache-first
       *  */
      fetchPolicy: 'cache-first',
    },
  },
});
