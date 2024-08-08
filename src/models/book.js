import { model } from "mongoose";
import BookSchema from "../schemas/bookSchema.js";

const BookModel = model("book", BookSchema);

export default BookModel;
