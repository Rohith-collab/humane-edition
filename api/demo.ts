import { VercelRequest, VercelResponse } from "@vercel/node";
import { DemoResponse } from "../shared/api";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const response: DemoResponse = {
    message: "Hello from Vercel serverless demo endpoint",
  };

  res.status(200).json(response);
}
