const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "please provide your name"],
  },
  email: {
    type: String,
    require: [true, "please provide your email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    require: [true, "please provide your password"],
  },
  picture: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
