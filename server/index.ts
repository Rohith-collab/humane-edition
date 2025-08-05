import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleChat } from "./routes/openai";

export function createServer() {
  const app = express();

  // Debug middleware
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      console.log(`=== API REQUEST ===`);
      console.log(`${req.method} ${req.path}`);
      console.log('Headers:', req.headers);
      console.log('Body:', req.body);
      console.log('==================');
    }
    next();
  });

  // Middleware
  app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    credentials: true
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Handle preflight requests
  app.options("*", (_req, res) => {
    res.status(200).end();
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Test endpoint to verify routing
  app.get("/api/test", (_req, res) => {
    res.json({
      success: true,
      message: "API routing is working correctly!",
      timestamp: new Date().toISOString()
    });
  });

  // AI Chat route - handle both development and production
  app.post("/api/chat", handleChat);

  // Add a catch-all for unsupported methods
  app.all("/api/chat", (_req, res) => {
    res.status(405).json({
      success: false,
      error: "Method not allowed. Use POST for chat requests.",
      response: "I can only respond to POST requests. Please check your request method."
    });
  });

  return app;
}
