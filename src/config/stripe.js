import Stripe from "stripe";
import { STRIPE_TEST_SECRET_KEY } from "./environment.config.js";

const stripe = new Stripe(STRIPE_TEST_SECRET_KEY);

export default stripe;
