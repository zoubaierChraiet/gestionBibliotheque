export const errorMiddleware = async (error, req, res, next) => {
  const errorStatusCode = error.statusCode || 500;
  const message = error.message || "Unexpected error";

  res.status(errorStatusCode).send({ error: message });
};
