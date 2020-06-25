const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Form = require("./models/Form");

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("Db Connected");
  }
);

const port = process.env.PORT || 5000;

app.get("/api/submissions", async (req, res) => {
  console.log("Here");
  const submissions = await Form.find();
  if (!submissions) {
    res.status(200).send("There are submissions.");
  }

  res.status(200).send(submissions);
});

app.post("/api/submissions", async (req, res) => {
  const form = new Form({
    email: req.body.email,
    reason: req.body.reason,
    message: req.body.message,
  });

  try {
    const savedForm = await form.save();
    res.status(200).send(savedForm);
  } catch (err) {
    res.status(400).send("Unable to submit form.");
  }
});

app.listen(port, () => {
  console.log("Listening on " + port);
});
