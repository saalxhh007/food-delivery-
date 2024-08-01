import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routers/foodRouter.js";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import "dotenv/config.js";
import cartRouter from "./routers/cartRouter.js";
import orderRouter from "./routers/orderRouter.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Connect To The DataBase
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(port, () => {
  console.log(`Listening On ${port}`);
});
