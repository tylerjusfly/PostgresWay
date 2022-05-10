import express, { Application, ErrorRequestHandler } from "express";
import cors from "cors";
import { Server } from "http";
import { ROUTES } from "./utils/constants";

// Importing routes
import indexRouter from "./routes/index";
import roomRouter from "./routes/room";
import postRouter from "./routes/post";

// Setting app to type of express application
const app: Application = express();
const PORT = process.env.PORT || 4000;

// setting up Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// importing routs
app.use(ROUTES.INDEX, indexRouter);
app.use(ROUTES.ROOM, roomRouter);
app.use(ROUTES.POST, postRouter);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message,
  });
};
app.use(errorHandler);

const server: Server = app.listen(PORT, () => {
  console.log(`🔥 Server running on ${PORT}`);
});
