// gateway.js
import express from "express";
import { Client } from "@notionhq/client";

const app = express();
const PORT = process.env.PORT || 18789;

// Initialize Notion client with Railway secret
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Health check
app.get("/", (req, res) => {
  res.send("OpenClaw Gateway is active!");
});

// Example route: fetch items from a Notion database
app.get("/notion", async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID
    });
    res.json(response.results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching Notion data");
  }
});

app.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}`);
});
