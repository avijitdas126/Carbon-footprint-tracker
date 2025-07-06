import cloudinary from "cloudinary";
import { API_KEY, API_SECERT, CLOUD_NAME } from "./export.js";
const db = cloudinary.v2;
db.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret:API_SECERT,
});

export const delete_file = async (id) => {
  try {
    const result = await db.uploader.destroy(id, { invalidate: true });
    console.log("File deleted successfully");
  } catch (error) {
    console.log(error);
  }
};

export {db}