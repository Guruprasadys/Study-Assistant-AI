import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import aiRoute from "./routes/aiRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

// ----------------------------
// Middlewares
// ----------------------------

app.use(helmet());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// ----------------------------
// Health Check
// ----------------------------

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Study Assistant AI Backend Running",
    provider: "Azure OpenAI",
    version: "2.0.0",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ----------------------------
// API Routes
// ----------------------------

app.use("/api", aiRoute);

// ----------------------------
// 404 Handler
// ----------------------------

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route Not Found",
  });
});

// ----------------------------
// Global Error Handler
// ----------------------------

app.use((err, req, res, next) => {
  console.error("Server Error:");
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

// ----------------------------
// Start Server
// ----------------------------

app.listen(PORT, () => {
  console.log("======================================");
  console.log("Study Assistant AI Backend Started");
  console.log(`Server : http://localhost:${PORT}`);
  console.log("AI Provider : Azure OpenAI");
  console.log("======================================");
});