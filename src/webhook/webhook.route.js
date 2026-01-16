import { Router, raw } from "express";
import webhookRouter from "./router/zindex.route.js";

const webhookRootRouter = Router();

webhookRootRouter.use(
  "/webhook",
  raw({ type: "application/json" }),
  webhookRouter
);

export default webhookRootRouter;
