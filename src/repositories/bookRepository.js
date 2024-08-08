import { CustomError } from "../middlewares/errorMiddleware.js";
import BookModel from "../models/book.js";

const addBook = async (data) => {
  const newBook = new BookModel(data);
  return await newBook.save();
};

const deleteBook = async (id) => {
  // Find the book to delete
  const bookToDelete = await BookModel.findById(id);
  if (!bookToDelete) {
    throw new CustomError("BOOK_NOT_FOUND");
  }
  return await BookModel.findByIdAndDelete(id);
};

const updateBook = async (id, data) => {
  // Find the book to update
  const bookToUpdate = await BookModel.findById(id);
  if (!bookToUpdate) {
    throw new CustomError("BOOK_NOT_FOUND");
  }
  const newBook = new BookModel(Object.assign(bookToUpdate, data));
  return newBook.save();
};

const findAllBooks = async () => {
  try {
    return await BookModel.find();
  } catch (err) {
    throw new Error(err);
  }
};

export default { addBook, updateBook, findAllBooks, deleteBook };
