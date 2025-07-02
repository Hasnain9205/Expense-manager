const express = require("express");
const {
  registerUser,
  loginUser,
  getUserInfo,
  verifyOTP,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", upload.single("profileImageUrl"), registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOTP);
router.get("/getUser", protect, getUserInfo);

module.exports = router;
