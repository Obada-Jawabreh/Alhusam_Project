const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./../models/user");
const ProviderApplication = require("./../models/application");
require("dotenv").config();

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
      isDeleted: false,
      //   isActive: true,
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password, or account is inactive or deleted",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.status(200).json({ message: "User logged in successfully!" });
  } catch (error) {
    res.status(500).send("Error logging in: " + error.message);
  }
};
// ---------------------------------------------------------------------
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.cookie("userId", newUser._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res
      .status(201)
      .json({ message: "User registered successfully (First Method)!" });
  } catch (error) {
    res
      .status(500)
      .send("Error registering user (First Method): " + error.message);
  }
};
// ---------------------------------------------------------------------
exports.getUserById = async (req, res) => {
  const userId = req.user.id;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userData = await User.findById(userId).populate(
      "ProviderApplication"
    );

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = {
      ...userData.toObject(),
      ProviderApplication: userData.ProviderApplication || null,
    };

    res.status(200).json({ user, loggedIn: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user data: " + error.message });
  }
};