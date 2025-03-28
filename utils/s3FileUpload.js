import fs from "fs";
import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

//s3 blucket configurations
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

// Upload Image to S3
export const uploadToS3 = async (file) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: `uploads/${file.filename}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  // Delete local file after upload
  // fs.unlinkSync(file.path);

  return `https://${BUCKET_NAME}.s3.amazonaws.com/uploads/${file.filename}-${file.originalname}`;
};

export const fetchImagesFromS3 = async () => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: "uploads/", // Ensures we get only uploaded images
    };

    const command = new ListObjectsV2Command(params);
    const response = await s3.send(command);

    if (!response.Contents) return [];

    return response.Contents.map((obj) => ({
      name: obj.Key.replace("uploads/", ""),
      url: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${obj.Key}`,
    }));
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

export const deleteImageFromS3 = async (filename) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${filename}`,
    };
    const command = new DeleteObjectCommand(params);
    await s3.send(command);
  } catch (error) {
    console.error(`Error deleting image ${filename}:`, error);
  }
};
