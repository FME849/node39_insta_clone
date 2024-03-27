import { Router } from "express";
import { handleGetUser, handleLogin, handleSignUp } from "../controllers/authController.js";
import { midVerifyToken } from "../config/jwt.js";

const authRouter = Router();

authRouter.post('/sign-up', handleSignUp);
authRouter.post('/login', handleLogin);
authRouter.get('/get-user', midVerifyToken, handleGetUser);

export default authRouter;