const Vote = require("../models/VoteModel");

const getVotesByUser = async (userId) => {
  return await Vote.find(
    { userId },
    { _id: 0, type: 1, itemTitle: 1, value: 1 }
  );
};

const getVotesByUserAndItemTitle = async (userId, itemTitle) => {
  return await Vote.find({ userId, itemTitle }, { _id: 0 });
};

const addVote = async (vote) => {
  return await Vote.create(vote);
};

module.exports = {
  getVotesByUserAndItemTitle,
  getVotesByUser,
  addVote,
};
