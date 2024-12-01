const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userControllers");

router.post("/register/user", userController.registerUser);
router.post("/login/user", userController.loginUser);
 
// Check cookies route
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
