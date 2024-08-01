import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://abderrahmenmeghzili:b9B550FEE8C17!@cluster0.aga37zn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("connected to DB");
    });
};
