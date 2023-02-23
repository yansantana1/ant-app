import { ApolloClient, InMemoryCache } from "@apollo/client";

const antService = new ApolloClient({
    uri: "https://sg-ants-test.herokuapp.com/graphql",
    cache: new InMemoryCache(),
});

export default antService;