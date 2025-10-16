const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Market News", "Charts", "Social", "Fun"],
      required: [true, "Type is required"],
    },
    itemTitle: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Item title is required"],
    },
    value: {
      type: Number,
      enum: [-1, 1],
      required: [true, "Value is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vote", voteSchema);
