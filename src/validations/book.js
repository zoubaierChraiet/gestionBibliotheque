import yup from "yup";

export const AddBookSchema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  publicationYear: yup.number().required(),
});

export const UpdateBookSchema = yup.object().shape({
  title: yup.string(),
  author: yup.string(),
  publicationYear: yup.number(),
});
