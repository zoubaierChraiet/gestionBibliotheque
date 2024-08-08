// Librairies
import { Router } from "express";

// Middlewares
import { validationMiddleware } from "../middlewares/validationMiddleware.js";

// Controllers
import bookController from "../controllers/bookController.js";

// Validation Schema
import { AddBookSchema, UpdateBookSchema } from "../validations/book.js";

const bookRouter = Router();

bookRouter.get("/", bookController.getAllBooks);

bookRouter.post(
  "/",
  validationMiddleware(AddBookSchema),
  bookController.createBook
);

bookRouter.patch(
  "/:id",
  validationMiddleware(UpdateBookSchema),
  bookController.updateBook
);

bookRouter.delete("/:id", bookController.deleteBook);

export default bookRouter;
