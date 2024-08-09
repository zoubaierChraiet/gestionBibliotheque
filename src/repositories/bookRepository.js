import { CustomError } from "../middlewares/errorMiddleware.js";
import BookModel from "../models/book.js";

const addBook = async (data) => {
  try {
    const newBook = new BookModel(data);
    return await newBook.save();
  } catch (err) {
    throw new CustomError("SAVE_FAILED");
  }
};

const deleteBook = async (id) => {
  // Find the book to delete
  try {
    const bookToDelete = await BookModel.findById(id);
    if (!bookToDelete) {
      throw new CustomError("BOOK_NOT_FOUND");
    }
    return await BookModel.findByIdAndDelete(id);
  } catch (err) {
    throw new CustomError("DELETION_FAILED");
  }
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
