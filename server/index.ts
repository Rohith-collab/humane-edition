import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleChat } from "./routes/openai";

export function createServer() {
  const app = express();

  // Enhanced CORS configuration
  app.use(
    cors({
      origin: true, // Allow all origins in development
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Cache-Control",
        "api-key",
      ],
    }),
  );

  // Middleware
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Add request logging middleware
  app.use((req, _res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    if (req.method === "POST" && req.path === "/api/chat") {
      console.log("Chat request body keys:", Object.keys(req.body || {}));
    }
    next();
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // AI Chat route
  app.post("/api/chat", handleChat);

  // Add a catch-all route for debugging
  app.all("/api/*", (req, res) => {
    console.log(`Unhandled API route: ${req.method} ${req.path}`);
    res.status(405).json({
      error: "Method not allowed or route not found",
      method: req.method,
      path: req.path,
      availableRoutes: {
        "GET /api/ping": "Server health check",
        "GET /api/demo": "Demo endpoint",
        "POST /api/chat": "AI Chat endpoint",
      },
    });
  });

  return app;
}
