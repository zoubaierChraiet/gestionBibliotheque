// Librairies
import express from "express";

// Utils
import connectDatabase from "./utils/db.js";

const app = express();

const PORT = 3000;

connectDatabase();

app.listen(PORT, () => {
  console.log(`App Started on port: ${PORT}`);
});
