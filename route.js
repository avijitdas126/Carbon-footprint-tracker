import express from "express";
import { app } from "./routes/upload.js";
import { analysis } from "./routes/analysis.js";
const route = express.Router();

route.get("/ping", (req, res) => {
  res.status(200).json({
    code: 200,
    message: "Server is running",
  });
});
route.use('/upload',app)
route.use('/analysis',analysis)
export { route };
