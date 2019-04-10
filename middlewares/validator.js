const { check } = require('express-validator/check');

exports.checkEmail = check('email').isEmail().withMessage('Email is not valid.');

exports.checkPassword = check('password[pass1]').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.');