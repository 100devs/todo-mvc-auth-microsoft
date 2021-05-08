const lstrat = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

//export to server.js
 module.exports = function(passport) {
   passport.use(new lstrat({
     usernameField: 'email' //set up usernameField to be email field in inputs
   }, async (email, password, done) => {
     User.findOne({email: email.toLowerCase()}, async (err, user) => {
       if(err) {return done(err);} //return callback with error only
       if(!user) {
         return done(null, false, {msg: 'user does not exist'});
         //return callback with null error, !user, and error message
       }
       try {
         if(await bcrypt.compare(password, user.password)) {
           return done(null, user);
         }
         else {
           return done(null, false, {msg: 'invalid password'})
         }
       } catch(e) {
         return done(e);
       }
     })
   }))
   passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
 }