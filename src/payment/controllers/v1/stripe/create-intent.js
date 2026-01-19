import stripe from "../../../../configs/stripe.js";
import Payment from "../../../../models/Payment.js";

const createIntent = async (req, res) => {
  try {
    // const userId = req.user.id; // auth middleware
    const userId = "696a0b0e7de7259de9e0c76a"; // temporary hardcoded userId

    //amount only decided by backend
    const currency = "inr";
    const amountInRupees = 6000;
    const amount = amountInRupees * 100;

    //Stripe PaymentIntent create
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    //Payment DB entry
    const payment = await Payment.create({
      userId,
      amount: amountInRupees,
      currency,
      paymentIntentId: paymentIntent.id,
      status: "PENDING",
    });

    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Create Payment Intent Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default createIntent;
