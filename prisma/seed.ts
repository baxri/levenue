import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seed() {
  const spotify = await prisma.user.upsert({
    where: { email: "spotify@levenue.io" },
    update: {},
    create: {
      email: "spotify@levenue.io",
      name: "Spotify",
      subscriptions: {
        create: [
          {
            title: "Spotify Premium",
            published: true,
            user: "George Bibilashvili",
            amount: 35,
          },
          {
            title: "Spotify Premium",
            published: true,
            user: "Jon Doe",
            amount: 35,
          },
          {
            title: "Spotify Premium",
            published: true,
            user: "Jason Statham",
            amount: 35,
          },
          {
            title: "Spotify Premium",
            published: true,
            user: "David Northsons",
            amount: 35,
          },
          {
            title: "Spotify Premium",
            published: true,
            user: "William Abdul",
            amount: 35,
          },
          {
            title: "Spotify Premium",
            published: true,
            user: "William Abdul",
            amount: 35,
          },
        ],
      },
    },
  });
  console.log({ spotify });
}