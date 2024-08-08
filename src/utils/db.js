import mongoose from "mongoose";
import Logger from "./logger.js";

let isConnected;

const connectDatabase = async () => {
  // check if db is already connected
  if (isConnected) {
    Logger.info("using current database connection");
    return;
  }

  try {
    // init db connection
    const db = await mongoose.connect(process.env.DB_URL);
    // update connection state
    isConnected = db.connections[0].readyState;
    Logger.info("database is connected");
  } catch (err) {
    Logger.info("Database connection error:", error);
  }
};

export default connectDatabase;
