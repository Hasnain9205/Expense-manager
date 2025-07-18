const express = require("express");
const {
  registerUser,
  loginUser,
  getUserInfo,
  verifyOTP,
  updateUserInfo,
  getSettings,
  updateSettings,
  getAllUsers,
  getUserDashboard,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const role = require("../middleware/roleMeddileware");

const router = express.Router();

router.post("/register", upload.single("profileImageUrl"), registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOTP);
router.get("/getUser", protect, getUserInfo);
router.get("/getUserDashboard", protect, getUserDashboard);
router.put(
  "/updateUser",
  protect,
  upload.single("profileImageUrl"),
  updateUserInfo
);
router.get("/settings", protect, getSettings);
router.put(
  "/settings",
  protect,
  upload.single("profileImageUrl"),
  updateSettings
);
router.get("/getAllUsers-admin", protect, role(["admin"]), getAllUsers);

module.exports = router;
