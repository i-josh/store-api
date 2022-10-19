import express from "express";
import dotenv from "dotenv";
import { notfound } from "./middleware/not_found.js";
import { errorHandlerMiddleware } from "./middleware/error_handler.js";
import { connectDB } from "./db/connect.js";
import productsRouter from "./routes/products.js";
import 'express-async-errors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());

//routes
app.use("/api/v1/products", productsRouter);

app.use(notfound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    //connect to db
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`app started at ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
