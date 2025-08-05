import React, { useState } from "react";
import { recognizeSpeech, speakText } from "../lib/speechUtils";
import Avatar from "../components/Avatar";
import { db } from "../lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./AzureGPTBot.css";

// Environment variables for Azure OpenAI (configure in .env)
const AZURE_OPENAI_ENDPOINT = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
const AZURE_OPENAI_KEY = import.meta.env.VITE_AZURE_OPENAI_KEY;
const AZURE_DEPLOYMENT_ID =
  import.meta.env.VITE_AZURE_DEPLOYMENT_ID || "gpt-4.1-mini";

function AzureGPTBot() {
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const [typedText, setTypedText] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const getGPTReply = async (userInput: string): Promise<string> => {
    try {
      // Check if environment variables are configured
      if (!AZURE_OPENAI_ENDPOINT || !AZURE_OPENAI_KEY) {
        return "Azure OpenAI configuration is missing. Please check your environment variables.";
      }

      const response = await fetch(
        `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_DEPLOYMENT_ID}/chat/completions?api-version=2023-07-01-preview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": AZURE_OPENAI_KEY,
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful English conversation bot. Reply in a single, clear sentence to help users practice English.",
              },
              { role: "user", content: userInput },
            ],
            temperature: 0.7,
            max_tokens: 800,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Azure OpenAI API error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      console.log("Raw Azure Response:", data);
      return (
        data.choices?.[0]?.message?.content || "No response from bot."
      ).trim();
    } catch (err) {
      console.error("Azure OpenAI Error:", err);
      return "Sorry, I could not process that. Please try again.";
    }
  };

  const typeReply = (text: string) => {
    let i = 0;
    setReply("");
    setIsTyping(true);

    const interval = setInterval(() => {
      if (i < text.length) {
        setReply((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
  };

  const handleInput = async (inputText: string) => {
    try {
      setTranscript(inputText);
      setIsTyping(true);

      const botResponse = await getGPTReply(inputText);

      // Use typing animation
      typeReply(botResponse);

      // Speak the response
      await speakText(botResponse);

      // Save to Firebase
      if (db) {
        await addDoc(collection(db, "sessions"), {
          text: inputText,
          response: botResponse,
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error handling input:", error);
      setReply("Sorry, there was an error processing your request.");
      setIsTyping(false);
    }
  };

  const handleVoiceInput = async () => {
    try {
      setSpeaking(true);
      const spokenText = await recognizeSpeech();
      await handleInput(spokenText);
    } catch (error) {
      console.error("Voice input error:", error);
      alert("Voice recognition failed. Please try again or use text input.");
    } finally {
      setSpeaking(false);
    }
  };

  const handleTextSubmit = async () => {
    if (typedText.trim()) {
      setSpeaking(true);
      await handleInput(typedText);
      setTypedText("");
      setSpeaking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTextSubmit();
    }
  };

  return (
    <div className="bot-container">
      <h2 className="bot-title">🎤 Angilam – English Bot</h2>

      <div className="bot-avatar">
        <Avatar speaking={speaking || isTyping} />
      </div>

      <div className="bot-response-bubble">
        {(reply || isTyping) && (
          <div className="thought-bubble">
            {isTyping && !reply ? (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              <p>{reply}</p>
            )}
          </div>
        )}
      </div>

      <div className="bot-you-said">
        {transcript && (
          <p>
            <strong>You said:</strong> {transcript}
          </p>
        )}
      </div>

      <div className="chat-input-bar">
        <button
          onClick={handleVoiceInput}
          disabled={speaking || isTyping}
          title="Start voice input"
        >
          🎙
        </button>
        <input
          type="text"
          value={typedText}
          onChange={(e) => setTypedText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={speaking || isTyping}
        />
        <button
          onClick={handleTextSubmit}
          disabled={speaking || isTyping || !typedText.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default AzureGPTBot;
