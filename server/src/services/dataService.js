const { log } = require("../utils/logger");
const newsProvider = require("../providers/newsProvider");
const chartsProvider = require("../providers/chartsProvider");
const socialProvider = require("../providers/socialProvider");
const funProvider = require("../providers/funProvider");
const voteService = require("../services/voteService");

const providerPerType = {
  news: newsProvider,
  charts: chartsProvider,
  social: socialProvider,
  fun: funProvider,
};

const getData = async (user, type) => {
  log(`Fetching ${type} data from api`);

  if (!Object.keys(providerPerType).includes(type)) {
    throw new Error("Type must be one of: news, charts, social, fun");
  }

  const allData = await providerPerType[type](user);
  const filteredData = await filterData(allData, user, type);

  return filteredData;
};

const filterData = async (allData, user, type) => {
  if (!allData || !allData.results) {
    console.log(`[${type}] No data to filter`);
    return [];
  }

  console.log(`[${type}] Filtering ${allData.results.length} items for user: ${user.email}`);

  if (type === 'charts') {
    console.log(`[${type}] Charts type - cycling through all items regardless of votes`);
    const randomIndex = Math.floor(Math.random() * allData.results.length);
    const randomItem = allData.results[randomIndex];
    console.log(`[${type}] Returning random item:`, randomItem.id);
    return [randomItem];
  }

  var dataToReturn = [];

  for (let i = 0; i < allData.results.length; i++) {
    const item = allData.results[i];
    const vote = await voteService.getVoteByUserAndItemId(user._id, item.id);

    const hasVoted = Array.isArray(vote) && vote.length > 0;
    console.log(`[${type}] Item "${item.id}": voted=${hasVoted}`);

    if (hasVoted) {
      continue;
    }

    dataToReturn.push(item);

    if (dataToReturn.length === 1) {
      console.log(`[${type}] Returning first unvoted item:`, item.id);
      break;
    }
  }

  console.log(`[${type}] Filter result: ${dataToReturn.length} items`);
  return dataToReturn;
};

module.exports = {
  getData,
};
