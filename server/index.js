import app from "./app.js";
import { connectToDatabase } from "./configs/database.config.js";
import logger from "./configs/logger.config.js";

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  await connectToDatabase();
}

let server;

server = app.listen(PORT, () => {
  logger.info(`Server is listening at ${PORT}.`);
});

const exitHandler = () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  }
});
