import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import storage, { AUTH_TOKEN_KEY } from '@scrib/web/lib/storage';

const httpLink = createHttpLink({
  uri: 'http://locahost:7000/graphql', //env
});

const authLink = setContext((_, { headers }) => {
  const token = storage.get(AUTH_TOKEN_KEY);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
