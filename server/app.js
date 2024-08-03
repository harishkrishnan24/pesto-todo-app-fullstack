import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import createHttpError from "http-errors";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(express.json({ limit: "3mb" }));

app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());

app.use(compression());

app.use(cors());

app.use("/api", routes);

app.use(async (_req, _res, next) => {
  next(createHttpError.NotFound("This route does not exist."));
});

app.use(async (err, _req, res, _next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;
