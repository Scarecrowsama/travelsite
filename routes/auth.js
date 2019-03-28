const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.route('/login')
  .get(authController.loginPage)
  .post(authController.postLogin);

router.route('/signup')
  .get(authController.getSignup)
  .post(authController.postSignup);

module.exports = router;