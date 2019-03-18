const mongoose = require('mongoose');

const region = new mongoose.Schema({
  name: String,
  image: String,
  countries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination'
    }
  ]
});

module.exports = mongoose.model('Region', region);
