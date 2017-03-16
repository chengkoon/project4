module.exports = function(req, res, next) {
  if (!req.user.admin) {
    req.flash('error', 'You must an admin to access that page');
    res.redirect('/admin/login');
  } else {
    next();
  }
};
