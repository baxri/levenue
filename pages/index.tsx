import React from "react";

import { withApollo } from "../graphql/apollo";

import Page from "../components/Page";
import ArticleList from "../components/ui/ArticleList";

function StartPage({ query, asPath }) {
  return (
    <Page title="Title" description="Description" path={asPath}>
      <ArticleList />
    </Page>
  );
}

export default withApollo(StartPage);
