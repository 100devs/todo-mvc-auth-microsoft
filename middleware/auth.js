module.exports = {
  // If the user is Authenticated it allow him to continue and if not it will be redirect
  // to Home Page
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/"); // Back to the home page
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard"); // The dashboard is where the todos are located
    }
  },
};
