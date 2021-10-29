var express = require('express');
var router = express.Router();
var Listings=require('../models/listings')
var User = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
    Listings.getListings(function(err,listings){
        res.render('index', { listings: listings });
    })
  });
  
 /* router.get('/add', function(req, res, next) {
    User.getUserByName(req.user.username ,function(err,username){
        res.render('registerusers/addListing',{username:username});
     });
    }); */   
function enSureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
          return next();
    }else{
          res.redirect('/users/login');
  }
}
module.exports = router;
