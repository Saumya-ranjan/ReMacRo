const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: String,
  password: String,
  user_type: String,
});

module.exports = mongoose.model("user", User);
