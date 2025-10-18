const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const preferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      autopopulate: true,
    },
    assets: {
      type: [String],
      enum: ["BTC", "ETH", "SOL", "DOGE", "XRP", "ADA", "DOT", "MATIC"],
      required: true,
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length > 0;
        },
        message: "At least one asset is required",
      },
    },
    investorType: {
      type: String,
      enum: ["HODLer", "Day Trader", "NFT Collector"],
      required: [true, "Investor type is required"],
    },
    contentTypes: {
      type: [String],
      enum: ["news", "charts", "social", "fun"],
      required: true,
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length > 0;
        },
        message: "At least one content type is required",
      },
    },
  },
  { timestamps: true }
);
preferenceSchema.plugin(autopopulate);

module.exports = mongoose.model("Preference", preferenceSchema);
