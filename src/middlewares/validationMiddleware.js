export const validationMiddleware = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const errors = {};
    err.inner.forEach((each) => {
      errors[each.path] = each.errors[0];
    });
    res.status(400).json({ error: errors });
  }
};
