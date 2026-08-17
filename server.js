const express = require("express");
const helmet = require("helmet");
const app = express();
const port = process.env.PORT || 8080;

app.use(helmet());

app.get("/", (req, res) => {
  res.send("Harness Demo Lab is running.");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
