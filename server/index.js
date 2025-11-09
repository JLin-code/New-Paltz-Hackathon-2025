require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const corsOptions = {
  origin: "https://new-paltz-hackathon-2025.onrender.com",
};
const app = express();
const PORT = process.env.PORT ?? 10000;

const hallController = require("./controllers/hallController");
const machineController = require("./controllers/machineController");

// Middleware
app.use(express.json());

app.use(cors(corsOptions));

// controllers
app
  .use("/", express.static(path.join(__dirname, "../client/dist")))
  .use("/api/halls", hallController)
  .use("/api/machines", machineController)
  .get("*", (req, res) => {
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
