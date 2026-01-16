import createIntent from "../../controllers/v1/stripe/create-intent.js";
import getPaymentStatus from "../../controllers/v1/stripe/getPaymentStatus.js";

import { Router } from "express";

const router = Router();
router.post("/create-intent", createIntent); //Payment start
router.get("/payment-status/:paymentIntentId", getPaymentStatus);

export default router;
