// index.js
import express from "express";

const app = express();
const PORT = process.env.PORT || 18789;

// Simple health check
app.get("/", (req, res) => {
  res.send("OpenClaw Gateway is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}`);
});
