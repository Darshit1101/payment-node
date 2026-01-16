import createIntent from "../../controllers/v1/stripe/create-intent.js";
import { Router } from "express";

const router = Router();
router.post("/create-intent", createIntent); //Payment start

export default router;
