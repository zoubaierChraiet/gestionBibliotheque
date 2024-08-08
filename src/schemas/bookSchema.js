import { Schema } from "mongoose";

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publicationYear: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default BookSchema;
