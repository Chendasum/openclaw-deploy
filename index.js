import express from "express";
import Anthropic from "@anthropic-ai/sdk";

const app = express();
const PORT = process.env.PORT || 18789;

// Initialize Anthropic client with Railway secret
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Health check
app.get("/", (req, res) => {
  res.send("OpenClaw Gateway is running!");
});

// Anthropic test route
app.get("/anthropic", async (req, res) => {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 100,
      messages: [{ role: "user", content: "Hello Claude!" }],
    });
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Anthropic API error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}`);
});
