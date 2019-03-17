const Regions     = require('../models/regions');
const Destination = require('../models/destination');

exports.index_view_all = (req, res, next) => {
  Regions.find({})
  .select('_id name image cities')
  .populate('cities')
  .then(allRegions => res.render('index', {allRegions: allRegions, pageTitle: 'Travel Guides'}))
  .catch(err => {
    err.status = 404;
    err.message = 'Something went wrong.';
    next(err);
  });
}