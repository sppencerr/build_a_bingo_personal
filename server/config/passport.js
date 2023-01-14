const mongoose = require('mongoose');
const bingoCard = mongoose.model('bingoCard');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

  
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



passport.use(new LocalStrategy(
  function(username, password, done) {
    bingoCard.findOne({ username: username }, function(err, bingoCard) {
      if (err) { return done(err); }
      if (!bingoCard) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!bingoCard.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, bingoCard);
    });
  }
));

module.exports = passport;