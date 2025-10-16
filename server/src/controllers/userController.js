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

    res.status(201).json();
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

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);

    res.status(200).json(result);
  } catch (err) {
    if (
      err.message == "Incorrect email" ||
      err.message == "Incorrect password"
    ) {
      error(
        `Login failed - incorrect email or password: Email: ${req.body.email}, Password: ${req.body.password}`
      );
      res.status(400).json({ error: "incorrect email or password" });
    } else {
      next(err);
    }
  }
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
};
