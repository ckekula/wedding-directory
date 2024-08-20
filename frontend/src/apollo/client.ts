import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Create a basic HTTP link to connect to your GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // replace with your backend URL
});

// Set up Apollo Client with the HTTP link and in-memory cache
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
