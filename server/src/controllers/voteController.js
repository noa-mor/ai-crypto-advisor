const voteService = require("../services/voteService");
const { error } = require("../utils/logger");

const getVotesByUser = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const votes = await voteService.getVotesByUser(userId);

    res.status(200).json({ data: votes });
  } catch (err) {
    next(err);
  }
};

const addVote = async (req, res, next) => {
  const userId = req.user;

  try {
    const newVote = await voteService.addVote({
      ...req.body,
      userId,
    });

    res.status(201).json();
  } catch (err) {
    error(err);
    next(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getVotesByUser,
  addVote,
};
