const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ['Market News', 'Charts', 'Social', 'Fun'],
    required: true,
  },
  itemTitle: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: Number,
    enum: [-1, 1],
    required: true,
  }
},
  { timestamps: true }
);

module.exports = mongoose.model("Vote", voteSchema);

