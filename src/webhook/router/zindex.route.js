import { Router } from "express";
import stripeWebhookRouter from "./stripe.webhook.route.js";

const webhookRouter = Router();
webhookRouter.use("/stripe", stripeWebhookRouter);

export default webhookRouter;
