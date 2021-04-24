const OIDCStrategy = require("passport-azure-ad").OIDCStrategy; // Load the Azure's strategies for handling users (Microsoft accounts, access tokens, social media accounts, etc...)
const mongoose = require("mongoose"); // Mongoose again deals with DB communication
const config = require("../config/config"); // Require config file
const User = require("../models/User"); // Require the user model
// The rest is MS passport azure ad magic! //
//User authentication
module.exports = function (passport) {
  // Express is calling the function with passport as an argument.
  // passport function
  passport.use(
    new OIDCStrategy(
      {
        identityMetadata: config.creds.identityMetadata,
        clientID: config.creds.clientID,
        responseType: config.creds.responseType,
        responseMode: config.creds.responseMode,
        redirectUrl: config.creds.redirectUrl,
        allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
        clientSecret: config.creds.clientSecret,
        validateIssuer: config.creds.validateIssuer,
        isB2C: config.creds.isB2C,
        issuer: config.creds.issuer,
        passReqToCallback: config.creds.passReqToCallback,
        scope: config.creds.scope,
        loggingLevel: config.creds.loggingLevel,
        nonceLifetime: config.creds.nonceLifetime,
        nonceMaxAmount: config.creds.nonceMaxAmount,
        useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
        cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
        clockSkew: config.creds.clockSkew,
      },
      // If a valid token is provided a user object will be created
      async (accessToken, refreshToken, profile, done) => {
        console.log("auth: ", profile);
        // Creates a user object
        const newUser = {
          microsoftId: profile.oid, // MS openID
          displayName: profile.displayName, // User name
        };

        try {
          let user = await User.findOne({ microsoftId: profile.oid }); // Will search in the DB for a match

          if (user) {
            done(null, user); // If found a user will be returned
          } else {
            user = await User.create(newUser); // If not a new user will be created in the DB
            done(null, user); // Return the new user
          }
        } catch (err) {
          // Catch any error and display a console log message
          console.error(err);
        }
      }
    )
  );
  // Saves the user id into the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // Retreive whole user object
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
