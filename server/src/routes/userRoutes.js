const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const User = require("../models/UserModel");
const requireAuth = require("../middleware/requireAuth");
const validateModel = require("../middleware/validateModelMiddleware").default;

router.get("/", requireAuth, userController.getAllUsers);
router.post("/register", validateModel(User), userController.createUser);
router.post("/login", userController.loginUser);

module.exports = router;
