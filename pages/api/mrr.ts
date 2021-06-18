import { Subscription } from '.prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

const SPOTIFY_PREMIUM_PACKAGE = 35;

// GET /api/mrr
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const subscriptions: Subscription[] = await prisma.subscription.findMany({
    where: { published: true },
  });

  res.json({
    success: true,
    mrr: subscriptions.length * SPOTIFY_PREMIUM_PACKAGE
  })
}
