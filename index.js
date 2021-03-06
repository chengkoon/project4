require('dotenv').config({ silent: true });
var express = require('express');
var session = require('express-session');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var isAdminLoggedIn = require('./middleware/isAdminLoggedIn');
var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
// console.log(process.env.SESSION_SECRET);
/*
 * Include the flash module by calling it within app.use().
 * IMPORTANT: This MUST go after the session module
 */
app.use(flash());
app.use(express.static('public'));
// initialize the passport configuration and session as middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

app.get('/', function(req, res) {
  res.render('auth/login');
});

app.use('/auth', require('./controllers/auth'));


app.get('/home', isLoggedIn, function(req, res) {
  // console.log("HEYYYYYYYYYY", req.user.admin)
  res.render('main');
});

app.use('/api', isLoggedIn, require('./controllers/api'));

var server = app.listen(process.env.PORT || 3000);

console.log("the server is now...", server);

module.exports = server;
