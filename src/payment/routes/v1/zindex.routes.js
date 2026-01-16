import { Router } from "express";
import stripeRouter from "./stripe.routes.js";

const v1Router = Router();
v1Router.use("/stripe", stripeRouter);

export default v1Router;
