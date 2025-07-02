const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addExpense,
  getAllExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get-all-expense", protect, getAllExpense);
router.put("/update-expense/:id", protect, updateExpense);
router.delete("/delete-expense/:id", protect, deleteExpense);

module.exports = router;
