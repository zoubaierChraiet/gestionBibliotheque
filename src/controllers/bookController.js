import BookRepository from "../repositories/bookRepository.js";
import Logger from "../utils/logger.js";

const createBook = async (request, response, next) => {
  try {
    Logger.info("[createBook] - Attempting book creation");
    const newBook = await BookRepository.addBook(request.body);
    Logger.info("[createBook] - book created successfully", newBook.toJSON());
    response.status(201).json(newBook);
  } catch (err) {
    Logger.error("[createBook] - error occured while creating book");
    next(new Error(err));
  }
};

const updateBook = async (request, response, next) => {
  try {
    const { id } = request.params;
    Logger.info(`[updateBook] - Attempting to update book with id ${id}`);
    const updatedBook = await BookRepository.updateBook(id, request.body);
    Logger.info(`[updateBook] - updated book with id ${id} successfully`);
    response.status(200).json(updatedBook);
  } catch (err) {
    Logger.error(
      `[updateBook] - error occured while updating book with id ${id}`
    );
    next(new Error(err));
  }
};

const getAllBooks = async (_, response) => {
  try {
    Logger.info(`[getAllBooks] - Attempting to get all books`);
    const books = await BookRepository.findAllBooks();
    Logger.info(`[getAllBooks] - got all books successfully`);
    response.status(200).json(books);
  } catch (err) {
    Logger.error(`[getAllBooks] - error occured while getting books`);
    next(new Error(err));
  }
};

const deleteBook = async (request, response) => {
  try {
    const { id } = request.params;
    Logger.info(`[deleteBook] - Attempting to delete book with id: ${id}`);
    await BookRepository.deleteBook(id);
    Logger.info(`[deleteBook] - deleted book successfully`);
    response.status(200);
  } catch (err) {
    Logger.error(
      `[deleteBook] - error occured while deleting book with id: ${id}`
    );
    next(new Error(err));
  }
};

export default { createBook, updateBook, getAllBooks, deleteBook };
