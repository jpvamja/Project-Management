import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "cookie-session";
import { config } from "./config/app.config.js";
import connectDatabase from "./config/database.config.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

import asyncHandler from "express-async-handler";
import { BadRequestException } from "./utils/appError.js";
import { ErrorCodeEnum } from "./enums/error-code.enum.js";
import { HTTPSTATUS } from "./config/http.config.js";


const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "session",
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  })
);

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);



app.get(
  "/",
  asyncHandler(async (req, res, next) => {
    throw new BadRequestException(
      "This is a bad request",
      ErrorCodeEnum.AUTH_INVALID_TOKEN
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "This is my first project.",
    });
  })
);



app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});
