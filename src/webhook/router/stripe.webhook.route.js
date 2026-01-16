import { Router } from "express";
import stripeWebhook from "../controllers/stripe/stripeWebhook.js";

const stripeWebhookRouter = Router();
stripeWebhookRouter.post("/", stripeWebhook);

export default stripeWebhookRouter;
