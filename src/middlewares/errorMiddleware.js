import { ErrorDict } from "../utils/constants.js";

export class CustomError extends Error {
  constructor(type) {
    super();
    this.type = type;
  }
}

export const errorMiddleware = async (error, req, res, next) => {
  const errorStatusCode = ErrorDict[error.type].status || 500;
  const message = ErrorDict[error.type].message || "Unexpected error";

  res.status(errorStatusCode).send({ error: message });
};
