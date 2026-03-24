import express from "express";
import Anthropic from "@anthropic-ai/sdk";

const app = express();
const PORT = process.env.PORT || 8080;

// Debug: check if key exists
console.log("Anthropic key loaded:", !!process.env.ANTHROPIC_API_KEY);

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Health check
app.get("/", (req, res) => {
  res.send("Server is running on Railway 🚀");
});

// Claude test route
app.get("/anthropic", async (req, res) => {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307", // ✅ safe model
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: "Hello Claude!",
        },
      ],
    });

    res.json(response);
  } catch (error) {
    console.error("Anthropic Error:", error);
    res.status(500).send("Anthropic API error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}`);
});
