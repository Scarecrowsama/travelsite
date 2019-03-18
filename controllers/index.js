const Regions     = require('../models/region');
const Destination = require('../models/destination');

exports.index_view_all = (req, res, next) => {
  Regions.find({})
  .select('_id name image countries')
  .populate('countries')
  .then(allRegions => {
    Destination.find({})
    .select('_id name flag countries rating')
    .populate('countries')
    .then(allDestinations => res.render('index', {allRegions: allRegions, allDestinations: allDestinations, pageTitle: 'Travel Guides'}))
  })
  .catch(err => {
    err.status = 404;
    err.message = 'Something went wrong.';
    next(err);
  });
}