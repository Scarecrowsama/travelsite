const express         = require('express');
const router          = express.Router();
const indexController = require('../controllers/index');

router.get('/', indexController.index_view_all);

module.exports = router;