const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.loginPage = (req, res, next) => {
  let message = req.flash('error');
  (message.length > 0) ? message = message[0] : message = null;
  console.log(message);
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

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', { pageTitle: 'Sign Up to Travel Sites' });
}

exports.postSignup = async (req, res, next) => {
  try {
    const email = req.body.email;
    let { pass1, pass2 } = req.body.password;
    const user = { email: email, password: pass1 };
    if(pass1 === pass2) {
      user.password = await bcrypt.hash(pass1, 12);
      await User.create(user);
      res.redirect('/');
    } else {
      res.redirect('/back');
    }
  } catch(err) {
    console.log(err);
    next(err);
  }
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
}