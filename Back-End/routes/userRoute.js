const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userControllers");
const auth = require("../middleware/authMiddleware");
const ProviderApplication = require('../models/providerApplication');
 const multer = require('multer');
const path = require('path');
const { getUserProfile, updateUserProfile } = require("../controllers/userprofile");


router.post("/register/user", userController.registerUser);
router.post("/login/user", userController.loginUser);

// Check cookies route
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/provider_applications/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Only images are allowed!');
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});


router.get("/userprofile", auth, getUserProfile);

// Update user profile
router.put("/userprofile", auth, updateUserProfile);

router.post('/providerApplication',auth,async (req, res) => {
  const userId = req.user.id; // Assuming middleware populates req.user
console.log("this is value of userId i wish this is not null ",userId);
  const {
    fullName,
    phoneNumber,
    email,
    address,
    productType,
    skillsDescription,
    productImages,
    socialMediaLinks
  } = req.body;

  try {
    const newApplication = new ProviderApplication({
      fullName,
      phoneNumber,
      email,
      address,
      productType,
      skillsDescription,
      productImages,
      socialMediaLinks,
      userId

    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully', newApplication });
  } catch (error) {
    console.error('Submission error:', error); // Add error logging
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
