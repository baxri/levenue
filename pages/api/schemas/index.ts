import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Article {
    id: ID
    title: String
    content: String
    date_published: String
  }

  # Queries
  type Query {
    articles(sort: String): [Article]
    article(id: ID, slugAndId: String): Article
  }

  # Mutations
  type Mutation {
    addArticle(title: String!): Article!
    updateArticle(id: ID!, title: String): Article
    deleteArticle(id: ID!): Article
  }
`;
