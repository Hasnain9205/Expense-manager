const Income = require("../models/Income");

//Add income
exports.addIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const { amount, category, description, date } = req.body;
    //validation
    if (!amount || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newIncome = new Income({
      userId,
      amount,
      category,
      description,
      date: new Date(date),
    });
    await newIncome.save();
    res
      .status(200)
      .json({ success: true, message: "Income added successfully", newIncome });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error added income in server",
      error: error.message,
    });
  }
};

//Get all income
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json({ message: "Get all income successfully", income });
  } catch (error) {
    res.status(500).json({
      message: "Error get all income in server",
      error: error.message,
    });
  }
};
