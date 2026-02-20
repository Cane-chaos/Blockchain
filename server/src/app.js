require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Web3 Course Backend Running" });
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

async function start() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
}

start();