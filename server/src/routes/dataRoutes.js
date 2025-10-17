const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const dataController = require("../controllers/dataController");

router.get("/:type", requireAuth, dataController.getData);

module.exports = router;
