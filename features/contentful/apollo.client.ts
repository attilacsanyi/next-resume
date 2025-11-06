import { env } from '@/env';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const isDev = env.NODE_ENV !== 'production';

export const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: env.CONTENTFUL_GRAPHQL_URL,
    /**
     * Custom fetch to enable ISR with Next.js route cache (5m) and cache tags.
     */
    fetch: (uri, options) => {
      return fetch(uri, {
        ...options,
        next: { revalidate: 300, tags: ['contentful', 'resume'] },
      });
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      /**
       * Dev: never cache; Prod: let Next.js route cache (5m) + Apollo cache-first.
       * Docs: https://www.apollographql.com/docs/react/data/queries/#cache-first
       */
      fetchPolicy: isDev ? 'no-cache' : 'cache-first',
    },
  },
});
