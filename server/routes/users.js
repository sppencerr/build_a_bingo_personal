const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const volunteerController = require('../controllers/volunteerController');
const auth = require('./auth');
const Users = mongoose.model('Users');
const Passport = require('../config/passport');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

router.post('/signin', 
  passport.authenticate('local', { failureRedirect: '/signin'}),
  function(req, res) {
  
    localStorage.setItem('userData', req.user);
    console.log(localStorage.getItem('userData'));

    res.json(req.user);

  }
);

router.get('/userdata', function(req, res) {
  var data = localStorage.getItem('userData');
  var clean1 = data.replace(/\r?\n|\r/g, "");
  var clean2 = clean1.replace("\\", "");
  var clean3 = clean2.substring(1, clean2.length - 1);
  var clean4 = clean3.replace(/\s/g, "").split(",");
  newObj = clean4.reduce((obj, str) => {
    var keyPair = str.split(":");
    console.log(keyPair[1]);
    Object.assign(obj, { [keyPair[0]]: keyPair[1].replace(/'/g, "") });
    return obj;
  }, {});
  console.log(newObj);
  res.send(newObj);
  console.log(newObj);
  console.log(typeof newObj);
});

router.post('/api/signin', function(req, res, next) {
  console.log("hi george");
});


// router.post('/signup', function(req, res, next) {
//   console.log(req.body.username);
// })


router
  .route("/signup")
  .post(volunteerController.create);

// router
//   .route("/users")

router.post('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user }, session } = req;
  console.log(session);

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;