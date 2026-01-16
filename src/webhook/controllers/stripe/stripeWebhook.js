import stripe from "../../../configs/stripe.js";
import { STRIPE_TEST_WEBHOOK_SECRET } from "../../../configs/environment.config.js";
import Payment from "../../../models/Payment.js";

const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  // Verify Stripe signature
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      STRIPE_TEST_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const paymentIntent = event.data.object;

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        console.log("✅ Payment Success:", paymentIntent.id);
        await Payment.findOneAndUpdate(
          { paymentIntentId: paymentIntent.id },
          {
            status: "SUCCESS",
            stripeResponse: paymentIntent,
          }
        );
        break;

      case "payment_intent.payment_failed":
        console.log("❌ Payment Failed:", paymentIntent.id);
        await Payment.findOneAndUpdate(
          { paymentIntentId: paymentIntent.id },
          {
            status: "FAILED",
            stripeResponse: paymentIntent,
          }
        );
        break;

      case "payment_intent.canceled":
        console.log("🚫 Payment Canceled:", paymentIntent.id);
        await Payment.findOneAndUpdate(
          { paymentIntentId: paymentIntent.id },
          {
            status: "CANCELED",
            stripeResponse: paymentIntent,
          }
        );
        break;

      default:
        console.log("Unhandled event:", event.type);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook DB update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default stripeWebhook;
