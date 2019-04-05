const express               = require('express');
const router                = express.Router();
const attractionController  = require('../controllers/attractions');
const isAuth                = require('../middlewares/is-auth');

router.route('/:id/cities/:cityId/attractions/new')
  .get(isAuth, attractionController.attractions_new)
  .post(isAuth, attractionController.attractions_create);

module.exports = router;