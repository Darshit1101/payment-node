import stripe from "../../../../configs/stripe.js";

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Basic validation
    if (!amount || !currency) {
      return res.status(400).json({
        success: false,
        message: "Amount and currency are required",
      });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a positive number",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Ensure integer
      currency: currency.toLowerCase(),
    });

    res.status(200).json({
      success: true,
      data: paymentIntent,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create payment intent",
      error: error.message,
    });
  }
};

export default createPaymentIntent;
