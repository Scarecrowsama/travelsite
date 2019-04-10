const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
// const { check } = require('express-validator/check');
const validator = require('../middlewares/validator');
const isAuth = require('../middlewares/is-auth');

router.route('/login')
  .get(authController.loginPage)
  .post(validator.checkEmail, authController.postLogin);

router.route('/signup')
  .get(authController.getSignup)
  .post([validator.checkEmail, validator.checkPassword], authController.postSignup);

router.route('/reset-password')
  .get(authController.getResetPassword)
  .post(authController.postResetPassword);

router.route('/new-password/:token')
  .get(authController.getNewPassword)
  .post(authController.postNewPassword);

router.post('/logout', isAuth, authController.postLogout);

module.exports = router;