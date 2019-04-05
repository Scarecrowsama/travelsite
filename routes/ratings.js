const express = require('express');
const router = express.Router();
const ratingsController  = require('../controllers/ratings');
const isAuth = require('../middlewares/is-auth');

router.post('/ratings/:ratedId', isAuth, ratingsController.postRating);

module.exports = router;