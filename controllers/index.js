const Regions = require('../models/region');

exports.index_view_all = async (req, res, next) => {
  try {
    console.time('Counter');
    const allRegions = await Regions.find({})
    .select('_id name image countries')
    .populate({
      path: 'countries',
      model: 'Destination',
      select: '_id name cities',
      options: { sort: { name: 1 }, limit: 3 },
      populate: {
        path: 'cities',
        model: 'City',
        select: '_id name',
        options: { sort: { name: 1 }}
      }});
    console.timeEnd('Counter');
    res.render('index', { allRegions: allRegions, pageTitle: 'Travel Guides' });
  } catch(err) {
    err.status = 404;
    err.message = 'Something went wrong.';
    next(err);
  }
}