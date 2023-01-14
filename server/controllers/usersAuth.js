const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
module.exports.register = function (req, res) {
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  // verify email is not in use.
  User.count({ email: user.email }, function (err, count) {
    if (count > 0) {
      res.status(200);
      res.json({
        'isExisted': true,
      });
    } else {
    
      user.setPassword(req.body.password);
      user.save(function (err) {
        const token = user.generateJwt();
        res.status(200);
        res.json({
          'token': token,
        });
      });
    }
  });
};
module.exports.login = function (req, res) {
  passport.authenticate('userLogin', function (err, user, info) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    if (user) {
      res.status(200);
      res.json({
        'token': user.generateJwt()
      });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};