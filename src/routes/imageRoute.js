import { Router } from "express";
import { handleGetImageDetail, handleGetImages, handleGetImagesByName } from "../controllers/imageController.js";

const imageRouter = Router();

imageRouter.get('/get-images', handleGetImages);
imageRouter.get('/get-images-by-name', handleGetImagesByName);
imageRouter.get('/get-image-detail', handleGetImageDetail);

export default imageRouter;