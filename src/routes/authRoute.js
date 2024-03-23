import { Router } from "express";
import { handleSignUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/sign-up', handleSignUp);

export default authRouter;