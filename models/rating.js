const mongoose = require('mongoose');

const rating = new mongoose.Schema({
  reference : { type: mongoose.Schema.Types.ObjectId, required: true },
  voter: { type: mongoose.Schema.Types.ObjectId, required: true },
  stars: { 
    one: { type: Number, default: 0 },
    two: { type: Number, default: 0 },
    three: { type: Number, default: 0 },
    four: { type: Number, default: 0 },
    five: { type: Number, default: 0 }
  },
  totalVotes: { type: Number, default: 0, required: true },
  average: { type: Number, default: 0, required: true },
});

module.exports = mongoose.model('Rating', rating);

//Can mongoose duplicate id's on different collections? If so, what to do.