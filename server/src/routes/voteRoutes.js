const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteController");
const Vote = require("../models/VoteModel");
const requireAuth = require("../middleware/requireAuth");
const validateModel = require("../middleware/validateModelMiddleware").default;

router.get("/", requireAuth, voteController.getVotesByUser);
router.post("/", requireAuth, validateModel(Vote), voteController.addVote);

module.exports = router;
