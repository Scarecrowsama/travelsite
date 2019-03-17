const Destination   = require('../models/destination');
const Regions       = require('../models/regions');

exports.destinations_get_all = (req, res, next) => {
  Destination.find({})
  .select('_id name region cities rating')
  .sort({'region': 'ascending'})
  .then(allDestinations => {
    res.render('destinations/destinations', {allDestinations: allDestinations, pageTitle: ''});
  })
  .catch(err => {
    err.status = 404;
    err.message = 'There are no destinations available.';
    next(err);
  });
}

exports.destinations_new = (req, res) => {
  Regions.find({})
  .then(allRegions => res.render('destinations/new', {allRegions: allRegions, pageTitle: ''}))
  .catch(err => res.redirect('/'));
}

exports.destinations_show = (req, res, next) => {
  Destination.findById(req.params.id)
  .select('name flag region cities')
  .populate('cities')
  .then(foundDestination => {
    res.render('destinations/show', {foundDestination: foundDestination, pageTitle: ''});
  })
  .catch(err => {
    err.status = 404;
    err.message = 'The requested destination does not exist.';
    next(err);
  });
}

exports.destinations_create = (req, res) => {
  Destination.create(req.body.destination)
  .then(newDestination => {
    Regions.findOne({name: newDestination.region})
    .then(foundRegion => {
      foundRegion.cities.push(newDestination._id);
      foundRegion.save();
    });
    res.redirect('/destinations');
  })
  .catch(err => res.redirect('/'));
}

exports.destinations_edit = (req, res) => {
  Destination.findById(req.params.id)
  .then(foundDestination => {
    res.render('destinations/edit', {foundDestination: foundDestination, pageTitle: ''});
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