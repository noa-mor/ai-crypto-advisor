const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const User = require("../models/UserModel");
const validateModel = require("../middleware/validateModelMiddleware").default;

router.get("/", userController.getAllUsers);
router.post("/", validateModel(User), userController.createUser);

module.exports = router;
