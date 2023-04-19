import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://test-for-me.prismic.io/graphql",
  headers: {
    Authorization:
      "Token MC5aREUtWnhBQUFDSUFfX3RF.77-977-9W--_ve-_vVHvv73vv70E77-977-9G--_ve-_ve-_vQ3vv70_LO-_ve-_vRFnLO-_vVLvv70_JO-_vUXvv70",
    "Prismic-Ref": "ZDJdTBAAACMABPlA",
  },
  fetchOptions: {
    method: "GET", // Change the HTTP method here
  },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});
