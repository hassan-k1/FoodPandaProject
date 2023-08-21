const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Phone: {
    type: Number,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Products",
    },
  ],
  total: {
    type: Number,
    default: "",
  },
});

module.exports = mongoose.model("order", userSchema);
