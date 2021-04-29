const validator = require('validator');
const passport = require('passport');
const User = require('../models/User');

module.exports = {
  getPage: async (req, res) => {
    res.render('login', {msg: 'none'});
  },
  postLogin: async (req, res, next) => {
    const errors = [];
    if(!validator.isEmail(req.body.email)) errors.push({msg: 'email is invalid'});
    if(validator.isEmpty(req.body.password)) errors.push({msg: 'password field cant be blank'});

    if(errors.length) {
      req.flash('errors', errors);
      return res.redirect('/login');
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });
    passport.authenticate('local', (err, user, info) => {
      if(err) return next(err);
      if(!user) {
        req.flash('errors', info);
        return res.redirect('/login');
      }
      req.logIn(user, (err) => {
        if(err) return next(err);
        res.redirect(req.session.returnTo || '/dashboard')
      })
    })(req, res, next)
  }
}