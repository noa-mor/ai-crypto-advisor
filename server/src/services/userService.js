const userRepository = require("../repositories/userRepository");
const { log } = require("../utils/logger");

const getAllUsers = async () => {
  log("Fetching all users from DB");

  return await userRepository.getAllUsers();
};

const createUser = async (userData) => {
  log(`Creating new user: ${userData.name}`);

  return await userRepository.createUser(userData);
};

module.exports = {
  getAllUsers,
  createUser,
};
