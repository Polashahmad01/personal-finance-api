import "dotenv/config";
import express from "express";
import morgan from "morgan";
import colors from "colors";
import cors from "cors";

// Import files
import connectToDatabase from "./config/db.js";
import userRoutes from "./routes/user.js";

// Connect to DB
connectToDatabase();

// Create an app
const app = express();

// Add body parser
app.use(express.json());

// Log middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Enable cors
app.use(cors());

// Routes
app.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Welcome to Personal Finance API",
  });
});

app.use("/api", userRoutes);

// Error handing middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data || [];

  res
    .status(status)
    .json({ success: false, statusCode: status, message: message, data: data });
});

// Logs
const PORT = process.env.PORT || 8001;
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Handling unhandled rejections
process.on("unhandledRejection", (error) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
