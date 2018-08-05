import {ApolloClient} from "apollo-client";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";

const client = new ApolloClient({
    link: new HttpLink({uri: "http://localhost:3000/graphql"}),
    cache: new InMemoryCache({
        dataIdFromObject: o => o.__typename + o.id
    }),
    connectToDevTools: true
});

export {client};
