const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const voteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      autopopulate: true,
    },
    type: {
      type: String,
      enum: ["news", "charts", "social", "fun"],
      required: [true, "Type is required"],
    },
    itemId: {
      type: String,
      required: [true, "Item id is required"],
      trim: true,
    },
    itemTitle: {
      type: String,
      required: [true, "Item title is required"],
      trim: true,
    },
    value: {
      type: Number,
      enum: [-1, 1],
      required: [true, "Value is required"],
    },
  },
  { timestamps: true }
);
voteSchema.plugin(autopopulate);
voteSchema.index({ userId: 1, itemId: 1 }, { unique: true });

module.exports = mongoose.model("Vote", voteSchema);
