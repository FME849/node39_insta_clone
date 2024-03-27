import { Router } from "express";
import { handleGetImageDetail, handleGetImages, handleSearchImagesByName, handleUploadImage, handleGetCommentByImage, handleCheckSavedImage, handleCommentOnImage } from "../controllers/imageController.js";
import upload from "../config/multer.js";
import { midVerifyToken } from "../config/jwt.js";

const imageRouter = Router();

imageRouter.get('/get-images', handleGetImages);
imageRouter.get('/search-images-by-name', handleSearchImagesByName);
imageRouter.get('/get-image-detail', handleGetImageDetail);
imageRouter.get('/get-comment-by-image', handleGetCommentByImage);
imageRouter.get('/check-saved-image', handleCheckSavedImage);
imageRouter.post('/upload-image', midVerifyToken, upload.single('image'), handleUploadImage)
imageRouter.post('/comment-on-image', midVerifyToken, handleCommentOnImage);

export default imageRouter;