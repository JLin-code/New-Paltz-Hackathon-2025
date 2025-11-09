const express = require("express");

const app = express();
const PORT = process.env.PORT ?? 10000;

app.use(express.json());

//controllers
app.use("/", express.static("dist"));

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;

  const error = {
    status,
    message: err.message || statusCodes.INTERNAL_SERVER_ERROR,
  };
  res.status(status).send(error);
});

app.listen(PORT, () => {
  console.log("Server listening on http://localhost:" + PORT);
});
