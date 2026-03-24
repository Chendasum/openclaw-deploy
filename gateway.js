// gateway.js
import express from "express";

const app = express();
const PORT = process.env.PORT || 18789;

app.get("/", (req, res) => {
  res.send("OpenClaw Gateway is active!");
});

app.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}`);
});
