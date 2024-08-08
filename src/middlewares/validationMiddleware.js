export const validationMiddleware = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
};
