import Image from "../models/imageModel.js";
import { deleteImageFromS3, fetchImagesFromS3, uploadToS3 } from "../utils/s3FileUpload.js";

/**
 * Get all images
 */
export const getImages = async (req, res) => {
  try {
    // const images = await fetchImagesFromS3();
    const images = await Image.findAll();
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalPages = Math.ceil(images.length / limit);

    const paginatedImages = images.slice(startIndex, endIndex);

    res.render("index", {
      images: paginatedImages,
      currentPage: page,
      totalPages,
      totalImages: images.length,
    });
    // res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Create a new image
 */
export const createImage = async (req, res) => {
  try {
    const { description } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const now = Date.now()
    req.file.filename = now;
    //upload image to s3
    const s3URL = await uploadToS3(req.file);
    if (!s3URL) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    console.log(s3URL);
    const imageBody = { filename: `${req.file.filename}-${req.file.originalname}`, description, path: s3URL };
    const image = await Image.create(imageBody);
    res.redirect("/");
    // res.status(201).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Delete an image
 */
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findByPk(id);
    const imageName = image.filename;
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    const deletedImage = await image.destroy();
    if (deletedImage) {
      await deleteImageFromS3(imageName);
    }
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * get an image
 */
export const getImage = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
