const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.route('/login')
  .get(authController.loginPage)
  .post(authController.postLogin);

router.route('/signup')
  .get(authController.getSignup)
  .post(authController.postSignup);

router.route('/reset-password')
  .get(authController.getResetPassword)
  .post(authController.postResetPassword);

router.route('/new-password/:token')
  .get(authController.getNewPassword)
  .post(authController.postNewPassword);

router.post('/logout', authController.postLogout);

module.exports = router;