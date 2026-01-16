import mongoose from "mongoose";
import { appDb } from "../configs/dbConnection.config.js";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    paymentIntentId: {
      type: String,
      required: true,
      unique: true,
    },

    amount: {
      type: Number, // in paise
      required: true,
    },

    currency: {
      type: String,
      default: "inr",
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "CANCELED"],
      default: "PENDING",
    },

    method: {
      type: String, // card, upi, wallet
    },

    stripeResponse: {
      type: Object, // raw stripe data (optional)
    },
  },
  { timestamps: true }
);

const Payment = appDb.model("Payment", paymentSchema);
export default Payment;
