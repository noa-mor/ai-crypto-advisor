const Preference = require("../models/PreferenceModel");
const userRepository = require("./userRepository");

const getPreferencesByUser = async (userId) => {
  return await Preference.findOne(
    { userId },
    { userId: 0, assets: 1, investorType: 1, contentTypes: 1 }
  );
};

const addPreference = async (preference) => {
  await Preference.create(preference);

  const newPreference = await getPreferencesByUser(preference.userId);

  await userRepository.findByIdAndUpdate(preference.userId, {
    preference: newPreference._id,
  });

  return newPreference;
};

module.exports = {
  getPreferencesByUser,
  addPreference,
};
