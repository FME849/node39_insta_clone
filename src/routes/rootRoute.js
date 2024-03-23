import { Router } from "express";
import authRouter from "./authRoute.js";

const rootRouter = Router();

rootRouter.use('/auth', authRouter);

export default rootRouter;