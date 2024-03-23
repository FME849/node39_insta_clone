import { Router } from "express";
import { handleGetImages, handleGetImagesByName } from "../controllers/imageController.js";

const imageRouter = Router();

imageRouter.get('/get-images', handleGetImages);
imageRouter.get('/get-images-by-name', handleGetImagesByName);

export default imageRouter;