import BookRepository from "../repositories/bookRepository.js";

const createBook = async (request, response, next) => {
  try {
    const newBook = await BookRepository.addBook(request.body);
    response.status(201).json(newBook);
  } catch (err) {
    next(new Error(err));
  }
};

const updateBook = async (request, response, next) => {
  try {
    const { id } = request.params;
    const updatedBook = await BookRepository.updateBook(id, request.body);
    response.status(200).json(updatedBook);
  } catch (err) {
    next(new Error(err));
  }
};

const getAllBooks = async (_, response) => {
  try {
    const books = await BookRepository.findAllBooks();
    response.status(200).json(books);
  } catch (err) {
    next(new Error(err));
  }
};

const deleteBook = async (request, response) => {
  try {
    const { id } = request.params;
    await BookRepository.deleteBook(id);
    response.status(200);
  } catch (err) {
    next(new Error(err));
  }
};

export default { createBook, updateBook, getAllBooks, deleteBook };
