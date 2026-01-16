import stripe from "../../../configs/stripe.js";
import { STRIPE_TEST_WEBHOOK_SECRET } from "../../../configs/environment.config.js";
import Payment from "../../../models/Payment.js";

const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

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

  try {
    const paymentIntent = event.data.object;

    switch (event.type) {
      case "payment_intent.succeeded":
        await Payment.findOneAndUpdate(
          {
            paymentIntentId: paymentIntent.id,
            status: { $ne: "SUCCESS" }, // idempotent
          },
          {
            status: "SUCCESS",
            method: paymentIntent.payment_method_types?.[0],
            stripeResponse: paymentIntent,
          }
        );
        break;

      case "payment_intent.payment_failed":
        await Payment.findOneAndUpdate(
          {
            paymentIntentId: paymentIntent.id,
            status: { $ne: "FAILED" },
          },
          {
            status: "FAILED",
            stripeResponse: paymentIntent,
          }
        );
        break;

      case "payment_intent.canceled":
        await Payment.findOneAndUpdate(
          {
            paymentIntentId: paymentIntent.id,
            status: { $ne: "CANCELED" },
          },
          {
            status: "CANCELED",
            stripeResponse: paymentIntent,
          }
        );
        break;

      default:
        console.log("Unhandled event==>", event.type);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    res.status(500).json({ error: "Webhook handler failed" });
  }
};

export default stripeWebhook;
