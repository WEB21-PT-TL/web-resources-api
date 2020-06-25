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

app.post("/api/login", (req, res) => {
  if (req.body.username !== process.env.USER_LOGIN) {
    return res
      .status(400)
      .send(
        "Username or password incorrect. Please message the channel for help."
      );
  }

  if (req.body.password !== process.env.USER_PASSWORD) {
    return res
      .status(400)
      .send(
        "Username or password incorrect. Please message the channel for help."
      );
  }

  res.status(200).send("Logged In");
});

app.listen(port, () => {
  console.log("Listening on " + port);
});
