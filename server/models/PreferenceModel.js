const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assets: {
      type: [String],
      default: [],
    },
    investorType: {
      type: String,
      enum: ['HODLer', 'Day Trader', 'NFT Collector', 'Other'],
      default: 'Other',
    },
    contentTypes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Preference', preferenceSchema);