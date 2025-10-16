const bcrypt = require("bcrypt");
const userRepository = require("../repositories/userRepository");
const { createToken } = require("../utils/token");
const { log } = require("../utils/logger");

const getAllUsers = async () => {
  log("Fetching all users from DB");

  return await userRepository.getAllUsers();
};

const createUser = async (userData) => {
  log(`Creating new user: ${userData.name}`);

  const salt = await bcrypt.genSalt(10);

  userData.password = await bcrypt.hash(userData.password, salt);

  return await userRepository.createUser(userData);
};

const loginUser = async (email, password) => {
  log(`Attempting login for email: ${email}`);

  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    throw new Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  const token = createToken(user._id);

  log(`Login successful for ${email}`);

  return { token };
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
};
