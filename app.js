const express           = require('express');
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
const path              = require('path');
const session           = require('express-session');
const mongoSession      = require('connect-mongodb-session')(session);
const csrf              = require('csurf');
const flashMessage      = require('connect-flash');
const User              = require('./models/user');
const app               = express();

//Configurations.

const MONGODB_URI       = process.env.DATABASEURL;
const storedSession     = new mongoSession({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const csrfProtection    = csrf();

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.set('debug', true); //Shows queries done by mongoose.
app.disable('x-powered-by'); //Blocks header for containing information about the server.
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'thesecretoflife', resave: false, saveUninitialized: false, store: storedSession }));
app.use(csrfProtection);
app.use(flashMessage());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  res.locals.userLoggedIn = (req.session.user) ? req.session.user.email : '';
  next();
});

app.use(async (req, res, next) => {
  try {
    if(!req.session.user) { return next(); }
    const loggedInUser = await User.findById(req.session.user._id);
    if(!loggedInUser) { return next(); }
    req.user = loggedInUser;
    next();
  } catch(err) {
    next(err);
  }
});

//Importing routes.

app.use(require('./routes/index'));
app.use('/destinations', require('./routes/destinations'));
app.use('/destinations', require('./routes/cities'));
app.use('/destinations', require('./routes/attractions'));
app.use('/destinations', require('./routes/eateries'));
app.use(require('./routes/auth'));

//Error handling.

app.use((req, res, next) => {
  const error = new Error('The requested page does not exist.');
  error.status = 404;
  next(error);
});

app.use((responseError, req, res, next) => {
  if(responseError.status !== 404 && responseError.status !== 500) { responseError.status = 500; }
  res.status = (responseError.status || 500);
  res.render(`partials/${res.status}`, { responseError: responseError });
});

app.listen(app.get('port'), () => console.log('Server working.'));

//When deploying to Heroku I must replace the database url to process.env.DATABASEURL and the package.json start script.
//Add food services to guides, decide where.