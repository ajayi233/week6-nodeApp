import express from "express";
import { createImage, deleteImage, getImage, getImages } from "../controller/image.js";
import upload from "../utils/multerconfig.js";

const router = express.Router();

router.post("/upload", upload.single("image"), createImage);
router.get("/", getImages);
router.get("/get-image/:id", getImage);
router.delete("/images/:id", deleteImage);

export default router;
