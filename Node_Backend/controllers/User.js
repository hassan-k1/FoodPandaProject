const User = require("../Model/users");
const jwt = require("jsonwebtoken");
const OTP = require("../Model/otp");
const sendEmail = require("../utils/sendmail");
// Secret key used for signing the token
const secretKey = process.env.SECRET_KEY;
// Options for JWT token
const options = {
  expiresIn: "1w",
};
const signToken = (user) => {
  return jwt.sign({ user }, secretKey, options);
};

const signUp = async (req, res) => {
  try {
    const userSignUp = await User.create(req.body);
    return res.status(201).json({
      message: "User sign up successfully",
      data: userSignUp,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: err,
    });
  }
};

const SignIn = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const query = { email: email };
    const userExits = await User.findOne(query);
    const token = signToken(userExits);
    if (userExits) {
      return res.status(201).json({
        token,
        status: 201,
        message: "User sign In successfullyyyyyy",
      });
    } else {
      res.status(400).json({
        message: "Create signUp Before signIn ",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: err,
    });
  }
};
const googleSignUp = async (req, res) => {
  try {
    const userExits = await User.findOne({ email });
    const token = signToken(userExits);
    if (userExits) {
      return res.status(201).json({
        token,
        status: 201,
        message: "User sign In successfullyyyyyy",
      });
    } else {
      await User.create(req.body);
      res.status(400).json({
        message: "Create signUp Before signIn ",
      });
    }
  } catch (err) {
    console.log("not match");
    res.status(500).json({
      message: err.message,
      error: err,
    });
  }
};
const googleSignIn = async (req, res) => {
  try {
    const { email } = req.body;
    const userExits = await User.findOne({ email });
    const token = signToken(userExits);
    if (userExits) {
      return res.status(201).json({
        token,
        status: 201,
        message: "User sign In successfullyyyyyy",
      });
    } else {
      await User.create(req.body);
      const userExits = await User.findOne({ email });
      const token = signToken(userExits);
      return res.status(201).json({
        token,
        status: 201,
        message: "User sign In successfullyyyyyy",
      });
    }
  } catch (err) {
    console.log("not match");
    res.status(500).json({
      message: err.message,
      error: err,
    });
  }
};

const getUser = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    res.status(201).json({
      data: decoded,
    });
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

const emailSend = async (req, res) => {
  try {
    const exitsEmail = await User.find({ email: req.body.email });
    if (exitsEmail.length > 0) {
      const otpcode = Math.floor(Math.random() * 10000 + 1);
      const otpData = new OTP({
        email: req.body.email,
        code: otpcode,
        expiresIn: new Date().getTime() + 300 * 1000,
      });

      await otpData.save();
      const subject = "Welcome";
      const html = `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #D70F64;text-decoration:none;font-weight:600">FoodPanda</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing Food Panda. Use the following OTP to complete your Sign Up procedures. OTP is valid for 3 minutes</p>
      <h2 style="background: #D70F64;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otpData.code}</h2>
      <p style="font-size:0.9em;">Regards,<br />Food panda</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Your Brand Inc</p>
        <p>1600 Amphitheatre Parkway</p>
        <p>California</p>
      </div>
    </div>
  </div>

      `;
      await sendEmail(req.body.email, subject, html);
      return res.status(200).json({ message: "Email save Successfull" });
    } else {
      res.status(401).json({
        message: "Email not exits",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Email not exits",
    });
  }
};
const otpverify = async (req, res) => {
  try {
    const { code } = req.body;
    const query = { code: code };
    const exitsOtp = await OTP.find(query);
    if (exitsOtp.length > 0) {
      await OTP.findByIdAndUpdate(exitsOtp[0]._id, {
        VerifiedAt: true,
      });
      await OTP.findByIdAndDelete(exitsOtp[0]._id, {
        exitsOtp,
      });
      res.status(200).json({
        message: "this is confirm otp",
      });
    }
  } catch (error) {
    console.log("this is not otp", error);
  }
};

const changePassword = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    const Update = await User.findByIdAndUpdate(user._id, {
      password,
    });
    if (Update) {
      res.status(200).json({
        status: "success",
        data: user,
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "user not verified, please verify the otp.",
      });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

module.exports = {
  signUp,
  SignIn,
  emailSend,
  changePassword,
  otpverify,
  getUser,
  googleSignIn,
  googleSignUp,
};
