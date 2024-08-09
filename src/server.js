// Librairies
import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import { serve, setup } from "swagger-ui-express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Routers
import bookRouter from "./routes/bookRoutes.js";

// Utils
import connectDatabase from "./utils/db.js";

// Middlewares
import { CustomError, errorMiddleware } from "./middlewares/errorMiddleware.js";
import Logger from "./utils/logger.js";

// Constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// Swagger configuration
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "swagger.json"))
);

const app = express();

app.use(express.json());

// Routes
app.use("/books", bookRouter);
app.use("/api-docs", serve, setup(swaggerDocument));

// Handle not found routes
app.use("*", () => {
  throw new CustomError("ROUTE_NOT_FOUND");
});

app.use(errorMiddleware);

const PORT = process.env.APP_PORT;

connectDatabase();
app.listen(PORT, () => {
  Logger.info(`App Started on port: ${PORT}`);
});
