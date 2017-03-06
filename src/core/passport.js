/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../data/models/User';
import { auth as configAuth } from '../config';

   // used to serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// =========================================================================
// FACEBOOK ================================================================
// =========================================================================
const fbStrategy = configAuth.facebookAuth;
// allows us to pass in the req from our route (lets us check if a user is logged in or not)
fbStrategy.passReqToCallback = true;
passport.use(new FacebookStrategy(fbStrategy, (req, token, refreshToken, profile, done) => {
  // asynchronous
  process.nextTick(() => {
    // check if the user is already logged in
    if (!req.user) {
      User.findOne({ 'facebook.id': profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          // if there is a user id already but no token
          // (user was linked at one point and then removed)
          if (!user.facebook.token) {
            user.facebook.token = token;
            user.facebook.token = token;
            user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
            user.facebook.email = (profile.emails[0].value || '').toLowerCase();

            user.save((err) => {
              if (err) {
                return done(err);
              }
              return done(null, user);
            });
          }
          return done(null, user); // user found, return that user
        } else {
          // if there is no user, create them
          var newUser = new User();
          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;
          newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

          newUser.save((err) => {
            if (err) {
              return done(err);
            }
            return done(null, newUser);
          });
        }
      });
    } else {
      // user already exists and is logged in, we have to link accounts
      var user = req.user; // pull the user out of the session
      user.facebook.id = profile.id;
      user.facebook.token = token;
      user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
      user.facebook.email = (profile.emails[0].value || '').toLowerCase();

      user.save((err) => {
        if (err) {
          return done(err);
        }
        return done(null, user);
      });
    }
  });
}));
export default passport;
