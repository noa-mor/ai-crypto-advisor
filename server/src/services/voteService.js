const voteRepository = require("../repositories/voteRepository");
const { log } = require("../utils/logger");

const getVotesByUser = async (userId) => {
  log(`Fetching votes for user: ${userId}`);

  return await voteRepository.getVotesByUser(userId);
};

const getVoteByUserAndItemId = async (userId, itemId) => {
  log(`Fetching votes for user: ${userId} and itemId: ${itemId}`);

  return await voteRepository.getVotesByUserAndItemId(userId, itemId);
};

const addVote = async (vote) => {
  log(`Adding vote for user: ${vote.userId}`);

  const existing = await voteRepository.getVotesByUserAndItemId(
    vote.userId,
    vote.itemId
  );

  if (Array.isArray(existing) && existing.length) {
    throw new Error("Vote already exists for this item");
  }

  return await voteRepository.addVote(vote);
};

module.exports = {
  getVoteByUserAndItemId,
  getVotesByUser,
  addVote,
};
