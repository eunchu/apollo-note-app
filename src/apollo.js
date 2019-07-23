import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { ApolloLink } from "apollo-link";

import { defaults, typeDefs, resolvers } from "./clientState";

// apollo-boost 를 사용하면 자동으로 해줌
// # Apollo 오프라인 셋업
const cache = new InMemoryCache();

const stateLink = withClientState({
  // client state 를 위한 설정 필요,
  cache,
  typeDefs,
  defaults,
  resolvers
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink])
});
client.initQueryManager();

export default client;
