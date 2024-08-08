import BookModel from "../models/book.js";

const addBook = async (data) => {
  const newBook = new BookModel(data);
  return await newBook.save();
};

const deleteBook = async (id) => {
  // Find the book to delete
  const bookToDelete = await BookModel.findById(id);
  if (!bookToDelete) {
    throw new Error("Book does not exist");
  }
  return await BookModel.findByIdAndDelete(id);
};

const updateBook = async (id, data) => {
  // Find the book to update
  const bookToUpdate = await BookModel.findById(id);
  if (!bookToUpdate) {
    throw new Error("Book does not exist");
  }
  const newBook = new BookModel(Object.assign(bookToUpdate, data));
  return newBook.save();
};

const findAllBooks = async () => {
  return await BookModel.find();
};

export default { addBook, updateBook, findAllBooks, deleteBook };
