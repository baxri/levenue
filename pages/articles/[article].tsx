import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { withApollo } from "../../graphql/apollo";
import { useGetArticle } from "../../graphql/article/hooks";

import Page from "../../components/Page";
import ArticleDetails from "../../components/ui/ArticleDetails";

function ArticlePage({ asPath }) {
  const router = useRouter();
  const query = router.query;

  const { data, loading, error } = useGetArticle(query?.article);

  if (error || (data && !data.article)) throw error;

  return (
    <Page
      title={loading ? "Loading..." : data.article.title}
      description="Page Description"
      path={asPath}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ArticleDetails article={data.article} />
      )}

      <h2>Routing</h2>
      <p>
        Current query: <strong>{JSON.stringify(query)}</strong>
      </p>

      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
      </ul>
    </Page>
  );
}

export default withApollo(ArticlePage);
