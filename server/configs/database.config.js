import mongoose from "mongoose";
import logger from "./logger.config.js";

export async function connectToDatabase() {
  const { DATABASE_URL } = process.env;

  await mongoose.connect(DATABASE_URL).then(() => {
    logger.info("Connected to Mongodb.");
  });

  mongoose.connection.on("error", (err) => {
    logger.error(`Mongodb connection error : ${err}`);
    // Stop server on connection error
    process.exit(1);
  });
}
