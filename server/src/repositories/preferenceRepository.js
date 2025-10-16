const Preference = require("../models/PreferenceModel");

const getPreferencesByUser = async (userId) => {
  return await Preference.findOne(
    { userId },
    { _id: 0, assets: 1, investorType: 1, contentTypes: 1 }
  );
};

const addPreference = async (preference) => {
  return await Preference.create(preference);
};

module.exports = {
  getPreferencesByUser,
  addPreference,
};
