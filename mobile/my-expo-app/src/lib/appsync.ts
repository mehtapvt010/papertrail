import { GraphQLClient, gql } from 'graphql-request';
import { auth } from './firebase';
import * as SecureStore from 'expo-secure-store';

const client = new GraphQLClient(process.env.EXPO_PUBLIC_APPSYNC_URL!, {
  headers: {},
});

export async function fetchAppSyncToken() {
  const user = auth.currentUser;
  if (!user) throw new Error('No Firebase user logged in');

  const idToken = await user.getIdToken();

  const mutation = gql`
    mutation Exchange($idToken: String!) {
      exchange(idToken: $idToken) {
        jwt
        refreshExpiresAt
      }
    }
  `;

  const { exchange } = await client.request<{ exchange: { jwt: string } }>(mutation, {
    idToken,
  });

  await SecureStore.setItemAsync('appsyncJwt', exchange.jwt);
  return exchange.jwt;
}

export async function graphql<T = any>(query: string, variables?: any): Promise<T> {
  let jwt = await SecureStore.getItemAsync('appsyncJwt');
  if (!jwt) jwt = await fetchAppSyncToken();

  try {
    client.setHeader('Authorization', jwt);
    return await client.request<T>(query, variables);
  } catch (e: any) {
    if (e.response?.status === 401) {
      jwt = await fetchAppSyncToken();
      client.setHeader('Authorization', jwt);
      return client.request<T>(query, variables);
    }
    throw e;
  }
}
