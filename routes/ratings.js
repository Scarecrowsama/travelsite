const express = require('express');
const router = express.Router();
const ratingsController  = require('../controllers/ratings');

router.post('/ratings/:ratedId', ratingsController.postRating);

module.exports = router;