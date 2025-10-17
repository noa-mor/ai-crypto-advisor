const User = require("../models/UserModel");

const getAllUsers = async () => {
  return await User.find({}, { name: 1, email: 1, votes: 0, preference: 0 });
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (userData) => {
  return await User.create(userData);
};

const findByIdAndUpdate = async (userId, update) => {
  await User.findByIdAndUpdate(userId, update);
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  findByIdAndUpdate,
};
