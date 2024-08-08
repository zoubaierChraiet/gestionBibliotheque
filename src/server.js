// Librairies
import express from "express";
import dotenv from "dotenv";

// Routers
import bookRouter from "./routes/bookRoutes.js";

// Utils
import connectDatabase from "./utils/db.js";

// Middlewares
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import Logger from "./utils/logger.js";

dotenv.config();

const PORT = process.env.APP_PORT;

const app = express();

app.use(express.json());

app.use("/books", bookRouter);

app.use(errorMiddleware);

connectDatabase();

app.listen(PORT, () => {
  Logger.info(`App Started on port: ${PORT}`);
});
