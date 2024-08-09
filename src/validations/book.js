import { object, string, number } from "yup";

export const AddBookSchema = object().shape({
  title: string().required(),
  author: string().required(),
  publicationYear: number().required(),
});

export const UpdateBookSchema = object().shape({
  title: string(),
  author: string(),
  publicationYear: number(),
});
