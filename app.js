const express           = require('express');
const bodyParser        = require('body-parser');
const methodOverride    = require('method-override');
const mongoose          = require('mongoose');
const path              = require('path');
const app               = express();

mongoose.connect('mongodb://localhost/travelguides', {useNewUrlParser: true});
mongoose.set('debug', true);
app.disable('x-powered-by'); //Blocks header for containing information about the server.
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes/index'));
app.use('/destinations', require('./routes/destinations'));
app.use(require('./routes/cities'));

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