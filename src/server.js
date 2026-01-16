import express from "express";
import { PORT } from "./config/environment.config.js";
import paymentRouter from "./payment/app.route.js";

const app = express();
app.use(express.json());

// Routes
app.use(paymentRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
