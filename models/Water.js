const mongoose = require('mongoose');

const waterSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    totalLitres: {
      type: Number,
      required: true,
    },
    mpesaMessage: {
      type: String,
      required: true,
    },
    isTapInGoodCondition: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WaterFromIoT', waterSchema);
