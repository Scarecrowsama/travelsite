const mongoose = require('mongoose');

const region = new mongoose.Schema({
  name: String,
  countries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination'
    }
  ]
});

module.exports = mongoose.model('Region', region);
