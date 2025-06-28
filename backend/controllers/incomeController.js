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

//update income
exports.updateIncome = async (req, res) => {
  const userId = req.user.id;
  const incomeId = req.params.id;
  try {
    const { amount, category, description, date } = req.body;
    const updateData = { amount, category, description, date };
    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }
    const updatedIncome = await Income.findOneAndUpdate(
      { _id: incomeId, userId },
      updateData,
      { new: true }
    );
    if (!updatedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json({
      success: true,
      message: "Income updated successfully",
      updatedIncome,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error update income in server",
      error: error.message,
    });
  }
};

//delete income
exports.deleteIncome = async (req, res) => {
  const userId = req.user.id;
  const incomeId = req.params.id;
  try {
    const deleteIncome = await Income.findOneAndDelete({
      _id: incomeId,
      userId: userId,
    });
    if (!deleteIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting income in server",
      error: error.message,
    });
  }
};
