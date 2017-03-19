var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

/*
 * Passport "serializes" objects to make them easy to store, converting the
 * user to an identifier (id)
 */
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

/*
 * Passport "deserializes" objects by taking the user's serialization (id)
 * and looking it up in the database
 */
passport.deserializeUser(function(id, cb) {
  db.User.findById(id).then(function(user) {
    cb(null, user);
  }).catch(cb);
});

/*
 * This is Passport's strategy to provide local authentication. We provide the
 * following information to the LocalStrategy:
 *
 * Configuration: An object of data to identify our authentication fields, the
 * username and password
 *
 * Callback function: A function that's called to log the user in. We can pass
 * the email and password to a database query, and return the appropriate
 * information in the callback. Think of "cb" as a function that'll later look
 * like this:
 *
 * login(error, user) {
 *   // do stuff
 * }
 *
 * We need to provide the error as the first argument, and the user as the
 * second argument. We can provide "null" if there's no error, or "false" if
 * there's no user.
 */
passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, cb) {
  db.User.find({
    where: { email: email }
  }).then(function(user) {
    if (!user || !user.validPassword(password)) {
      cb(null, false);
    } else {
      cb(null, user);
    }
  }).catch(cb);
}));

// passport.use('admin-local', new LocalStrategy({
//   usernameField: 'name',
//   passwordField: 'password'
// }, function(name, password, cb) {
//   db.admin.find({
//     where: { name: name }
//   }).then(function(admin) {
//     if (!admin || !admin.validPassword(password)) {
//       cb(null, false);
//     } else {
//       cb(null, admin);
//     }
//   }).catch(cb);
// }));

// export the Passport configuration from this module
module.exports = passport;
