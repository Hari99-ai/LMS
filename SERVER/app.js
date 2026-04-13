import { config } from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: resolve(__dirname, ".env") });

import conectDB from "./config/dbConection.js";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routers/user.route.js";
import errorMiddleware from "./middlewares/error.middlewares.js";
import courseRoute from "./routers/course.route.js";
import paymentRoute from "./routers/payment.routs.js";
import mescellaniousRoute from "./routers/miscellaneous.js";
import quizRouter from "./routers/quiz.route.js";
import { Server } from "socket.io";
import http from "http";
import emailRouter from "./routers/email.route.js";
import { createChat } from "./controllers/chat.controller.js";
import chatRouter from "./routers/chat.route.js";

const app = express();
const server = http.createServer(app);
const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const createCorsOriginCheck = (origin, callback) => {
  if (!origin) {
    return callback(null, true);
  }

  if (allowedOrigins.includes(origin)) {
    return callback(null, true);
  }

  return callback(new Error(`Blocked by CORS: ${origin}`));
};

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(isProduction ? morgan("combined") : morgan("dev"));

const corsOptions = {
  origin: createCorsOriginCheck,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/data", mescellaniousRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/quizzes", quizRouter);
app.use("/api/v1/email", emailRouter);
app.use("/api/v1/chat", chatRouter);

app.use("/", (req, res) => {
  res.send("Hey I am rohan malakar");
});

app.all("*", (req, res) => {
  res.status(404);
  res.send("OOPS! page not found");
});

app.use(errorMiddleware);

const io = new Server(server, {
  cors: {
    origin: createCorsOriginCheck,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", async (data) => {
    try {
      const response = await createChat(data);
      if (response.success === false) {
        socket.emit("message_error", { message: "Failed to send message" });
        return;
      }

      io.emit("receive_message", response);
    } catch (error) {
      console.error(error);
      socket.emit("message_error", { message: "Failed to send message" });
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const shutdown = (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

conectDB()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("listening on *", process.env.PORT);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

export { io };
