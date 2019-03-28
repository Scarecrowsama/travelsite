const express = require('express');
const router = express.Router();
const attractionController  = require('../controllers/attractions');

router.route('/:id/cities/:cityId/attractions/new')
  .get(attractionController.attractions_new)
  .post(attractionController.attractions_create);

module.exports = router;