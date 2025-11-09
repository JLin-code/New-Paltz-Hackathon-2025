require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const corsOptions = {
  origin: "https://new-paltz-hackathon-2025.onrender.com",
};
const app = express();
const PORT = process.env.PORT ?? 10000;

// Import routes
const hallRoutes = require("./routes/hallRoutes");
const machineRoutes = require("./routes/machineRoutes");

// Middleware
app.use(express.json());

app.use(cors(corsOptions));

// API Routes
app.use("/api/halls", hallRoutes);
app.use("/api/machines", machineRoutes);

// Serve static files (Vue.js app)
app.use("/", express.static(path.join(__dirname, "../client/dist")));

// Catch-all route for Vue Router (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

//(need 4 params to be recognized as error handling middleware by express)
app.use((err, req, res, next) => {
  // log full stack when available, fallback to the error itself
  console.error(err && err.stack ? err.stack : err);

  res.status(err?.status || 500).send(err?.message || "Internal Server Error");
});

app.listen(PORT, () => {
  console.log("Server listening on http://localhost:" + PORT);
});
