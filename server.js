import express from "express";
import Anthropic from "@anthropic-ai/sdk";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Debug
console.log("Anthropic key loaded:", !!process.env.ANTHROPIC_API_KEY);

// Claude setup
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Health check
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Test Claude
app.get("/ask", async (req, res) => {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 100,
      messages: [{ role: "user", content: "Hello from Railway" }],
    });

    res.json(response);
  } catch (error) {
    console.error("Claude Error:", error);
    res.status(500).send("Claude API error");
  }
});

// 🔥 TELEGRAM WEBHOOK
app.post("/webhook", async (req, res) => {
  try {
    const message = req.body.message?.text;
    const chatId = req.body.message?.chat?.id;

    if (!message) return res.sendStatus(200);

    console.log("User:", message);

    // Send to Claude
    const aiResponse = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 200,
      messages: [{ role: "user", content: message }],
    });

    const reply = aiResponse.content[0].text;

    // Send back to Telegram
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: reply,
      }),
    });

    res.sendStatus(200);
  } catch (error) {
    console.error("Webhook error:", error);
    res.sendStatus(500);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
