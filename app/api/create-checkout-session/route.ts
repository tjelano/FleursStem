import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();
    // Default to 10 EUR if not provided, Stripe expects cents
    const donationAmount = amount ? Math.max(Number(amount), 1) : 10;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Donatie aan Fleur's Stem",
            },
            unit_amount: Math.round(donationAmount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.nextUrl.origin}/donatie-bedankt`,
      cancel_url: `${req.nextUrl.origin}/blog`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: "Stripe error", details: err }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
} 