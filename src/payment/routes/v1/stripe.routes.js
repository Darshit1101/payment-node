import createIntentController from "../../controllers/v1/stripe/create-intent.js";
import { Router } from "express";

const router = Router();
router.post("/create-intent", createIntentController); //Payment start

export default router;
