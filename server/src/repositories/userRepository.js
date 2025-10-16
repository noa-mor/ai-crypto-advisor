const User = require("../models/UserModel");

const getAllUsers = async () => {
  return await User.find();
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (userData) => {
  return await User.create(userData);
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
};
