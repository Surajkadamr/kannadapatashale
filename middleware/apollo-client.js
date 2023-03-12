import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://kannadapatashale-backend.onrender.com/graphql",
  cache: new InMemoryCache(),
});

export default client;
