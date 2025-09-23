import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { plan, userId } = await req.json();

    if (!plan || !userId) {
      return NextResponse.json({ error: "Missing plan or userId" }, { status: 400 });
    }

    // Tạo Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: plan.name },
            unit_amount: plan.total * 100, 
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/verify?success=true&userId=${userId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/verify?success=false&userId=${userId}`,
      metadata: { userId }, 
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}