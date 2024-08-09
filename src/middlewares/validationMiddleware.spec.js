import { validationMiddleware } from "../middlewares/validationMiddleware.js";
import { AddBookSchema } from "../validations/book.js";

let mockRequest, mockResponse, nextFunction;

beforeEach(() => {
  mockRequest = {
    body: {},
  };
  mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  nextFunction = jest.fn();
});

describe("validationMiddleware", () => {
  it("should call next() if validation passes", async () => {
    mockRequest.body = {
      author: "zoubaier chraiet",
      publicationYear: 2023,
      title: "Test title",
    };

    const middleware = validationMiddleware(AddBookSchema);
    await middleware(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  it("should return 400 and validation errors if validation fails", async () => {
    mockRequest.body = {
      author: "zoubaier chraiet",
    };

    const middleware = validationMiddleware(AddBookSchema);
    await middleware(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: {
        publicationYear: "publicationYear is a required field",
        title: "title is a required field",
      },
    });
  });

  it("should return multiple validation errors if multiple fields are invalid", async () => {
    mockRequest.body = {};

    const middleware = validationMiddleware(AddBookSchema);
    await middleware(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: {
        author: "author is a required field",
        title: "title is a required field",
        publicationYear: "publicationYear is a required field",
      },
    });
  });
});
