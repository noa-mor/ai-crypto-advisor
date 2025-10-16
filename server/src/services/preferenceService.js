const preferenceRepository = require("../repositories/preferenceRepository");
const { log } = require("../utils/logger");

const getPreferencesByUser = async (userId) => {
  log(`Fetching preference for user: ${userId}`);

  return await preferenceRepository.getPreferencesByUser(userId);
};

const addPreference = async (preference) => {
  log(`Adding preference for user: ${preference.userId}`);

  const existing = await preferenceRepository.getPreferencesByUser(
    preference.userId
  );

  if (existing) {
    throw new Error("Preference already exists for this user");
  }

  await preferenceRepository.addPreference(preference);

  return await preferenceRepository.getPreferencesByUser(preference.userId);
};

module.exports = {
  getPreferencesByUser,
  addPreference,
};
