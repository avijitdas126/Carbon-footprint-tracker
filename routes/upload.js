import express from "express";
import { db, delete_file } from "../storage.js";
import { ocr } from "../ocr.js";
const app = express.Router();

app.post("/", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const file = req.files.file;
    // Upload directly to Cloudinary
    const result = await db.uploader
      .upload_stream(
        { resource_type: "auto", folder: "ocr" },
        async (error, result) => {
          if (error) return res.status(500).json({ error: error.message });
          let id = result.public_id;

          let url = result.secure_url;

          let text = await ocr(url);
          console.log(text);
          delete_file(id);
          res.json({ text });
        }
      )
      .end(file.data); // Send file buffer
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export {app}