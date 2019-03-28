const express           = require('express');
const bodyParser        = require('body-parser');
const methodOverride    = require('method-override');
const mongoose          = require('mongoose');
const path              = require('path');
const app               = express();
const session           = require('express-session');
const mongoSession      = require('connect-mongodb-session')(session);

const MONGODB_URI       = 'mongodb://localhost/travelguides';
const storedSession     = new mongoSession({
  uri: MONGODB_URI,
  collection: 'sessions'
});

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
mongoose.set('debug', true); //Shows queries done by mongoose.
app.disable('x-powered-by'); //Blocks header for containing information about the server.
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'thesecretoflife', resave: false, saveUninitialized: false, store: storedSession }));

app.use(require('./routes/index'));
app.use('/destinations', require('./routes/destinations'));
app.use('/destinations', require('./routes/cities'));
app.use('/destinations', require('./routes/attractions'));
app.use(require('./routes/auth'));

app.use((req, res, next) => {
  const error = new Error('The requested page does not exist.');
  error.status = 404;
  next(error);
});

app.use((responseError, req, res, next) => {
  res.status = (responseError.status || 500);
  res.render('partials/' + res.status, {responseError: responseError});
});

app.listen(app.get('port'), () => console.log('Server working.'));