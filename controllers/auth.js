const bcrypt                = require('bcryptjs');
const crypto                = require('crypto');
const nodemailer            = require('nodemailer');
const sendrigTransport      = require('nodemailer-sendgrid-transport');
const { validationResult }  = require('express-validator/check');
const User                  = require('../models/user');
const transporter           = nodemailer.createTransport(sendrigTransport({
  auth: {
    api_key: ''
  }
}));

exports.loginPage = (req, res, next) => {
  res.render('auth/login', { 
    pageTitle: 'Login to Travel Guides', 
    errorMessage: '' 
  });
}

exports.postLogin = async (req, res, next) => 
{
  try 
  {
    const errors = validationResult(req);

    if(!errors.isEmpty()) 
    {
      return res
      .status(422)
      .render('auth/login', 
      { 
        pageTitle: 'Login to Travel Guides', 
        errorMessage: errors.array()[0].msg 
      });
    }

    const user = await User.findOne({ email: req.body.user.email });
    createUserSession(user, req, res);
  } 
  catch(err) 
  {
    console.log(err);
    return next(err);
  }
}

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', { pageTitle: 'Sign Up to Travel Sites', errorMessage: '', userInput: { email: '' } });
}

exports.postSignup = async (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(422).render('auth/signup', { pageTitle: 'Sign Up to Travel Guides', errorMessage: errors.array()[0].msg, userInput: { email: req.body.user.email } });
  }

  try {
    const user = { email: req.body.user.email, password: req.body.password.pass1 };
    user.password = await bcrypt.hash(req.body.password.pass1, 12);
    await User.create(user);
    res.redirect('/');
    return transporter.sendMail({
      to: req.body.email,
      from: 'info@travelguides.com',
      subject: 'Registration Successful',
      html: '<h1>You are in bro!</h1>'
    });
  } catch(err) {
    console.log(err);
    return next(err);
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
      const userEmail = req.body.email;
      const foundUser = await User.findOne({ email: userEmail });
      if(!foundUser) {
        req.flash('error', 'Email not found.');
        return res.redirect('/reset-password');
      }
      foundUser.resetToken = token;
      foundUser.tokenExpiry = Date.now() + 3600000;
      await foundUser.save();
      res.redirect('/');
      return transporter.sendMail({
        to: userEmail,
        from: 'info@travelguides.com',
        subject: 'Password Reset',
        html: `<p>Password reset request: Clik <a href="http://localhost:3000/new-password/${token}">this link</a> to proceed.</p>`
      });
    });
  } catch(err) {
    console.log(err);
    return next(err);
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
    return next(err);
  }
}

exports.postNewPassword = async (req, res, next) => {
  try {
    const { newPassword1, newPassword2 } = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    const foundUser = await User.findOne({ resetToken: passwordToken, tokenExpiry: { $gt: Date.now() }, _id: userId });
    if(!foundUser || newPassword1 !== newPassword2) {
      return res.redirect('back');
    }
    const newPassword = await bcrypt.hash(newPassword1, 12);
    foundUser.password = newPassword;
    foundUser.resetToken = null;
    foundUser.tokenExpiry = null;
    await foundUser.save();
    return res.redirect('/login');
  } catch(err) {
    return next(err);
  }
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
}

// async function validateUser(email, password) {
//   try {
//     const user = await User.findOne({ email: email });
//     if(!user) { return { user: null, password: false }; }
//     const passwordConfirmed = await bcrypt.compare(password, user.password);
//     if(passwordConfirmed === false) { return { user: user, password: false }; }
//     return { user: user, password: passwordConfirmed };
//   } catch(err) {
//     console.log(err);
//     next(err);
//   }  
// }

function createUserSession(user, req, res) {
  req.session.isLoggedIn = true;
  req.session.user = user;
  req.session.save(err => {
    res.redirect('/');
  });
}
