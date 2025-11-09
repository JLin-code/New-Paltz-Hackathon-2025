require("dotenv").config();

const express = require("express");

const app = express();
const PORT = process.env.PORT ?? 10000;

app.use(express.json());

//controllers
app.use("/", express.static("dist"));

//(need 4 params to be recognized as error handling middleware by express)
app.use((err, req, res, next) => {
  // log full stack when available, fallback to the error itself
  console.error(err && err.stack ? err.stack : err);

  res.status(err?.status || 500).send(err?.message || "Internal Server Error");
});

app.listen(PORT, () => {
  console.log("Server listening on http://localhost:" + PORT);
});
