const preferenceService = require("../services/preferenceService");
const { error } = require("../utils/logger");

const getPreferencesByUser = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const preferences = await preferenceService.getPreferencesByUser(userId);

    if (preferences == null) {
      res.status(204).json();
    }

    res.status(200).json({ data: preferences });
  } catch (err) {
    next(err);
  }
};

const addPreference = async (req, res, next) => {
  const userId = req.user;

  try {
    const newPreference = await preferenceService.addPreference({
      ...req.body,
      userId,
    });

    res.status(201).json(newPreference);
  } catch (err) {
    if (err.message == "Preference already exists for this user") {
      error(`Preference already exists for this user: Email: ${userId}`);
      res.status(409).json({ error: err.message });
    } else {
      next(err);
    }
  }
};

module.exports = {
  getPreferencesByUser,
  addPreference,
};
