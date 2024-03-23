import { Router } from "express";
import { handleLogin, handleSignUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/sign-up', handleSignUp);
authRouter.post('/login', handleLogin);

export default authRouter;