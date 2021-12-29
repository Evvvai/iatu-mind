import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

export const apolloClient = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
  cache: new InMemoryCache({
    addTypename: false,
  }),
})
