const mongoose = require('mongoose');

const city = new mongoose.Schema({
  name: String,
  creationDate: { type: Date, default: Date.now },
  country: { id: { type: mongoose.Schema.Types.ObjectId, name: 'Destination' }, name: String },
  attractions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attraction' }],
  eateries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Eatery' }],
  itineraries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' }],
  rating: { 
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Rating' },
    totalVotes: { type: Number, default: 0 }, average: { type: Number, default: 0 }
  }
}, {strict: true});

module.exports = mongoose.model('City', city);