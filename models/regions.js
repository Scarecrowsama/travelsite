const mongoose = require('mongoose');

const regions = new mongoose.Schema({
  name: String,
  image: String,
  cities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination'
    }
  ]
});

module.exports = mongoose.model('Regions', regions);
