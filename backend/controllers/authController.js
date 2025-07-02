const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateOTP = require("../utils/generateOTP");

//generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//Register user
exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const imageUrl = req.file ? req.file.filename : null;
  //validation check
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    //check if email already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    //create user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl: imageUrl,
    });
    res.status(201).json({
      success: true,
      id: user._id,
      user,
      token: generateToken(user._id),
      message: "User create successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user ",
      error: error.message,
    });
  }
};

//Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();
    console.log(`OTP sent to ${email}: ${otp}`);
    res.status(200).json({
      success: true,
      id: user._id,
      user,
      message: "User login successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error login user",
      error: error.message,
    });
  }
};

//verify OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "OTP verification failed",
      error: error.message,
    });
  }
};

// user info
exports.getUserInfo = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User info get successfully", user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error to get user info",
      error: error.message,
    });
  }
};
