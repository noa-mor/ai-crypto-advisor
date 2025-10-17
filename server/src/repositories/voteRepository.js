const Vote = require("../models/VoteModel");
const userRepository = require("./userRepository");

const getVotesByUser = async (userId) => {
  return await Vote.find(
    { userId },
    { userId: 0, type: 1, itemId: 1, itemTitle: 1, value: 1 }
  );
};

const getVotesByUserAndItemId = async (userId, itemId) => {
  return await Vote.find({ userId, itemId }, { _id: 0 });
};

const addVote = async (vote) => {
  const newVote = await Vote.create(vote);

  await userRepository.findByIdAndUpdate(vote.userId, {
    $push: { votes: newVote._id },
  });

  return newVote;
};

module.exports = {
  getVotesByUserAndItemId,
  getVotesByUser,
  addVote,
};
