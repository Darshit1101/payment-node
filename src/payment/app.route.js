import { Router } from "express";
import v1Router from "./routes/v1/zindex.routes.js";

const appRouter = Router();
appRouter.use("/payment/v1", v1Router);

export default appRouter;
