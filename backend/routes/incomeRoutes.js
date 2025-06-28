const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addIncome,
  getAllIncome,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomeController");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get-all-income", protect, getAllIncome);
router.put("/update-income/:id", protect, updateIncome);
router.delete("/delete-income/:id", protect, deleteIncome);

module.exports = router;
