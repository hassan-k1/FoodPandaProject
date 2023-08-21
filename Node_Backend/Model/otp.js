const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: String,
    code: String,
    expireIn: Number,
    VerifiedAt: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("otp", otpSchema, "otp");
