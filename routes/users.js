//Router
var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Registeruser=require('../models/registerusers');
var Amin=require('../models/amins');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


const {
  check,
  validationResult
} = require('express-validator');

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('users/register');
});
router.get('/login', function(req, res, next) {
  res.render('users/login');
});
router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/users/login');
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureFlash: true
  }),
  function(req, res) {
    var usertype=req.user.type;
    //res.redirect('/');
    res.redirect('/'+usertype+'s/indexdashboard');
  });

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.getUserByName(username, function(err, user) {
    if (err) throw error;
    if (!user) {
        return done(null, false);
    }else{
        return done(null, user);
    }
    User.comparePassword(password, user.password, function(err, isMatch) {
      if (err) return err;
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
}));

router.post('/register', [
  check('username', 'กรุณาป้อน Username').not().isEmpty(),
  check('fname', 'กรุณาป้อนชื่อของท่าน').not().isEmpty(),
  check('lname', 'กรุณาป้อนนามสกุลของท่าน').not().isEmpty(),
  check('email', 'กรุณาป้อนอีเมล').isEmail(),
  check('password', 'กรุณาป้อนรหัสผ่าน').not().isEmpty()
], function(req, res, next) {
  const result = validationResult(req);
  var errors = result.errors;
  //Validation Data
  if (!result.isEmpty()) {
    //Return error to views
    res.render('register', {
      errors: errors
    })
  } else {
    //Insert  Data
    var username=req.body.username;
    var type=req.body.type;
    var fname=req.body.fname;
    var lname=req.body.lname;
    var email=req.body.email;
    var password=req.body.password;

    var newUser=new User({
      username:username,
      email:email,
      password:password,
      type:type
    });
    if(type=="amin"){
      var newAmin=new Amin({
            username:username,
            fname:fname,
            lname:lname,
            email:email
      });
      User.saveAmin(newUser,newAmin,function(err,user){
            if(err) throw err
      })
      }else{
        var newRegisteruser=new Registeruser({
          username:username,
          fname:fname,
          lname:lname,
          email:email
      });
      User.saveRegisteruser(newUser,newRegisteruser,function(err,user){
          if(err) throw err
      })
      }
        res.redirect('/');
      }
});

module.exports = router;
