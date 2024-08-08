import yup from "yup";

export const AddBookSchema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  publicationDate: yup.date().required(),
});

export const UpdateBookSchema = yup.object().shape({
  title: yup.string(),
  author: yup.string(),
  publicationDate: yup.date(),
});
