import { model } from "mongoose";
import BookSchema from "../schemas/bookSchema";

const BookModel = model("book", BookSchema);

export default BookModel;
