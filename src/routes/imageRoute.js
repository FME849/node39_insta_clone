import { Router } from "express";
import { handleGetImages } from "../controllers/imageController.js";

const imageRouter = Router();

imageRouter.get('/get-images', handleGetImages);

export default imageRouter;