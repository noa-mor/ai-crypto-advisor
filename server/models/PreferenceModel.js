const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assets: {
      type: [String],
      enum: ['BTC', 'ETH'],
      required: true,
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length > 0;
        },
        message: 'At least one asset is required',
      },
    },
    investorType: {
      type: String,
      enum: ['HODLer', 'Day Trader', 'NFT Collector'],
      required: [true, 'Investor type is required'],
    },
    contentTypes: {
      type: [String],
      enum: ['Market News', 'Charts', 'Social', 'Fun'],
      required: true,
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length > 0;
        },
        message: 'At least one content type is required',
      },
    },
},
  { timestamps: true }
);

module.exports = mongoose.model('Preference', preferenceSchema);