import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

// GET /api/payout
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const payouts = await prisma.payout.findMany()
  res.json(payouts)
}
