import stripe from "../../../config/stripe.js";
import { STRIPE_TEST_WEBHOOK_SECRET } from "../../../config/environment.config.js";

const stripeWebhook = (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      STRIPE_TEST_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    console.log("✅ Payment Success:", paymentIntent.id);
    // 👉 Update DB here
  }

  if (event.type === "payment_intent.payment_failed") {
    console.log("❌ Payment Failed");
  }

  res.json({ received: true });
};

export default stripeWebhook;
