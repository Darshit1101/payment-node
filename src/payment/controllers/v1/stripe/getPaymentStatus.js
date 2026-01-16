import Payment from "../../../../models/Payment.js";

const getPaymentStatus = async (req, res) => {
  const { paymentIntentId } = req.params;

  const payment = await Payment.findOne({ paymentIntentId });

  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }

  res.json({
    status: payment.status,
    amount: payment.amount,
    currency: payment.currency,
  });
};

export default getPaymentStatus;
