import express from "express";
import Anthropic from "@anthropic-ai/sdk";

const app = express();
const PORT = process.env.PORT || 8080;

// Debug: check API key
console.log("Anthropic key loaded:", !!process.env.ANTHROPIC_API_KEY);

// Initialize Claude
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Root route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Claude test route
app.get("/ask", async (req, res) => {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: "Hello from Railway",
        },
      ],
    });

    res.json(response);
  } catch (error) {
    console.error("Claude Error:", error);
    res.status(500).send("Claude API error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
