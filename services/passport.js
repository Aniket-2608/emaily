const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Turn user model instance into an id for the cookie
passport.serializeUser((user, done)=>{
  done(null, user.id);
})

// Turn the id from the cookie back into a user model instance
passport.deserializeUser((id, done)=>{
  User.findById(id).then((user)=>{
    done(null, user);
  })
})

passport.use(new GoogleStrategy({
  clientID : keys.googleClientID,
  clientSecret : keys.googleClientSecret,
  callbackURL : '/auth/google/callback'
},(accessToken, refreshToken, profile, done)=>{
  console.log(profile)
  User.findOne({ googleId: profile.id }).then((existingUser) => {
    if (existingUser) {
      console.log('User already exists in DB:', existingUser.id);
      done(null, existingUser);
    } else {
      console.log('New user detected! Saving to DB...');
      new User({ googleId: profile.id })
        .save()
        .then((user) => {
          console.log('New user successfully saved:', user.id);
          done(null, user);
        });
    }
  });
})); // creates a new instance of GoogleStrategy class