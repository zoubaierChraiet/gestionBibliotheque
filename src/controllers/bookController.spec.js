import bookController from "../controllers/bookController.js";
import BookRepository from "../repositories/bookRepository.js";

jest.mock("../repositories/bookRepository.js");

describe("Book Controller", () => {
  let mockRequest, mockResponse, nextFunction;

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  describe("createBook", () => {
    it("should create a new book and return 201 status", async () => {
      const mockBook = { author: "zoubaier", title: "New Book" };
      mockRequest.body = mockBook;
      BookRepository.addBook.mockResolvedValue(mockBook);

      await bookController.createBook(mockRequest, mockResponse, nextFunction);

      expect(BookRepository.addBook).toHaveBeenCalledWith(mockBook);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockBook);
    });

    it("should call next with an error when book creation fails", async () => {
      const mockError = new Error("Failed to create book");

      BookRepository.addBook.mockRejectedValue(mockError);
      await bookController.createBook(mockRequest, mockResponse, nextFunction);
      expect(nextFunction).toHaveBeenCalledWith(mockError);
    });
  });

  describe("updateBook", () => {
    it("should update a book and return 200 status", async () => {
      const mockUpdatedBook = {
        author: "zouba",
        title: "Updated Book",
        publicationYear: 2050,
      };
      mockRequest.params.id = "1";
      mockRequest.body = mockUpdatedBook;
      BookRepository.updateBook.mockResolvedValue(mockUpdatedBook);

      await bookController.updateBook(mockRequest, mockResponse, nextFunction);

      expect(BookRepository.updateBook).toHaveBeenCalledWith(
        "1",
        mockRequest.body
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedBook);
    });

    it("should call next with an error when book update fails", async () => {
      const mockError = new Error("Failed to update book");
      mockRequest.params.id = "1";
      BookRepository.updateBook.mockRejectedValue(mockError);

      await bookController.updateBook(mockRequest, mockResponse, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(mockError);
    });
  });

  describe("deleteBook", () => {
    it("should delete a book and return 200 status", async () => {
      mockRequest.params.id = "1";
      BookRepository.deleteBook.mockResolvedValue();

      await bookController.deleteBook(mockRequest, mockResponse, nextFunction);

      expect(BookRepository.deleteBook).toHaveBeenCalledWith("1");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true });
    });

    it("should call next with an error when book deletion fails", async () => {
      const mockError = new Error("Failed to delete book");
      mockRequest.params.id = "1";
      BookRepository.deleteBook.mockRejectedValue(mockError);

      await bookController.deleteBook(mockRequest, mockResponse, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(mockError);
    });
  });
});
