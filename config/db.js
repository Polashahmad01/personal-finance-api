import mongoose from "mongoose";
import colors from "colors";
import { enableEnv } from "../utils/enableEnv.js";

export default async function connectToDatabase() {
  try {
    const connect = await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xeli106.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log(
      `MongoDB Connected: ${connect.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`.red.bold);
    process.exit(1);
  }
}
