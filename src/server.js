// Librairies
import express from "express";

// Routers
import bookRouter from "./routes/bookRoutes.js";

// Utils
import connectDatabase from "./utils/db.js";

// Middlewares
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(express.json());

app.use("/books", bookRouter);

app.use(errorMiddleware);

connectDatabase();

app.listen(PORT, () => {
  console.log(`App Started on port: ${PORT}`);
});
