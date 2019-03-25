const mongoose = require('mongoose');

const attraction = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: {type: Number, required: true }, //Use 0 for free and -1 for unknown.
  gallery: { 
    photos: [ String ], //Name like attraction-altText-altText... to split  the words and use them as a description or alt text.
    videos: [ String ],
    required: true 
  },
  location: {
    altitude: String,
    latitude: String,
    address: String
  },
  openingTimes: String,
  city: { 
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required:true }
  },
  rating: { type: mongoose.Schema.Types.ObjectId, ref: 'Rating' },
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }
}, {strict: true});

module.exports = mongoose.model('Attraction', attraction);
