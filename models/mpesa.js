const mongoose = require('mongoose');

const Mpesa = new mongoose.Schema(
  {
    resultcode: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Mpesa', Mpesa);
