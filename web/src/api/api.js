import { QueryClient } from '@tanstack/react-query';
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-tag';

export * from '@tanstack/react-query';
export const apiClient = new GraphQLClient(import.meta.env.VITE_API_URL);
export const queryClient = new QueryClient();

export async function api(_query, variables, headers) {
  try {
    const query = gql(_query);

    return await apiClient.request(
      query,
      variables,
      headers,
    );
  } catch (err) {
    console.error('An API request resulted in an error. Response: ', err.response);
    throw err;
  }
}
