import serverless from "serverless-http";
import { createServer } from "../../server";

// Create the Express app
const app = createServer();

// Configure serverless wrapper with proper options
export const handler = serverless(app, {
  binary: false,
});
