import BookModel from "../models/book.js";

const addBook = async (data) => {
  const newBook = new BookModel(data);
  return await newBook.save();
};

const deleteBook = async (id) => {
  return await BookModel.findByIdAndDelete(id);
};

const updateBook = async (id, data) => {
  // Find the book to update
  const bookToUpdate = BookModel.findById(id);
  const newBook = new BookModel(Object.assign(bookToUpdate, data));
  return newBook.save();
};

const findAllBooks = async () => {
  return await BookModel.find();
};

export default { addBook, updateBook, findAllBooks, deleteBook };
