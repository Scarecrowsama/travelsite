const express                 = require('express');
const router                  = express.Router();
const destinationsController  = require('../controllers/destination');
const isAuth                  = require('../middlewares/is-auth');

router.route('/')
  .get(destinationsController.destinations_get_all)
  .post(isAuth, destinationsController.destinations_create);

router.get('/new', isAuth, destinationsController.destinations_new);

router.route('/:id')
  .get(destinationsController.destinations_show)
  .put(isAuth, destinationsController.destinations_update) 
  .delete(isAuth, destinationsController.destinations_delete);

router.get('/:id/edit', isAuth, destinationsController.destinations_edit);

module.exports = router;