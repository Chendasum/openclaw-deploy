import express from "express";
import { Client } from "@notionhq/client";
import Anthropic from "@anthropic-ai/sdk";

const app = express();
const PORT = process.env.PORT || 18789;

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Health check
app.get("/", (req, res) => {
  res.send("OpenClaw Gateway is active!");
});

// Notion route
app.get("/notion", async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });
    res.json(response.results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching Notion data");
  }
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
    res.status(500).send("Error calling Anthropic API");
  }
});

app.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}`);
});
