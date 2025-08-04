import express from "express";
import cors from "cors";
import path from "path";
import { handleDemo } from "./routes/demo";
import { handleChat } from "./routes/openai";
import { handleAzureChat } from "./routes/azure-chat";

export function createServer() {
  const app = express();

  // Middleware
  app.use(
    cors({
      origin: true,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "Cache-Control",
        "X-Requested-With",
        "api-key",
      ],
    }),
  );
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Serve browser directory as static files for Azure Speech SDK samples
  app.use("/browser", express.static(path.resolve(process.cwd(), "browser")));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // AI Chat route with OPTIONS preflight
  app.options("/api/chat", (req, res) => {
    res.status(200).end();
  });
  app.post("/api/chat", handleChat);

  // AI Chat route
  app.options("/api/ai-chat", (req, res) => {
    res.status(200).end();
  });
  app.post("/api/ai-chat", handleAzureChat);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  return app;
}
