import { env } from '@/env';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const isDev = env.NODE_ENV !== 'production';

export const client = new ApolloClient({
  uri: env.CONTENTFUL_GRAPHQL_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      /**
       * The default is 'cache-first'.
       * Docs: https://www.apollographql.com/docs/react/data/queries/#cache-first
       *
       * Use 'no-cache' for server-side requests to ensure fresh data
       * on each page refresh. This prevents Apollo from caching responses.
       * */
      fetchPolicy: isDev ? 'no-cache' : 'cache-first',
    },
  },
});
