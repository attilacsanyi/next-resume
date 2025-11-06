import * as Apollo from '@apollo/client';
import { gql } from '@apollo/client';
import * as types from './contentful.types';
const defaultOptions = {} as const;
export const SysFragmentDoc = gql`
  fragment Sys on Sys {
    firstPublishedAt
    publishedAt
    id
  }
`;
export const ResumeFragmentDoc = gql`
  fragment Resume on Resume {
    sys {
      ...Sys
    }
    name
    json
    isActive
  }
  ${SysFragmentDoc}
`;
export const ResumeCollectionDocument = gql`
  query resumeCollection($isPreview: Boolean = false) {
    resumeCollection(limit: 2, preview: $isPreview) {
      items {
        ...Resume
      }
    }
  }
  ${ResumeFragmentDoc}
`;

/**
 * __useResumeCollectionQuery__
 *
 * To run a query within a React component, call `useResumeCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useResumeCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResumeCollectionQuery({
 *   variables: {
 *      isPreview: // value for 'isPreview'
 *   },
 * });
 */
export function useResumeCollectionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    types.ResumeCollectionQuery,
    types.ResumeCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    types.ResumeCollectionQuery,
    types.ResumeCollectionQueryVariables
  >(ResumeCollectionDocument, options);
}
export function useResumeCollectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    types.ResumeCollectionQuery,
    types.ResumeCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    types.ResumeCollectionQuery,
    types.ResumeCollectionQueryVariables
  >(ResumeCollectionDocument, options);
}
export function useResumeCollectionSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        types.ResumeCollectionQuery,
        types.ResumeCollectionQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    types.ResumeCollectionQuery,
    types.ResumeCollectionQueryVariables
  >(ResumeCollectionDocument, options);
}
export type ResumeCollectionQueryHookResult = ReturnType<
  typeof useResumeCollectionQuery
>;
export type ResumeCollectionLazyQueryHookResult = ReturnType<
  typeof useResumeCollectionLazyQuery
>;
export type ResumeCollectionSuspenseQueryHookResult = ReturnType<
  typeof useResumeCollectionSuspenseQuery
>;
export type ResumeCollectionQueryResult = Apollo.QueryResult<
  types.ResumeCollectionQuery,
  types.ResumeCollectionQueryVariables
>;
