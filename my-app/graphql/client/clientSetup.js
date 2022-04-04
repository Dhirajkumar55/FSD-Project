import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphqlServer',
    cache: new InMemoryCache()
});

export {client};

