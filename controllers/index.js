const Regions     = require('../models/region');
const Destination = require('../models/destination');

exports.index_view_all = (req, res, next) => {
  console.time('Counter');
  Regions.find({})
  .select('_id name image countries')
  .populate({
    path: 'countries',
    model: 'Destination',
    select: '_id name cities',
    populate: {
      path: 'cities',
      model: 'City',
      select: '_id name'
    }
  })
  .then(allRegions => {
    console.timeEnd('Counter');
    res.render('index', {allRegions: allRegions, pageTitle: 'Travel Guides'})
  })
  .catch(err => {
    err.status = 404;
    err.message = 'Something went wrong.';
    next(err);
  });
}