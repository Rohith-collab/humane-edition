import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ApiTest() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    try {
      const result = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: "Hello, this is a test message",
            },
          ],
        }),
      });

      const data = await result.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testPing = async () => {
    setLoading(true);
    try {
      const result = await fetch("/api/ping");
      const data = await result.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">API Test Page</h1>

        <div className="space-x-4">
          <Button onClick={testPing} disabled={loading}>
            Test Ping API
          </Button>
          <Button onClick={testApi} disabled={loading}>
            Test Chat API
          </Button>
        </div>

        {loading && <p>Loading...</p>}

        <div className="bg-muted p-4 rounded-lg">
          <h2 className="font-semibold mb-2">API Response:</h2>
          <pre className="text-sm overflow-auto">{response}</pre>
        </div>
      </div>
    </div>
  );
}
