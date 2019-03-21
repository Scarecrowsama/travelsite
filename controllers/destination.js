const Destination   = require('../models/destination');
const Regions       = require('../models/region');

exports.destinations_get_all = async (req, res, next) => {

  try {
    const allDestinations = await Destination.find({})
    .select('_id name region cities rating')
    .populate('cities')
    .sort({'region': 'ascending'})
    res.render('destinations/destinations', {allDestinations: allDestinations, pageTitle: ''});
  } catch(err) {
    err.status = 404;
    err.message = 'There are no destinations available.';
    next(err);
  }
  // Destination.find({})
  // .select('_id name region cities rating')
  // .populate('cities')
  // .sort({'region': 'ascending'})
  // .then(allDestinations => {
  //   res.render('destinations/destinations', {allDestinations: allDestinations, pageTitle: ''});
  // })
  // .catch(err => {
  //   err.status = 404;
  //   err.message = 'There are no destinations available.';
  //   next(err);
  // });
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
    res.render('destinations/show', {foundDestination: foundDestination, pageTitle: ''});
  } catch(err) {
    err.status = 404;
    err.message = 'The requested destination does not exist.';
    next(err);
  }
  // Destination.findById(req.params.id)
  // .select('name flag region cities')
  // .populate('cities')
  // .then(foundDestination => {
  //   res.render('destinations/show', {foundDestination: foundDestination, pageTitle: ''});
  // })
  // .catch(err => {
  //   err.status = 404;
  //   err.message = 'The requested destination does not exist.';
  //   next(err);
  // });
}

exports.destinations_create = async (req, res) => {

  try {
    const newDestination = await Destination.create(req.body.destination);
    const foundRegion = await Regions.findOne({name: req.body.region.name});
    newDestination.region = foundRegion._id;
    newDestination.save();
    foundRegion.countries.push(newDestination._id);
    foundRegion.save();
    res.redirect('/destinations');
  } catch(err) {
    res.redirect('/');
  }
  // Destination.create(req.body.destination)
  // .then(newDestination => {
  //   Regions.findOne({name: req.body.region.name})
  //   .then(foundRegion => {
  //     newDestination.region = foundRegion._id;
  //     newDestination.save();
  //     foundRegion.countries.push(newDestination._id);
  //     foundRegion.save();
  //   });
  //   res.redirect('/destinations');
  // })
  // .catch(err => res.redirect('/'));
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