import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const priceId = url.searchParams.get("priceId");

  if (!priceId) {
    return NextResponse.json({
      error: "Missing priceId query parameter",
    });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: [
      {
        price: priceId as string,
        quantity: 1,
      },
    ],
  });

  return NextResponse.json({
    checkoutUrl: checkoutSession.url,
  });
}
