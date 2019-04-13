const bcrypt = require('bcryptjs');
const { check } = require('express-validator/check');
const User = require('../models/user');
const MINIMUM_PASSWORD_LENGTH = 6;

exports.checkEmail = check('user[email]')
  .isEmail()
  .withMessage('Email is not valid.')
  .normalizeEmail();

exports.checkPasswordLength = check('password[pass1]')
  .isLength({ min: MINIMUM_PASSWORD_LENGTH })
  .withMessage('Password must be at least 6 characters long.')
  .trim();

exports.checkPasswordMatch = check('password[pass2]')
  .custom((value, { req }) => {
    if(value !== req.body.password.pass1) {
      throw new Error('Password do not match.');
    }
    return true;
});

exports.verifyIfEmailExistsInDatabase = check('user[email]')
  .custom(async (value, { req }) => {
    try {
      const emailExists = await User.findOne({ email: value });
      if(emailExists) {
        return Promise.reject('Email already exists, please log-in or use a different email account.');
      }
      return true;
    } catch(err) {
      throw new Error('Something went wrong');
    }
});

exports.validateEmailAndPassword = check('user')
  .custom(async (value, { req }) => {
    try {
      const foundUserWithEmail = await User.findOne({ email: value.email });
      if(!foundUserWithEmail) {
        return Promise.reject('Email does not exist, please enter a valid one.');
      }
      const passwordVerification = await bcrypt.compare(value.password, foundUserWithEmail.password);
      if(passwordVerification === false) { 
        return Promise.reject('Password does not match.'); 
      }
      return true;
    } catch(err) {
      throw new Error('Something went wrong.');
    }
});