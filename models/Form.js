const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Form", formSchema);
