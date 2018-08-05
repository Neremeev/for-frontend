import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
    uri: 'http://localhost:5050/graphql'
});

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

export default client;
