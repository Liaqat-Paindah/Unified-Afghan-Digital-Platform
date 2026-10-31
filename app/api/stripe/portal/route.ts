import { NextRequest, NextResponse } from "next/server";
import { Subscription } from "@/models/subscriptions";
import { verifyToken } from "@/lib/verifyToken";
import dbConnect from "@/lib/db";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    const payload = await verifyToken();

    if (!payload?.userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();
    const { userId } = payload;

    const subscription = await Subscription.findOne({
      user_id: userId,
      provider: "stripe",
    })
      .sort({ createdAt: -1 })
      .select(
      "provider_customer_id"
    );

    if (!subscription) {
      return NextResponse.json(
        { message: "No Stripe subscription was found for this account." },
        { status: 404 },
      );
    }

    if (!subscription.provider_customer_id) {
      return NextResponse.json(
        {
          message: "No Stripe customer is associated with this account.",
        },
        { status: 400 },
      );
    }

    const returnUrl = `${request.nextUrl.origin}/products/payment`;

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.provider_customer_id,
      return_url: returnUrl,
    });

    return NextResponse.json({
      url: portalSession.url,
    });
  } catch (error) {
    console.error("Stripe Customer Portal error:", error);

    return NextResponse.json(
      {
        message: "Unable to create Stripe Customer Portal session.",
      },
      { status: 500 },
    );
  }
}
