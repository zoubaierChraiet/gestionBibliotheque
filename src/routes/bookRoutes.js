import bookController from "../controllers/bookController.js";

import { Router } from "express";

const bookRouter = Router();

bookRouter.get("/", bookController.getAllBooks);

bookRouter.post("/", bookController.createBook);

bookRouter.patch("/:id", bookController.updateBook);

bookRouter.delete("/:id", bookController.deleteBook);

export default bookRouter;
