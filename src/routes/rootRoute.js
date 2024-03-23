import { Router } from "express";
import authRouter from "./authRoute.js";
import imageRouter from "./imageRoute.js";

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/image', imageRouter);

export default rootRouter;