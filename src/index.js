import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";

import App from "./components/app";
import client from "./apollo";
import GlobalStyles from "./globalStyles";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
    <GlobalStyles />
  </ApolloProvider>,
  document.getElementById("root")
);
