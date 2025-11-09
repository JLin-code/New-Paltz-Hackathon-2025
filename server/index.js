const express = require("express");

const app = express();
const PORT = process.env.PORT || process.argv[2] || 3000;

// Simple JSON endpoint for quick dev verification
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Server running" });
});

// Start server
const startServer = async () => {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  });
};

startServer();
