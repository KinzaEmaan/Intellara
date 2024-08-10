import Stripe from "stripe";
import Payment from "@/models/paymentModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST (request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let data = await request.json();
    let priceId = data.priceId
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
      mode: 'payment',
      success_url: 'http://localhost:3000/home', //redirect to home
      cancel_url: 'http://localhost:3000/landing'//redirect to landing
    });
   
    console.log("Payment Info:", session);
  console.log("Checkout Session ID:", session.id);
  console.log("Payment Success URL:", session.success_url);
  console.log("Payment Cancel URL:", session.cancel_url);

  console.log("Payment session created successfully.");

    return NextResponse.json(session.url)
}