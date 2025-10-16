const userService = require("../services/userService");
const { error } = require("../utils/logger");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({ data: users });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body);

    res.status(201).json({ data: newUser });
  } catch (err) {
    if (err.code == 11000) {
      error(`Email already in use: ${Object.values(err.keyValue)[0]}`);
      res.status(409).json({
        error: "Email already in use",
      });
    } else {
      next(err);
    }
  }
};

module.exports = {
  getAllUsers,
  createUser,
};
