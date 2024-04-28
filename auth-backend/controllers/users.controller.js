const User = require("../models/user.model.js");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "_id username");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong !!",
    });
  }
};

module.exports = getUsers;
