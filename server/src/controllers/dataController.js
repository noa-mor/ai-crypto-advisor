const dataService = require("../services/dataService");
const { error } = require("../utils/logger");

const getData = async (req, res, next) => {
  try {
    const data = await dataService.getData(req.user, req.params.type);

    res.status(200).json({ data });
  } catch (err) {
    next(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getData,
};
