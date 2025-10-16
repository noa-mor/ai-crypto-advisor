const voteRepository = require("../repositories/voteRepository");
const { log } = require("../utils/logger");

const getVotesByUser = async (userId) => {
  log(`Fetching votes for user: ${userId}`);

  return await voteRepository.getVotesByUser(userId);
};

const addVote = async (vote) => {
  log(`Adding vote for user: ${vote.userId}`);

  const existing = await voteRepository.getVotesByUserAndItemTitle(
    vote.userId,
    vote.itemTitle
  );

  if (Array.isArray(existing) && existing.length) {
    throw new Error("Vote already exists for this item");
  }

  return await voteRepository.addVote(vote);
};

module.exports = {
  getVotesByUser,
  addVote,
};
