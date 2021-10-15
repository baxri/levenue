import prisma from "../../../lib/prisma";

export const resolvers = {
  Query: {
    async articles(parent, variables, context, info) {
      return prisma.article.findMany();
    },
    async article(parent, variables, context, info) {
      const id = variables.slugAndId
        ? variables.slugAndId.split("-").pop()
        : variables.id;

      return prisma.article.findFirst({
        where: {
          id: parseInt(id),
        },
      });
    },
  },

  Mutation: {
    async addArticle(parent, variables, context, info) {
      const newArticle = await prisma.article.create({
        data: {
          ...variables,
        },
      });

      return newArticle;
    },

    async updateArticle(parent, variables, context, info) {
      const { id, ...values } = variables;

      return prisma.article.update({
        where: {
          id: parseInt(id),
        },
        data: {
          ...values,
        },
      });
    },

    async deleteArticle(parent, variables, context, info) {
      const { id } = variables;

      return prisma.article.delete({
        where: {
          id: parseInt(id),
        },
      });
    },
  },
};
