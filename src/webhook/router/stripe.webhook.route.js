import { Router } from "express";
import stripeWebhook from "../controllers/stripe/stripeWebhook.js";

const stripeWebhookRouter = Router();
stripeWebhookRouter.post("/job-payment", stripeWebhook);

export default stripeWebhookRouter;
