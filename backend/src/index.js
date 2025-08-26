import express from "express";
import { server, app, io } from "../lib/socket.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config();
import connectdb from "../lib/db.js";
import authRouter from "../routes/routes.auth.js";
import messageRouter from "../routes/routes.message.js";
import path from "path";

// const app = express();
const __dirname = path.resolve();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

server.listen(5000, () => {
  console.log("server is listening on port 5000");
  connectdb();
});
