const express = require("express");
const router = express.Router();
const {
  signUp,
  SignIn,
  emailSend,
  changePassword,
  otpverify,
  getUser,
} = require("../controllers/User");

router.post("/signUp", signUp);
router.post("/SignIn", SignIn);
router.get("/getUser", getUser);
router.post("/email-send", emailSend);
router.post("/otp-send", otpverify);
router.post("/change-password", changePassword);

module.exports = router;
