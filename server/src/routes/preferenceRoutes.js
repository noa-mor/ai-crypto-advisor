const express = require("express");
const router = express.Router();
const preferenceController = require("../controllers/preferenceController");
const Preference = require("../models/PreferenceModel");
const requireAuth = require("../middleware/requireAuth");
const validateModel = require("../middleware/validateModelMiddleware").default;

router.get("/", requireAuth, preferenceController.getPreferencesByUser);
router.post(
  "/",
  requireAuth,
  validateModel(Preference),
  preferenceController.addPreference
);

module.exports = router;
