import express from "express";
import { PORT } from "./configs/environment.config.js";
import paymentRouter from "./payment/app.route.js";
import webhookRouter from "./webhook/webhook.route.js";
import { appDb } from "./configs/dbConnection.config.js";

const app = express();

//webhook
app.use(webhookRouter);

//parse json bodies
app.use(express.json());

// Routes
app.use(paymentRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
