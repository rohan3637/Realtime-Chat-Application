const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const generateJWTTokenAndSetCookie = require("../utils/generateToken.js");

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this username !!",
      });
    } else {
      const user = new User({ username: username, password: hashedPassword });
      generateJWTTokenAndSetCookie(user._id, res);
      await user.save();
      return res.status(201).json({
        success: true,
        message: "User created successfully !!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong !!",
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials !!",
      });
    } else {
      const passwordMatch = await bcrypt.compare(password, foundUser.password);
      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials !!",
        });
      }
      generateJWTTokenAndSetCookie(foundUser._id, res);
      return res.status(200).json({
        id: foundUser._id,
        username: foundUser.username,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong !!",
    });
  }
};

module.exports = { login, signup };
