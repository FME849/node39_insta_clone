import { Router } from "express";
import { handleGetUser, handleLogin, handleSignUp, handleUpdateUserInfo } from "../controllers/authController.js";
import { midVerifyToken } from "../config/jwt.js";

const authRouter = Router();

authRouter.post('/sign-up', handleSignUp);
authRouter.post('/login', handleLogin);
authRouter.get('/get-user', midVerifyToken, handleGetUser);
authRouter.put('/update-user-info', handleUpdateUserInfo);

export default authRouter;