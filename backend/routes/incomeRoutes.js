const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addIncome } = require("../controllers/incomeController");

const router = express.Router();

router.post("/add", protect, addIncome);

module.exports = router;
