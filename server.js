// server.js
import express from "express";

const app = express();
const PORT = process.env.PORT || 18789;

app.get("/", (req, res) => {
  res.send("OpenClaw Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
