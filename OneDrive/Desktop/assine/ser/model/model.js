const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  friendID: {
    type: [String],
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("Model", schema);

module.exports = model;
