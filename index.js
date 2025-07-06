import express from "express";

import cors from "cors";

import { PORT } from "./export.js";

import fileUpload from "express-fileupload";

import swaggerUi from 'swagger-ui-express'

import { route } from "./route.js";

import docs from './swagger-output.json' assert { type: 'json' };

const app = express();

app.use(fileUpload());



app.use(express.json());

app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(docs));

app.use(cors({ origin: "*" }));

app.use("/v1", route);

app.listen(PORT, () => {
  console.log(`Running server at port ${PORT}`);
});
