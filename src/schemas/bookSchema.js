import { Schema } from "mongoose";

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationYear: { type: Date, required: true },
});

export default BookSchema;
