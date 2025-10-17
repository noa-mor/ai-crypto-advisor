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
      required: true,
      trim: true,
      unique: [true, "Item id is required"],
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

module.exports = mongoose.model("Vote", voteSchema);
