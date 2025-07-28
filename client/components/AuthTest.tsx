import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AuthTest = () => {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password123");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register, currentUser, logout } = useAuth();

  const testLogin = async () => {
    setLoading(true);
    setStatus("Testing login...");
    try {
      await login(email, password);
      setStatus("✅ Login successful!");
    } catch (error: any) {
      setStatus(`❌ Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testRegister = async () => {
    setLoading(true);
    setStatus("Testing registration...");
    try {
      await register(email, password, "Test User");
      setStatus("✅ Registration successful!");
    } catch (error: any) {
      setStatus(`❌ Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogout = async () => {
    setLoading(true);
    setStatus("Testing logout...");
    try {
      await logout();
      setStatus("✅ Logout successful!");
    } catch (error: any) {
      setStatus(`❌ Logout failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Firebase Auth Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentUser ? (
          <div className="space-y-4">
            <p className="text-sm text-green-600">
              ✅ Logged in as: {currentUser.email}
            </p>
            <Button onClick={testLogout} disabled={loading} className="w-full">
              Test Logout
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex space-x-2">
              <Button onClick={testLogin} disabled={loading} className="flex-1">
                Test Login
              </Button>
              <Button
                onClick={testRegister}
                disabled={loading}
                className="flex-1"
                variant="outline"
              >
                Test Register
              </Button>
            </div>
          </div>
        )}

        {status && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">{status}</p>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <p>
            Firebase Status: {navigator.onLine ? "🟢 Online" : "🔴 Offline"}
          </p>
          <p>
            Auth State: {currentUser ? "Authenticated" : "Not authenticated"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
