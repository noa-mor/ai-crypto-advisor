const { log } = require("../utils/logger");
const newsProvider = require("../providers/newsProvider");
const voteService = require("../services/voteService");

const providerPerType = {
  news: newsProvider,
  charts: null,
  social: null,
  fun: null,
};

const getData = async (user, type) => {
  log("Fetching data from api");

  if (!Object.keys(providerPerType).includes(type)) {
    throw new Error("Type must be one of: news, charts, social, fun");
  }

  const allData = await providerPerType[type](user);
  const filteredData = await filterData(allData, user);

  return filteredData;
};

const filterData = async (allData, user) => {
  var dataToReturn = [];

  for (let i = 0; i < allData.results.length; i++) {
    const item = allData.results[i];
    const vote = await voteService.getVoteByUserAndItemId(user._id, item.id);

    if (Array.isArray(vote) && vote.length) {
      continue;
    }

    dataToReturn.push(item);
  }

  return dataToReturn;
};

module.exports = {
  getData,
};
