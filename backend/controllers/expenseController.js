const Expense = require("../models/Expense");

//Add Expense
exports.addExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const { title, amount, category, note, date } = req.body;
    //validation
    if (!title || !amount || !category || !note || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newExpense = new Expense({
      userId,
      title,
      amount,
      category,
      note,
      date,
    });
    await newExpense.save();
    res.status(200).json({
      success: true,
      message: "Expense added successfully",
      newExpense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error added Expense in server",
      error: error.message,
    });
  }
};

//Get all Expenses
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ message: "Get all Expense successfully", expense });
  } catch (error) {
    res.status(500).json({
      message: "Error get all expense in server",
      error: error.message,
    });
  }
};

//update expense
exports.updateExpense = async (req, res) => {
  const userId = req.user.id;
  const expenseId = req.params.id;
  try {
    const { title, amount, category, note, date } = req.body;
    const updateData = { title, amount, category, note, date };
    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: expenseId, userId },
      updateData,
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      updatedExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error update expense in server",
      error: error.message,
    });
  }
};

//delete income
exports.deleteExpense = async (req, res) => {
  const userId = req.user.id;
  const expenseId = req.params.id;
  try {
    const deleteExpense = await Expense.findOneAndDelete({
      _id: expenseId,
      userId: userId,
    });
    if (!deleteExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting expense in server",
      error: error.message,
    });
  }
};
