const bcrypt            = require('bcryptjs');
const User              = require('../models/user');
const crypto            = require('crypto');
const nodemailer        = require('nodemailer');
const sendrigTransport  = require('nodemailer-sendgrid-transport');
const transporter       = nodemailer.createTransport(sendrigTransport({
  auth: {
    api_key: ''
  }
}));

exports.loginPage = (req, res, next) => {
  let message = req.flash('error');
  (message.length > 0) ? message = message[0] : message = null;
  res.render('auth/login', { pageTitle: 'Login to Travel Guides', errorMessage: message });
}

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body.user;
    const validation = await validateUser(email, password);
    if(validation.user !== null && validation.password === true) {
      createUserSession(validation.user, req, res);
    } else {
      req.flash('error', 'The username or password is not valid.');
      res.redirect('back');
    }
      
  } catch(err) {
    console.log(err);
    next(err);
  }
}

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  (message.length > 0) ? message = message[0] : message = null;
  res.render('auth/signup', { pageTitle: 'Sign Up to Travel Sites', errorMessage: message });
}

exports.postSignup = async (req, res, next) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if(userExist) {
      req.flash('error', 'Email already exists.');
      return res.redirect('/signup');
    }
    let { pass1, pass2 } = req.body.password;
    if(pass1 === pass2) {
      const user = { email: req.body.email, password: pass1 };
      user.password = await bcrypt.hash(pass1, 12);
      await User.create(user);
      res.redirect('/');
      return transporter.sendMail({
        to: req.body.email,
        from: 'info@travelguides.com',
        subject: 'Registration Successful',
        html: '<h1>You are in bro!</h1>'
      });
    } else {
      req.flash('error', 'Passwords do not match.');
      res.redirect('/signup');
    }
  } catch(err) {
    console.log(err);
    next(err);
  }
}

exports.getResetPassword = (req, res, next) => {
  let message = req.flash('error');
  (message.length > 0) ? message = message[0] : message = null;
  res.render('auth/reset', { pageTitle: 'Reset Password', errorMessage: message });
}

exports.postResetPassword = async (req, res, next) => {
  try {
    crypto.randomBytes(32, async (err, buffer) => {
      if(err) {
        return res.redirect('/reset-password');
      }
      const token = buffer.toString('hex');
      const foundUser = await User.findOne({ email: req.body.email });
      if(!foundUser) {
        req.flash('error', 'Email not found.');
        return res.redirect('/reset-password');
      }
      foundUser.resetToken = token;
      foundUser.tokenExpiry = Date.now() + 3600000;
      await foundUser.save();
      res.redirect('/');
      return transporter.sendMail({
        to: req.body.email,
        from: 'info@travelguides.com',
        subject: 'Password Reset',
        html: `<p>Password reset request: Clik <a href="http://localhost:3000/new-password/${token}">this link</a> to proceed.</p>`
      });
    });
  } catch(err) {
    console.log(err);
    next(err);
  }
}

exports.getNewPassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    const foundUser = await User.findOne({ resetToken: token, tokenExpiry: { $gt: Date.now() } });
    let message = req.flash('error');
    (message.length > 0) ? message = message[0] : message = null;
    res.render(`auth/newpass`, { pageTitle: 'New Password', errorMessage: message, userId: foundUser._id.toString(), passwordToken: token });
  } catch(err) {
    next(err);
  }
}

exports.postNewPassword = async (req, res, next) => {
  try {
    const { newPassword1, newPassword2 } = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    const foundUser = await User.findOne({ resetToken: passwordToken, tokenExpiry: { $gt: Date.now() }, _id: userId });
    console.log(foundUser);
    if(!foundUser || newPassword1 !== newPassword2) {
      return res.redirect('back');
    }
    const newPassword = await bcrypt.hash(newPassword1, 12);
    foundUser.password = newPassword;
    foundUser.resetToken = null;
    foundUser.tokenExpiry = null;
    foundUser.save();
    res.redirect('/login');
  } catch(err) {
    next(err);
  }
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
}

async function validateUser(email, password) {
  try {
    const user = await User.findOne({ email: email });
    if(user) {
      const passwordConfirmed = await bcrypt.compare(password, user.password);
      return { user: user, password: passwordConfirmed };
    } else {
      return { user: null, password: false };
    }
  } catch(err) {
    console.log(err);
    next(err);
  }  
}

function createUserSession(user, req, res) {
  req.session.isLoggedIn = true;
  req.session.user = user;
  return req.session.save(err => {
    res.redirect('/');
  });
}
