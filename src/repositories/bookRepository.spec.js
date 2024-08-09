import bookRepository from "./bookRepository.js";
import BookModel from "../models/book.js";
import { CustomError } from "../middlewares/errorMiddleware.js";

// Mock the BookModel
jest.mock("../models/book.js");

describe("Book Service", () => {
  describe("addBook", () => {
    it("should add a new book", async () => {
      const mockBookData = { title: "Test Book", author: "zoubaier chraiet" };
      const mockSavedBook = { _id: "123", ...mockBookData };

      BookModel.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(mockSavedBook),
      }));

      const result = await bookRepository.addBook(mockBookData);

      expect(result).toEqual(mockSavedBook);
      expect(BookModel).toHaveBeenCalledWith(mockBookData);
    });

    it("should throw an error when save fails", async () => {
      const mockBookData = { title: "Test Book", author: "Zoubaier chraiet" };
      const mockError = new CustomError("SAVE_FAILED");

      BookModel.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(mockError),
      }));

      await expect(bookRepository.addBook(mockBookData)).rejects.toThrow(
        mockError
      );
    });
  });

  describe("deleteBook", () => {
    it("should delete a book by id", async () => {
      const mockBookId = "123";
      const mockBookToDelete = {
        _id: mockBookId,
        title: "Test Book",
        author: "zoubaier chraiet",
      };

      BookModel.findById.mockResolvedValue(mockBookToDelete);
      BookModel.findByIdAndDelete.mockResolvedValue(mockBookToDelete);

      const result = await bookRepository.deleteBook(mockBookId);

      expect(result).toEqual(mockBookToDelete);
      expect(BookModel.findById).toHaveBeenCalledWith(mockBookId);
      expect(BookModel.findByIdAndDelete).toHaveBeenCalledWith(mockBookId);
    });

    it("should throw CustomError if book not found", async () => {
      const mockBookId = "123";

      BookModel.findById.mockResolvedValue(null);

      await expect(bookRepository.deleteBook(mockBookId)).rejects.toThrow(
        CustomError
      );
      expect(BookModel.findById).toHaveBeenCalledWith(mockBookId);
    });

    it("should throw an error when deletion fails", async () => {
      const mockBookId = "123";
      const mockError = new CustomError("DELETION_FAILED");

      BookModel.findById.mockResolvedValue({
        _id: mockBookId,
        title: "Test Book",
      });
      BookModel.findByIdAndDelete.mockRejectedValue(mockError);

      await expect(bookRepository.deleteBook(mockBookId)).rejects.toThrow(
        mockError
      );
    });
  });

  describe("updateBook", () => {
    it("should update a book by id", async () => {
      const mockBookId = "123";
      const mockBookData = {
        title: "Updated Title",
        author: "zoubaier chraiet",
      };
      const mockBookToUpdate = {
        _id: mockBookId,
        title: "Old Title",
        author: "zoubaier chraiet",
      };
      const mockUpdatedBook = { _id: mockBookId, ...mockBookData };

      BookModel.findById.mockResolvedValue(mockBookToUpdate);
      BookModel.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(mockUpdatedBook),
      }));

      const result = await bookRepository.updateBook(mockBookId, mockBookData);

      console.log(result);

      expect(result).toEqual(mockUpdatedBook);
      expect(BookModel.findById).toHaveBeenCalledWith(mockBookId);
    });

    it("should throw CustomError if book not found", async () => {
      const mockBookId = "123";
      const mockBookData = {
        title: "Updated Title",
        author: "zoubaier chraiet",
      };

      BookModel.findById.mockResolvedValue(null);

      await expect(
        bookRepository.updateBook(mockBookId, mockBookData)
      ).rejects.toThrow(CustomError);
      expect(BookModel.findById).toHaveBeenCalledWith(mockBookId);
    });
  });

  describe("findAllBooks", () => {
    it("should find all books", async () => {
      const mockBooks = [
        { _id: "1", title: "Book 1", author: "Author 1" },
        { _id: "2", title: "Book 2", author: "Author 2" },
      ];

      BookModel.find.mockResolvedValue(mockBooks);

      const result = await bookRepository.findAllBooks();

      expect(result).toEqual(mockBooks);
      expect(BookModel.find).toHaveBeenCalled();
    });
  });
});
