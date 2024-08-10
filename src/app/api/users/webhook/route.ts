import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import UserSubscriptionData from "@/models/paymentModel";

//Stripe and webhook secret
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});
const webhookSecret: string = process.env.STRIPE_WEBHOOK!;

connect();

// Webhook handler function
const webhookHandler = async (req: NextRequest) => {
  try {
    const buf = await req.text();
    const sig = req.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.log(`❌ Error message: ${errorMessage}`);

      return NextResponse.json(
        {
          error: {
            message: `Webhook Error: ${errorMessage}`,
          },
        },
        { status: 400 }
      );
    }

    console.log("✅ Success:", event.id);

    switch (event.type) {
      case "payment_intent.succeeded":
        console.log("Payment intent succeeded:", event.data.object);
        // Save payment data to MongoDB
        const { id: intent_id, amount, currency, payment_method, status, created, receipt_email } = event.data.object;
        const payment_date = new Date(created * 1000); 

        const newUserSubscriptionData = new UserSubscriptionData({
          intent_id,
          amount,
          currency,
          payment_method,
          status,
          receipt_email,
          payment_date,
        });

        await newUserSubscriptionData.save();
        
        break;
      case "payment_intent.payment_failed":
        console.log("Payment intent failed:", event.data.object);
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`);
        break;
    }

    // Returning a response to acknowledge receipt of the event.
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json(
      {
        error: {
          message: `Method Not Allowed`,
        },
      },
      { status: 405 }
    ).headers.set("Allow", "POST");
  }
};

export { webhookHandler as POST };
