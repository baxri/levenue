import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const SPOTIFY_PREMIUM_PACKAGE = 35;
const BID_PRICE = 0.95;

// POST /api/payout
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { amount, confirm } = req.body;

    const subscriptions = await prisma.subscription.findMany({
      where: { published: true },
    });

    console.log('subscriptions', subscriptions);

    // I can assume that all subscriptions are same price
    const subscriptionAmount = SPOTIFY_PREMIUM_PACKAGE;

    // Calculate Company monthly income (MRR)
    const MRR = subscriptionAmount * subscriptions.length;

    // Maxium amount user can request
    const maxPayoutAmount = MRR * 12;

    // Calculate actuall amount with bid price
    const actuallAmount = amount / BID_PRICE;

    if (actuallAmount > maxPayoutAmount) {
      throw new Error(
        `Your actuall maximum payout amount is ${(maxPayoutAmount * BID_PRICE).toFixed(2)}`
      );
    }

    const requiredSubscriptions = Math.floor(
      actuallAmount / subscriptionAmount
    );

    const calculatedActuallAmount = requiredSubscriptions * subscriptionAmount;
    const calculatedAmount = calculatedActuallAmount * BID_PRICE;

    if (!calculatedActuallAmount) {
      throw new Error("You need to at least cover one subscription");
    }

    if (confirm) {
     await prisma.payout.create({
        data: {
          amount: calculatedAmount,
          actualAmount: calculatedActuallAmount,
          bidPrice: BID_PRICE,
        },
      });
    }

    res.json({
      success: true,
      confirm,
      result: {
        calculatedAmount: calculatedAmount.toFixed(2),
        calculatedActuallAmount: calculatedActuallAmount.toFixed(2),
        bidPrice: BID_PRICE,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
}
