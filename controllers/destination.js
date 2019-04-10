const Destination   = require('../models/destination');
const Regions       = require('../models/region');

exports.destinations_get_all = async (req, res, next) => {
  try {
    console.time('Query');
    //Assign to a variable alldestionations that meet the query criteria.
    const allDestinations = await Destination.find({})
    //Select only specific fields from eac collection.
    .select('_id name region cities rating')
    //Populate the cities field for each destination.
    .populate('region cities', 'name rating')
    //Sort the results by region ascendingly.
    .sort({'region': 'ascending'})
    //Render destinations page passing all data.
    console.timeEnd('Query');
    res.render('destinations/destinations', { allDestinations: allDestinations, pageTitle: 'See all our Destinations' });
  } catch(err) {
    err.status = 404;
    err.message = 'There are no destinations available.';
    next(err);
  }
}

exports.destinations_new = (req, res) => {
  Regions.find({})
  .then(allRegions => res.render('destinations/new', {allRegions: allRegions, pageTitle: ''}))
  .catch(err => res.redirect('/'));
}

exports.destinations_show = async (req, res, next) => {
  try {
    const foundDestination = await Destination.findById(req.params.id)
    .select('name flag region cities')
    .populate('cities');
    res.render('destinations/show', { foundDestination: foundDestination, pageTitle: `${foundDestination.name} - Travel Guides` });
  } catch(err) {
    err.status = 404;
    err.message = 'The requested destination does not exist.';
    next(err);
  }
}

exports.destinations_create = async (req, res, next) => {
  try {
    //Create new destination.
    const newDestination = await Destination.create(req.body.destination);
    //Find destination's region.
    const foundRegion = await Regions.findOne({name: req.body.region.name});
    //Assign a value to the destination's region and then save it.
    newDestination.region = foundRegion._id;
    newDestination.save();
    //Add the new destination's id to the region's countries array and then save it.
    foundRegion.countries.push(newDestination._id);
    foundRegion.save();
    res.redirect('/destinations');
  } catch(err) {
    next(err);
  }
}

exports.destinations_edit = (req, res) => {
  Destination.findById(req.params.id)
  .then(foundDestination => {
    res.render('destinations/edit', {foundDestination: foundDestination, pageTitle: `Edit ${foundDestination.name}`});
  })
  .catch(err => res.redirect('back'));
}

exports.destinations_update = (req, res) => {
  Destination.findByIdAndUpdate(req.params.id, req.body.destination)
  .then(updatedDestination => res.redirect('/destinations/' + updatedAlbum._id))
  .catch(err => res.redirect('/destinations'));
}

exports.destinations_delete = (req, res) => {
  Destination.findByIdAndRemove(req.params.id)
    .then(deletedDestination => res.redirect('/destinations'))
    .catch(err => res.redirect('/destinations'));
}