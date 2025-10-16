const User = require("../models/UserModel");

const getAllUsers = async () => {
  return await User.find(
    {},
    { _id: 0, name: 1, email: 1, votes: 1, preference: 1 }
  );
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
