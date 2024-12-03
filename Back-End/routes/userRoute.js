const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userControllers");
const auth = require('./../middleware/authMiddleware')

router.post("/register/user", userController.registerUser);
router.post("/login/user", userController.loginUser);
router.get("/get", auth, userController.getUserById);

// Check cookies route
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
 