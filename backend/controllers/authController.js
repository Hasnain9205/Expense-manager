const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateOTP = require("../utils/generateOTP");
const { validatePassword } = require("../utils/validtePassword");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Setting = require("../models/Setting");
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const mongoose = require("mongoose");

//generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
};

//Register user
exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const imageUrl = req.file ? req.file.filename : null;
  //validation check
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const passwordValidation = validatePassword(password);
  if (!passwordValidation) {
    return res.status(400).json({ message: passwordValidation.message });
  }
  try {
    const emailLower = email.toLowerCase();
    //check if email already exist
    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    //create user
    const user = await User.create({
      fullName,
      email: emailLower,
      password,
      role: "user",
      profileImageUrl: imageUrl,
    });
    const settings = await Setting.create({
      userId: user._id,
      theme: "light",
      language: "en",
      notification: true,
      currency: "USD",
    });
    res.status(201).json({
      success: true,
      id: user._id,
      user,
      settings,
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
  const passwordValidation = validatePassword(password);
  if (!passwordValidation) {
    return res.status(400).json({ message: passwordValidation.message });
  }
  try {
    const emailLower = email.toLowerCase();
    const user = await User.findOne({ email: emailLower });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { otp, hashedOTP } = await generateOTP();
    user.otp = hashedOTP;
    user.otpExpires = Date.now() + 5 * 60 * 1000; //validate otp for 5 minutes
    await user.save();
    await sendEmail(
      emailLower,
      "Your OTP for Expense manager login",
      `Your one-time password(OTP) is:${otp}\nIt is valid for 5 minutes.`
    );
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
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const emailLower = email.toLowerCase();
    const user = await User.findOne({ email: emailLower });
    if (!user || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const isValidOTP = await bcrypt.compare(otp, user.otp);
    if (!isValidOTP) {
      return res.status(400).json({ message: "Invalid OTP" });
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
    const user = await User.findById(id).select("-password -otp -otpExpires");
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

//update user info
exports.updateUserInfo = async (req, res) => {
  const id = req.user.id;
  const { fullName } = req.body;
  const imageUrl = req.file ? req.file.filename : null;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.fullName = fullName || user.fullName;
    user.profileImageUrl = imageUrl || user.profileImageUrl;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User info updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user info",
      error: error.message,
    });
  }
};

//user dashboard
exports.getUserDashboard = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.id);
  try {
    //total income
    const totalIncome = await Income.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    //total expense
    const totalExpense = await Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalIncomeAmount = totalIncome.length > 0 ? totalIncome[0].total : 0;
    const totalExpenseAmount =
      totalExpense.length > 0 ? totalExpense[0].total : 0;
    //Recent 5 incomes
    const recentIncomes = await Income.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);
    //Recent 5 expenses
    const recentExpenses = await Expense.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);
    res.status(200).json({
      success: true,
      message: "User dashboard get successfully",
      dashboard: {
        totalIncomeAmount,
        totalExpenseAmount,
        recentIncomes,
        recentExpenses,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting user dashboard",
      error: error.message,
    });
  }
};

//get settings
exports.getSettings = async (req, res) => {
  const userId = req.user.id;
  try {
    const settings = await Setting.findOne({ userId });
    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }
    res.status(200).json({
      success: true,
      message: "Settings get successfully",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting settings",
      error: error.message,
    });
  }
};

//update settings
exports.updateSettings = async (req, res) => {
  const userId = req.user.id;
  const { theme, language, timezone, notification, currency } = req.body;
  try {
    const settings = await Setting.findOneAndUpdate(
      { userId },
      { theme, language, timezone, notification, currency },
      { upsert: true, new: true }
    );
    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }
    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating settings",
      error: error.message,
    });
  }
};

//Admin get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -otp -otpExpires");
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error.message,
    });
  }
};
