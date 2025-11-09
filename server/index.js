const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000;

// Simple JSON endpoint for quick dev verification
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Server running" });
});

app.listen(PORT, () => {
  console.log("Server listening on http://localhost:" + PORT);
});
