import mongoose from "mongoose";

let isConnected;

const connectDatabase = async () => {
  // check if db is already connected
  if (isConnected) {
    console.log("using current database connection");
    return;
  }

  try {
    // init db connection
    const db = await mongoose.connect(process.env.DB_URL);
    // update connection state
    isConnected = db.connections[0].readyState;
    console.log("database is connected");
  } catch (err) {
    console.error("Database connection error:", error);
  }
};

export default connectDatabase;
